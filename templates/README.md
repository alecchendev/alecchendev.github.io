# Jinja2 Templates

Converted from Hugo Go templates to Jinja2 for custom static site generation.

## Template Variables

### base.html
Base template that all others extend.

Variables:
- `site_title` - Site title (e.g., "Alec Chen's Website")

Blocks:
- `title` - Page title (defaults to site_title)
- `rss` - RSS feed link tags
- `style` - Additional CSS files
- `header` - Optional header content
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

### blog_list.html
Blog index page.

Variables:
- `pages` - List of blog post objects, each with:
  - `url` - Relative URL to post
  - `title` - Post title

### devlog_list.html
Dev log index page with expandable details.

Variables:
- `pages` - List of dev log entry objects, each with:
  - `url` - Relative URL to entry
  - `title` - Entry title
  - `content` - Rendered HTML content (shown in details)

## Key Conversions from Hugo

| Hugo | Jinja2 |
|------|--------|
| `{{ block "name" . }}...{{ end }}` | `{% block name %}...{% endblock %}` |
| `{{ .Content }}` | `{{ content \| safe }}` |
| `{{ .Title }}` | `{{ title }}` |
| `{{ .Site.Title }}` | `{{ site_title }}` |
| `{{ range .Pages }}` | `{% for page in pages %}` |
| `{{ .Permalink }}` | `{{ page.url }}` |

## Notes

- All HTML content must use the `| safe` filter to prevent escaping
- External links need `target="_blank" rel="noopener"` (handled in build script)
- CSS files are referenced with absolute paths from root (e.g., `/css/global.css`)
