"""Offline tests: no Resend calls and no real emails."""

import sqlite3
from html import unescape
import tempfile
import unittest
from urllib.parse import parse_qs, urlsplit
from unittest.mock import Mock, patch

from app import Resend, ResendError, create_app


class SignupTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.provider = Mock()
        self.db = self.temp.name + "/pending.sqlite3"
        self.app = create_app({
            "TESTING": True, "DATABASE": self.db,
            "RESEND_API_KEY": "test-key", "RESEND_SEGMENT_ID": "blog-segment",
            "UNSUBSCRIBE_SECRET": "test-secret-with-at-least-32-characters",
        }, provider=self.provider)
        self.client = self.app.test_client()

    def signup(self, email="reader@example.com", **kwargs):
        return self.client.post("/subscribe", data={"email": email, **kwargs})

    def sql(self, statement, args=()):
        db = sqlite3.connect(self.db)
        try:
            with db:
                return db.execute(statement, args).fetchall()
        finally:
            db.close()

    def test_signup_is_immediate(self):
        response = self.signup()
        self.assertEqual(response.status_code, 200)
        self.assertIn("You're subscribed", unescape(response.get_data(as_text=True)))
        self.provider.subscribe.assert_called_once_with("reader@example.com")
        self.provider.send_welcome.assert_called_once()
        self.assertEqual(self.provider.send_welcome.call_args.args[0], "reader@example.com")

    def test_receipt_is_sent_only_after_successful_signup(self):
        self.provider.subscribe.side_effect = ResendError("HTTP 503")
        self.assertEqual(self.signup().status_code, 503)
        self.provider.send_welcome.assert_not_called()

    def test_receipt_failure_does_not_undo_successful_signup(self):
        self.provider.send_welcome.side_effect = ResendError("HTTP 503")
        response = self.signup()
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"signup succeeded", response.data)
        self.assertIn(b"couldn&#39;t be sent", response.data)
        self.provider.subscribe.assert_called_once()

    def test_live_signup_page_and_same_origin_submission(self):
        response = self.client.get("/subscribe")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'action="https://blog.alecchen.dev/subscribe"', response.data)
        self.assertNotIn(b"Confirm by email", response.data)
        self.provider.subscribe.assert_not_called()
        response = self.client.post("/subscribe", data={"email": "reader@example.com"},
                                    headers={"Origin": "https://blog.alecchen.dev"})
        self.assertEqual(response.status_code, 200)
        self.provider.subscribe.assert_called_once()

    def test_unsubscribed_address_is_not_reported_as_subscribed(self):
        self.provider.subscribe.return_value = False
        response = self.signup()
        self.assertIn(b"Previously unsubscribed", response.data)
        self.assertNotIn("You're subscribed", unescape(response.get_data(as_text=True)))
        self.provider.send_welcome.assert_not_called()

    def test_honeypot_bad_email_and_foreign_origin_do_not_subscribe(self):
        self.assertEqual(self.signup(website="spam").status_code, 200)
        self.assertEqual(self.signup(email="not-an-email").status_code, 400)
        self.assertEqual(self.client.post("/subscribe", data={"email": "a@example.com"},
                                         headers={"Origin": "https://evil.example"}).status_code, 403)
        self.provider.subscribe.assert_not_called()
        self.provider.send_welcome.assert_not_called()

    def test_duplicate_address_is_throttled_without_contact_mutation(self):
        self.signup()
        self.assertEqual(self.signup(email="Reader@EXAMPLE.COM").status_code, 429)
        self.provider.subscribe.assert_called_once()
        self.provider.send_welcome.assert_called_once()

    def test_daily_budget_survives_app_restart(self):
        self.app.config["MAX_DAILY_SIGNUPS"] = 1
        self.signup()
        other_app = create_app({**self.app.config}, provider=self.provider)
        result = other_app.test_client().post("/subscribe", data={"email": "other@example.com"})
        self.assertEqual(result.status_code, 429)
        self.provider.subscribe.assert_called_once()

    def test_ip_limit_and_oversized_forms(self):
        for i in range(5):
            self.assertEqual(self.signup(email=f"reader{i}@example.com").status_code, 200)
        self.assertEqual(self.signup(email="sixth@example.com").status_code, 429)
        self.assertEqual(self.signup(email="a" * 5000).status_code, 413)
        self.assertEqual(self.provider.subscribe.call_count, 5)

    def test_provider_failure_can_be_retried_without_resetting_budget(self):
        self.provider.subscribe.side_effect = [ResendError("connection failed"), True]
        self.assertEqual(self.signup().status_code, 503)
        self.assertEqual(self.signup().status_code, 200)
        self.assertEqual(self.provider.subscribe.call_count, 2)
        self.assertEqual(len(self.sql("SELECT * FROM attempts")), 2)

    def test_json_signup_supports_inline_feedback_and_cors(self):
        response = self.client.post("/subscribe", data={"email": "reader@example.com"},
                                    headers={"Accept": "application/json", "Origin": "https://alecchen.dev"})
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json["success"])
        self.assertEqual(response.headers["Access-Control-Allow-Origin"], "https://alecchen.dev")
        bad = self.client.post("/subscribe", data={"email": "invalid"},
                               headers={"Accept": "application/json"})
        self.assertEqual(bad.status_code, 400)
        self.assertFalse(bad.json["success"])
        self.assertNotIn("Access-Control-Allow-Origin", bad.headers)

    def test_unsubscribe_link_requires_valid_signature_and_explicit_post(self):
        self.signup()
        url = self.provider.send_welcome.call_args.args[1]
        token = parse_qs(urlsplit(url).query)["token"][0]
        response = self.client.get("/unsubscribe", query_string={"token": token})
        self.assertEqual(response.status_code, 200)
        self.provider.unsubscribe.assert_not_called()
        response = self.client.post("/unsubscribe", data={"token": token})
        self.assertEqual(response.status_code, 200)
        self.provider.unsubscribe.assert_called_once_with("reader@example.com")
        for value in ("forged", token + "modified", "a" * 2049):
            self.assertEqual(self.client.post("/unsubscribe", data={"token": value}).status_code, 400)
        self.assertEqual(self.provider.unsubscribe.call_count, 1)

    def test_native_one_click_unsubscribe_and_retry_after_provider_failure(self):
        self.signup()
        url = self.provider.send_welcome.call_args.args[1]
        path = urlsplit(url).path + "?" + urlsplit(url).query
        self.provider.unsubscribe.side_effect = ResendError("HTTP 503")
        self.assertEqual(self.client.post(path, data={"List-Unsubscribe": "One-Click"}).status_code, 503)
        self.provider.unsubscribe.side_effect = None
        response = self.client.post(path, data={"List-Unsubscribe": "One-Click"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b"")
        self.provider.unsubscribe.assert_called_with("reader@example.com")

    def test_private_pages_are_not_cached_and_do_not_leak_referrers(self):
        response = self.signup()
        self.assertEqual(response.headers["Cache-Control"], "no-store")
        self.assertEqual(response.headers["Referrer-Policy"], "strict-origin")
        self.assertIn("frame-ancestors 'none'", response.headers["Content-Security-Policy"])


class ResendTests(unittest.TestCase):
    def setUp(self):
        self.resend = Resend("key", "blog-segment", "Alec Chen <blog@alecchen.dev>",
                             "alecchendev@gmail.com", "https://alecchen.dev")

    def test_receipt_has_sender_reply_to_and_no_confirmation_step(self):
        self.resend.call = Mock()
        self.resend.send_welcome("reader@example.com", "https://blog.alecchen.dev/unsubscribe?token=signed")
        method, path, payload = self.resend.call.call_args.args
        self.assertEqual((method, path), ("POST", "/emails"))
        self.assertEqual(payload["from"], "Alec Chen <blog@alecchen.dev>")
        self.assertEqual(payload["reply_to"], "alecchendev@gmail.com")
        self.assertEqual(payload["to"], ["reader@example.com"])
        self.assertIn("Thanks for subscribing", payload["text"])
        self.assertNotIn("/confirm", payload["text"])
        self.assertNotIn("Unsubscribe", payload["html"])
        self.assertNotIn("accident", payload["html"])
        self.assertNotIn("accident", payload["text"])
        self.assertNotIn("/unsubscribe", payload["text"])
        self.assertEqual(payload["headers"]["List-Unsubscribe"],
                         "<https://blog.alecchen.dev/unsubscribe?token=signed>")
        self.assertEqual(payload["headers"]["List-Unsubscribe-Post"], "List-Unsubscribe=One-Click")
        self.assertTrue(self.resend.call.call_args.kwargs["key"].startswith("blog-welcome-"))

    def test_new_contact_added_to_segment_immediately(self):
        self.resend.call = Mock(side_effect=[None, {"id": "new-contact"}])
        self.resend.subscribe("reader+blog@example.com")
        self.assertEqual(self.resend.call.call_args_list[0].args,
                         ("GET", "/contacts/reader%2Bblog%40example.com"))
        self.assertEqual(self.resend.call.call_args.args, ("POST", "/contacts", {
            "email": "reader+blog@example.com", "unsubscribed": False,
            "segments": [{"id": "blog-segment"}],
        }))

    def test_existing_unsubscribed_contact_is_never_changed(self):
        self.resend.call = Mock(return_value={"unsubscribed": True})
        self.assertFalse(self.resend.subscribe("reader@example.com"))
        self.resend.call.assert_called_once_with("GET", "/contacts/reader%40example.com", missing_ok=True)

    def test_existing_active_contact_is_added_without_resetting_preferences(self):
        self.resend.call = Mock(side_effect=[{"unsubscribed": False}, {}])
        self.assertTrue(self.resend.subscribe("reader@example.com"))
        self.assertEqual(self.resend.call.call_args.args,
                         ("POST", "/contacts/reader%40example.com/segments/blog-segment"))

    def test_unsubscribe_updates_resend_preferences(self):
        self.resend.call = Mock()
        self.resend.unsubscribe("reader@example.com")
        self.resend.call.assert_called_once_with("PATCH", "/contacts/reader%40example.com", {"unsubscribed": True})

    @patch("app.time.sleep")
    @patch("app.requests.request")
    def test_rate_limited_provider_calls_are_retried(self, request, sleep):
        limited = Mock(status_code=429)
        ok = Mock(status_code=200, ok=True)
        ok.json.return_value = {"id": "email-id"}
        request.side_effect = [limited, ok]
        self.assertEqual(self.resend.call("POST", "/emails", {}, key="stable"), {"id": "email-id"})
        self.assertEqual(request.call_count, 2)
        self.assertEqual(request.call_args.kwargs["headers"]["Idempotency-Key"], "stable")
        sleep.assert_called_once_with(1)


if __name__ == "__main__":
    unittest.main()
