#!/usr/bin/env python3
"""Inline editable CSV data into the original, self-contained diagram."""

import csv
import json
from pathlib import Path

SOURCE = Path(__file__).resolve().parent
OUTPUT = SOURCE.parents[1] / 'static' / 'diagrams' / 'grid-ownership'


def read_rows(filename):
    with (SOURCE / filename).open(encoding='utf-8', newline='') as source:
        rows = list(csv.DictReader(source))
    ids = [row['id'] for row in rows]
    if not rows or any(not value for value in ids) or len(ids) != len(set(ids)):
        raise ValueError(f'{filename}: IDs must be nonempty and unique')
    if any(None in row or None in row.values() for row in rows):
        raise ValueError(f'{filename}: a row does not match the column headers')
    return rows


def inline_json(rows):
    # Keep literal HTML in editable descriptions from ending the script element.
    return json.dumps(rows, ensure_ascii=False, indent=2).replace('<', '\\u003c')


def build():
    nodes = read_rows('nodes.csv')
    relationships = read_rows('relationships.csv')
    for node in nodes:
        node['x'], node['y'] = int(node['x']), int(node['y'])
        if node['kind'] not in {'entity', 'physical', 'market'}:
            raise ValueError(f"{node['id']}: unknown node kind {node['kind']!r}")
    ids = {node['id'] for node in nodes}
    for edge in relationships:
        if edge['from'] not in ids or edge['to'] not in ids:
            raise ValueError(f"{edge['id']}: relationship references an unknown node")
        if edge['kind'] not in {'power', 'money', 'control'}:
            raise ValueError(f"{edge['id']}: unknown relationship kind {edge['kind']!r}")
    html = (SOURCE / 'template.html').read_text(encoding='utf-8')
    for name, rows in [('NODES', nodes), ('EDGES', relationships)]:
        token = '{{' + name + '}}'
        if html.count(token) != 1:
            raise ValueError(f'template.html: expected exactly one {token}')
        html = html.replace(token, inline_json(rows))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / 'grid-ownership.html').write_text(html, encoding='utf-8')
    # Separate experiment: preserve the original output above without overrides.
    css = (SOURCE / 'viewport.css').read_text(encoding='utf-8')
    fit = (SOURCE / 'viewport-fit.js').read_text(encoding='utf-8')
    compact = html.replace('</style>\n<script>', f'\n{css}\n</style>\n<script>', 1)
    compact = compact.replace('H=822,NW=230', 'H=720,NW=230')
    compact = compact.replace('viewBox="0 0 1280 822"', 'viewBox="0 0 1280 720"')
    compact = compact.replace('  const byId =', '''  NODES.forEach(n => { n.y = Math.round(n.y * .82); });
  root.querySelectorAll('.goviz-rowtitle').forEach(el => {
    el.style.top = `${Math.round(parseFloat(el.style.top) * .82)}px`;
  });
  const byId =''')
    compact = compact.replace('  function fit(){', '  function fit(){\n' + fit)
    labels = (SOURCE / 'viewport-labels.js').read_text(encoding='utf-8')
    compact = compact.replace('const t= e.id', 'let t= e.id')
    compact = compact.replace('    const u=1-t;', labels + '\n    const u=1-t;')
    (OUTPUT / 'grid-ownership-fit.html').write_text(compact, encoding='utf-8')
    print(f'Built grid diagram: {len(nodes)} nodes, {len(relationships)} relationships')


if __name__ == '__main__':
    build()
