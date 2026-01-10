#!/usr/bin/env python3
"""
Static site generator for alecchendev.github.io
Converts markdown files to HTML using Jinja2 templates
"""

import os
import shutil
import re
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass
from typing import List
import frontmatter
import markdown
from jinja2 import Environment, FileSystemLoader
from feedgen.feed import FeedGenerator

# Configuration
CONTENT_DIR = Path("content")
TEMPLATE_DIR = Path("templates")
STATIC_DIR = Path("static")
OUTPUT_DIR = Path("public")
BASE_URL = "https://alecchendev.github.io"
SITE_TITLE = "Alec Chen's Website"
AUTHOR_NAME = "Alec Chen"
AUTHOR_EMAIL = "alecchendev@gmail.com"


@dataclass
class Page:
    """Represents a page/post with metadata and content"""
    filepath: Path
    title: str
    date: datetime
    content: str  # Rendered HTML
    url: str
    is_bundle: bool  # True if this is an index.md in a directory


def render_markdown(text: str) -> str:
    """Convert markdown to HTML with external link handling"""
    md = markdown.Markdown(extensions=[
        'extra',
        'codehilite',
        'fenced_code',
        'tables'
    ])
    html = md.convert(text)

    # Add target="_blank" rel="noopener" to external links
    html = re.sub(
        r'<a href="(https?://[^"]+)"',
        r'<a href="\1" target="_blank" rel="noopener"',
        html
    )

    return html


def calculate_url(filepath: Path, base_path: Path) -> str:
    """Calculate relative URL for a page"""
    rel_path = filepath.relative_to(base_path)

    # Special case for _index.md (section index pages)
    if filepath.name == '_index.md':
        if rel_path.parent == Path('.'):
            return '/'
        return f'/{rel_path.parent}/'

    # Page bundles: index.md in a subdirectory
    # e.g., content/blog/my-post/index.md -> /blog/my-post/
    if filepath.name == 'index.md':
        return f'/{rel_path.parent}/'

    # Regular standalone pages: /section/filename/
    stem = filepath.stem
    if rel_path.parent == Path('.'):
        return f'/{stem}/'
    return f'/{rel_path.parent}/{stem}/'


def get_output_path(url: str) -> Path:
    """Calculate output file path from URL"""
    if url.endswith('/'):
        return OUTPUT_DIR / url.lstrip('/') / 'index.html'
    # For .html files, create direct path
    return OUTPUT_DIR / url.lstrip('/')


def load_page(filepath: Path) -> Page:
    """Load a markdown file and parse frontmatter"""
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    title = post.get('title', '')
    date = post.get('date', datetime.now())
    content = render_markdown(post.content)
    url = calculate_url(filepath, CONTENT_DIR)
    is_bundle = filepath.name == 'index.md' and filepath.parent != CONTENT_DIR

    return Page(
        filepath=filepath,
        title=title,
        date=date,
        content=content,
        url=url,
        is_bundle=is_bundle
    )


def collect_pages() -> List[Page]:
    """Collect all markdown files from content directory"""
    print("Collecting pages...")
    pages = []

    for md_file in CONTENT_DIR.rglob('*.md'):
        page = load_page(md_file)
        pages.append(page)
        print(f"  Found: {md_file.relative_to(CONTENT_DIR)}")

    print(f"Collected {len(pages)} pages\n")
    return pages


def render_homepage(jinja_env: Environment, pages: List[Page]):
    """Render the homepage"""
    print("Rendering homepage...")

    # Find the _index.md file
    home_page = next(
        (p for p in pages if p.filepath.name == '_index.md'
         and p.filepath.parent == CONTENT_DIR),
        None
    )

    if not home_page:
        print("  Warning: No _index.md found in content/")
        return

    template = jinja_env.get_template('index.html')
    html = template.render(
        site_title=SITE_TITLE,
        content=home_page.content
    )

    output_file = OUTPUT_DIR / 'index.html'
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(html, encoding='utf-8')
    print(f"  Created: {output_file}\n")


def render_blog_list(jinja_env: Environment, pages: List[Page]) -> List[Page]:
    """Render blog index page"""
    print("Rendering blog list...")

    # Get all blog posts, sorted by date (newest first)
    blog_posts = [p for p in pages if 'blog' in str(p.filepath.parent)]
    blog_posts = [p for p in blog_posts if p.filepath.name != '_index.md']
    blog_posts.sort(key=lambda p: p.date, reverse=True)

    print(f"  Found {len(blog_posts)} blog posts")

    template = jinja_env.get_template('blog.html')
    html = template.render(
        site_title=SITE_TITLE,
        pages=blog_posts
    )

    output_file = OUTPUT_DIR / 'blog' / 'index.html'
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(html, encoding='utf-8')
    print(f"  Created: {output_file}\n")

    return blog_posts


def render_devlog_list(jinja_env: Environment, pages: List[Page]):
    """Render dev-log index page"""
    print("Rendering dev-log list...")

    # Get all dev-log entries, sorted by date (newest first)
    devlog_posts = [p for p in pages if 'dev-log' in str(p.filepath.parent)]
    devlog_posts = [p for p in devlog_posts if p.filepath.name != '_index.md']
    devlog_posts.sort(key=lambda p: p.date, reverse=True)

    print(f"  Found {len(devlog_posts)} dev-log entries")

    template = jinja_env.get_template('dev-log.html')
    html = template.render(
        site_title=SITE_TITLE,
        pages=devlog_posts
    )

    output_file = OUTPUT_DIR / 'dev-log' / 'index.html'
    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(html, encoding='utf-8')
    print(f"  Created: {output_file}\n")


def copy_page_resources(page: Page):
    """Copy images and other resources for page bundles"""
    if not page.is_bundle:
        return

    bundle_dir = page.filepath.parent
    output_dir = get_output_path(page.url).parent

    # Copy all files except the markdown file itself
    for item in bundle_dir.iterdir():
        if item.is_file() and item.suffix != '.md':
            dest = output_dir / item.name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, dest)


def render_single_pages(jinja_env: Environment, pages: List[Page]):
    """Render all individual pages/posts"""
    print("Rendering individual pages...")

    template = jinja_env.get_template('single.html')
    count = 0

    for page in pages:
        # Skip index pages (already handled)
        if page.filepath.name == '_index.md':
            continue

        html = template.render(
            site_title=SITE_TITLE,
            title=page.title,
            content=page.content
        )

        output_file = get_output_path(page.url)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file.write_text(html, encoding='utf-8')

        # Copy bundle resources (images, etc.)
        copy_page_resources(page)

        count += 1

    print(f"  Created {count} pages\n")


def generate_rss(posts: List[Page], section: str = ''):
    """Generate RSS feed for a section"""
    print(f"Generating RSS feed for {section or 'site'}...")

    fg = FeedGenerator()
    fg.id(BASE_URL)
    fg.title(SITE_TITLE if not section else f"{SITE_TITLE} - {section.title()}")
    fg.author({'name': AUTHOR_NAME, 'email': AUTHOR_EMAIL})
    fg.link(href=BASE_URL, rel='alternate')
    fg.subtitle(f"Personal website and blog by {AUTHOR_NAME}")
    fg.language('en')

    # Add entries (limit to most recent 20)
    for post in posts[:20]:
        fe = fg.add_entry()
        fe.id(f"{BASE_URL}{post.url}")
        fe.title(post.title)
        fe.link(href=f"{BASE_URL}{post.url}")
        fe.published(post.date)
        fe.updated(post.date)
        fe.content(post.content, type='html')

    # Write RSS file
    if section:
        output_file = OUTPUT_DIR / section / 'index.xml'
    else:
        output_file = OUTPUT_DIR / 'index.xml'

    output_file.parent.mkdir(parents=True, exist_ok=True)
    fg.rss_file(str(output_file))
    print(f"  Created: {output_file}\n")


def copy_static_assets():
    """Copy static files to output directory"""
    print("Copying static assets...")

    if not STATIC_DIR.exists():
        print("  No static directory found\n")
        return

    for item in STATIC_DIR.rglob('*'):
        if item.is_file():
            rel_path = item.relative_to(STATIC_DIR)
            dest = OUTPUT_DIR / rel_path
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, dest)
            print(f"  Copied: {rel_path}")

    print()


def clean_output():
    """Remove existing output directory"""
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def build():
    """Run the full build process"""
    print("=" * 60)
    print("Building site...")
    print("=" * 60 + "\n")

    # Setup Jinja2
    jinja_env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

    # Clean and prepare
    clean_output()

    # Collect all pages
    pages = collect_pages()

    # Render pages
    render_homepage(jinja_env, pages)
    blog_posts = render_blog_list(jinja_env, pages)
    render_devlog_list(jinja_env, pages)
    render_single_pages(jinja_env, pages)

    # Generate RSS feeds
    all_posts = sorted(
        [p for p in pages if p.filepath.name != '_index.md'],
        key=lambda p: p.date,
        reverse=True
    )
    generate_rss(all_posts)
    generate_rss(blog_posts, 'blog')

    # Copy static assets
    copy_static_assets()

    print("=" * 60)
    print("Build complete!")
    print("=" * 60)
    print(f"Output directory: {OUTPUT_DIR.absolute()}")


if __name__ == '__main__':
    build()
