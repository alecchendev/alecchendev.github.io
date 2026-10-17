"""Immediate signup to a Resend segment. No public sending/admin API."""

from contextlib import contextmanager
import hashlib
from html import escape
import os
from pathlib import Path
import sqlite3
import time
from urllib.parse import quote, urlsplit
from uuid import uuid4

from email_validator import EmailNotValidError, validate_email
from flask import Flask, abort, jsonify, render_template, request, send_from_directory
from itsdangerous import BadSignature, URLSafeSerializer
import requests


class ResendError(Exception):
    pass


class Resend:
    def __init__(self, key, segment, sender, reply_to, site_url):
        self.key, self.segment = key, segment
        self.sender, self.reply_to, self.site_url = sender, reply_to, site_url

    def call(self, method, path, payload=None, *, missing_ok=False, key=None):
        headers = {"Authorization": f"Bearer {self.key}"}
        if key:
            headers["Idempotency-Key"] = key
        for attempt in range(3):
            try:
                response = requests.request(
                    method, "https://api.resend.com" + path,
                    headers=headers, json=payload, timeout=(5, 10),
                )
            except requests.RequestException:
                raise ResendError("Resend connection failed") from None
            if response.status_code == 429 and attempt < 2:
                time.sleep(attempt + 1)
                continue
            if missing_ok and response.status_code == 404:
                return None
            if not response.ok:
                # Never log provider response bodies: they may contain email addresses.
                raise ResendError(f"Resend returned HTTP {response.status_code}")
            try:
                return response.json()
            except ValueError:
                raise ResendError("Invalid Resend response") from None

    def subscribe(self, email):
        path = "/contacts/" + quote(email, safe="")
        contact = self.call("GET", path, missing_ok=True)
        if contact is None:
            self.call("POST", "/contacts", {
                "email": email, "unsubscribed": False,
                "segments": [{"id": self.segment}],
            })
        elif contact["unsubscribed"]:
            # A public form must not undo a previous unsubscribe.
            return False
        else:
            self.call("POST", path + "/segments/" + quote(self.segment, safe=""))
        return True

    def unsubscribe(self, email):
        self.call("PATCH", "/contacts/" + quote(email, safe=""), {"unsubscribed": True})

    def send_welcome(self, email, unsubscribe_url):
        self.call("POST", "/emails", {
            "from": self.sender,
            "to": [email],
            "reply_to": self.reply_to,
            "subject": "You're subscribed to Alec's blog",
            "text": (
                "Thanks for subscribing! You're on the list.\n\n"
                "I'll email you when I publish a new blog post.\n\n"
                f"You can read the blog here: {self.site_url}/blog/\n\n"
                "Alec"
            ),
            "html": (
                "<div style=\"font:16px/1.6 system-ui,sans-serif;color:#111\">"
                "<p>Thanks for subscribing! You're on the list.</p>"
                "<p>I'll email you when I publish a new blog post.</p>"
                f'<p><a href="{escape(self.site_url)}/blog/">Read the blog</a></p>'
                "<p>Alec</p></div>"
            ),
            "headers": {
                "List-Unsubscribe": f"<{unsubscribe_url}>",
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
        }, key="blog-welcome-" + uuid4().hex)


def digest(value):
    return hashlib.sha256(value.encode()).hexdigest()


def create_app(config=None, provider=None):
    app = Flask(__name__)
    app.config.from_mapping(
        RESEND_API_KEY=os.environ.get("RESEND_API_KEY", ""),
        RESEND_SEGMENT_ID=os.environ.get("RESEND_SEGMENT_ID", ""),
        EMAIL_FROM=os.environ.get("EMAIL_FROM", "Alec Chen <blog@alecchen.dev>"),
        EMAIL_REPLY_TO=os.environ.get("EMAIL_REPLY_TO", "alecchendev@gmail.com"),
        UNSUBSCRIBE_SECRET=os.environ.get("UNSUBSCRIBE_SECRET", ""),
        PUBLIC_URL=os.environ.get("PUBLIC_URL", "https://blog.alecchen.dev").rstrip("/"),
        SITE_URL=os.environ.get("SITE_URL", "https://alecchen.dev").rstrip("/"),
        DATABASE=os.environ.get("DATABASE", "email.sqlite3"),
        MAX_DAILY_SIGNUPS=int(os.environ.get("MAX_DAILY_SIGNUPS", "50")),
        MAX_CONTENT_LENGTH=4096,
    )
    if config:
        app.config.update(config)
    for name in ("RESEND_API_KEY", "RESEND_SEGMENT_ID"):
        if not app.config[name]:
            raise ValueError(f"Set {name} before starting the service")
    if len(app.config["UNSUBSCRIBE_SECRET"]) < 32:
        raise ValueError("Set UNSUBSCRIBE_SECRET to a random secret of at least 32 characters")
    signer = URLSafeSerializer(app.config["UNSUBSCRIBE_SECRET"], salt="blog-unsubscribe-v1")
    for name in ("PUBLIC_URL", "SITE_URL"):
        parsed = urlsplit(app.config[name])
        if parsed.scheme != "https" or not parsed.netloc or parsed.path not in ("", "/"):
            raise ValueError(f"{name} must be an HTTPS origin without a path")
    if app.config["MAX_DAILY_SIGNUPS"] < 1:
        raise ValueError("MAX_DAILY_SIGNUPS must be positive")

    provider = provider or Resend(
        app.config["RESEND_API_KEY"], app.config["RESEND_SEGMENT_ID"],
        app.config["EMAIL_FROM"], app.config["EMAIL_REPLY_TO"], app.config["SITE_URL"],
    )
    db_path = Path(app.config["DATABASE"])
    db_path.parent.mkdir(parents=True, exist_ok=True)

    @contextmanager
    def connect():
        db = sqlite3.connect(db_path, timeout=60)
        db.row_factory = sqlite3.Row
        try:
            with db:
                yield db
        finally:
            db.close()

    with connect() as db:
        db.executescript("""
            PRAGMA journal_mode=WAL;
            CREATE TABLE IF NOT EXISTS attempts (
                ip_hash TEXT NOT NULL, email_hash TEXT NOT NULL, created INTEGER NOT NULL
            );
            CREATE INDEX IF NOT EXISTS attempts_created ON attempts(created);
        """)

    def page(title, message, status=200, signup=False, token=None, success=None):
        if request.accept_mimetypes.best == "application/json":
            return jsonify(title=title, message=message,
                           success=status < 400 if success is None else success), status
        return render_template(
            "message.html", title=title, message=message, signup=signup, token=token,
            site_url=app.config["SITE_URL"], public_url=app.config["PUBLIC_URL"],
        ), status

    @app.after_request
    def headers(response):
        response.headers["Cache-Control"] = "no-store"
        # Keep paths private, but preserve Origin on browser form POSTs.
        # no-referrer turns that header into "null" and breaks the origin check.
        response.headers["Referrer-Policy"] = "strict-origin"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Content-Security-Policy"] = (
            "default-src 'none'; style-src 'unsafe-inline'; script-src 'self'; connect-src 'self'; "
            "form-action 'self'; frame-ancestors 'none'; base-uri 'none'"
        )
        origin = request.headers.get("Origin")
        if origin in (app.config["SITE_URL"], app.config["PUBLIC_URL"]):
            response.headers["Access-Control-Allow-Origin"] = origin
        response.vary.add("Origin")
        return response

    @app.errorhandler(413)
    def too_large(error):
        return page("Form too large", "Please enter just your email address.", 413)

    @app.get("/healthz")
    def health():
        return {"status": "ok"}

    @app.get("/email.js")
    def signup_script():
        return send_from_directory(Path(__file__).resolve().parent.parent / "static", "email.js")

    @app.get("/subscribe")
    def signup_form():
        return page("Subscribe to the blog", "Get an email when I publish a new post. "
                    "Unsubscribe anytime.", signup=True)

    @app.post("/subscribe")
    def subscribe():
        if request.headers.get("Origin") not in (None, app.config["SITE_URL"], app.config["PUBLIC_URL"]):
            abort(403)
        if request.form.get("website"):
            return page("You're subscribed", "I'll email you when I publish a new post. "
                        "Every announcement includes an unsubscribe link.")
        try:
            email = validate_email(
                request.form.get("email", "").strip(),
                check_deliverability=False, allow_smtputf8=False,
            ).normalized
        except EmailNotValidError:
            return page("Check your email address", "Please enter a valid email address.", 400)

        now = int(time.time())
        # Only a trusted reverse proxy may supply this header.
        ip = request.headers.get("X-Real-IP") or request.remote_addr or "unknown"
        ip_hash, email_hash = digest(ip), digest(email.casefold())
        with connect() as db:
            db.execute("BEGIN IMMEDIATE")
            db.execute("DELETE FROM attempts WHERE created <= ?", (now - 86400,))
            counts = db.execute("""
                SELECT COUNT(*) AS total,
                       COUNT(CASE WHEN ip_hash = ? AND created > ? THEN 1 END) AS ip,
                       COUNT(CASE WHEN email_hash = ? AND created > ? THEN 1 END) AS email
                FROM attempts
            """, (ip_hash, now - 3600, email_hash, now - 900)).fetchone()
            if counts["total"] >= app.config["MAX_DAILY_SIGNUPS"] or counts["ip"] >= 5:
                return page("Please try later", "Too many signup requests. Please try again later.", 429)
            if counts["email"]:
                return page("Please try later", "A signup for this address was just submitted. "
                            "Please wait 15 minutes before trying again.", 429)
            attempt_id = db.execute("INSERT INTO attempts VALUES (?, ?, ?)",
                                    (ip_hash, email_hash, now)).lastrowid
        try:
            subscribed = provider.subscribe(email)
        except ResendError as error:
            app.logger.warning("Signup failed: %s", error)
            # Allow a retry for this address, but retain IP/global abuse counts.
            with connect() as db:
                db.execute("UPDATE attempts SET email_hash = '' WHERE rowid = ?", (attempt_id,))
            return page("Couldn't subscribe", "Please try again shortly.", 503)
        if subscribed is False:
            return page("Previously unsubscribed", "This address has opted out of emails. "
                        "Email Alec if you'd like to rejoin.", success=False)
        token = signer.dumps({"email": email, "segment": app.config["RESEND_SEGMENT_ID"]})
        unsubscribe_url = app.config["PUBLIC_URL"] + "/unsubscribe?token=" + quote(token, safe="")
        try:
            provider.send_welcome(email, unsubscribe_url)
        except ResendError as error:
            app.logger.warning("Signup receipt failed: %s", error)
            return page("You're subscribed", "Your signup succeeded, but the confirmation "
                        "email couldn't be sent. No further action is needed.")
        return page("You're subscribed", "You're on the list now. I've sent you a confirmation email.")

    @app.route("/unsubscribe", methods=["GET", "POST"])
    def unsubscribe():
        token = request.form.get("token") or request.args.get("token", "")
        try:
            if len(token) > 2048:
                raise BadSignature("Invalid token")
            payload = signer.loads(token)
            if (not isinstance(payload, dict) or not isinstance(payload.get("email"), str)
                    or payload.get("segment") != app.config["RESEND_SEGMENT_ID"]):
                raise BadSignature("Invalid token")
        except BadSignature:
            return page("Invalid unsubscribe link", "Please use the link in your signup email.", 400)
        if request.method == "GET":
            # Email security scanners may open links; only a POST opts out.
            return page("Unsubscribe from Alec's blog?", "You won't receive new-post emails.", token=token)
        try:
            provider.unsubscribe(payload["email"])
        except ResendError as error:
            app.logger.warning("Unsubscribe failed: %s", error)
            return page("Please try again", "Couldn't unsubscribe right now. Please try again.",
                        503, token=token)
        if request.form.get("List-Unsubscribe") == "One-Click":
            return "", 200
        return page("You're unsubscribed", "You won't receive any more blog announcements.")

    return app
