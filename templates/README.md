# Jinja2 Templates

Templates for static site generation using Jinja2.

## Template Files

### base.html
Base template that all others extend. Contains navigation and site structure.

Variables:
- `site_title` - Site title (e.g., "Alec Chen's Website")

Blocks:
- `title` - Page title (defaults to site_title)
- `rss` - RSS feed link tags
- `main` - Main page content

### index.html
Homepage template.

Variables:
- `content` - Rendered HTML from _index.md

### single.html
Individual blog post or page template.

Variables:
- `title` - Page/post title
- `content` - Rendered HTML content

### blog.html
Blog index page.

Variables:
- `pages` - List of blog post objects, each with:
  - `url` - Relative URL to post
  - `title` - Post title

### dev-log.html
Dev log index page with expandable details.

Variables:
- `pages` - List of dev log entry objects, each with:
  - `url` - Relative URL to entry
  - `title` - Entry title
  - `content` - Rendered HTML content (shown in details)

## Notes

- All HTML content must use the `| safe` filter to prevent escaping
- External links get `target="_blank" rel="noopener"` (handled in build script)
- All CSS is loaded from `/css/styles.css`
