"""Enhance explicitly authored Gridterms links using a saved local snapshot."""
import json
import re
from functools import lru_cache
from html import unescape
from pathlib import Path
from urllib.parse import urlsplit


@lru_cache(maxsize=1)
def load_catalog():
    catalog = json.loads((Path(__file__).parent / 'data/gridterms.json').read_text())
    if catalog.get('schemaVersion') != 1:
        raise ValueError('Unsupported Gridterms snapshot. Refresh the blog export.')
    return catalog


def prepare_gridterms(content):
    catalog = load_catalog()
    origin = urlsplit(catalog['origin'])
    selected = {}

    def annotate(match):
        link = urlsplit(unescape(match[1]))
        if (link.scheme, link.netloc) != (origin.scheme, origin.netloc):
            return match[0]
        term_path = re.fullmatch(r'/terms/([a-z0-9-]+)/', link.path)
        if not term_path:
            return match[0]
        term_id = term_path[1]
        if term_id not in catalog['terms']:
            raise ValueError(f'Unknown Gridterms entry: {term_id}')
        selected[term_id] = catalog['terms'][term_id]
        return match[0][:-1] + f' data-grid-term="{term_id}" class="grid-term">'

    content = re.sub(r'<a\b[^>]*\bhref="([^"]+)"[^>]*>', annotate, content)
    if not selected:
        return content, None
    # Keep wide article tables from expanding the mobile layout viewport.
    content = content.replace('<table>', '<div class="gridterms-table-scroll" role="region" aria-label="Scrollable table" tabindex="0"><table>')
    content = content.replace('</table>', '</table></div>')
    data = {key: {field: value for field, value in term.items() if field != 'svg'}
            for key, term in selected.items()}
    return content, {
        'json': json.dumps(data).replace('<', '\\u003c'),
        'diagrams': '\n'.join(f'<template id="diagram-{key}">{term["svg"]}</template>'
                             for key, term in selected.items()),
    }
