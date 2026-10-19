# Grid diagram

Editable data and presentation files for the interactive grid ownership diagram.

## Files

- `nodes.csv`: one organization or infrastructure node per row. Keep `id` stable;
  `title`, `sub`, `symbol`, and `description` supply the displayed content.
  `kind` is `entity`, `physical`, or `market`. `x` and `y` position the node on
  the 1280 × 822 canvas.
- `relationships.csv`: one directed arrow per row. `from` and `to` reference node
  IDs. `kind` is `power`, `money`, or `control`; `label` and `detail` supply the
  arrow's short label and explanation.
- `sources.csv`: supporting references, with space-separated node and
  relationship IDs in `applies_to`. This file is documentation only and is not
  included in the generated diagram.
- `template.html`: shared markup, styles, and interaction code. Keep the
  `{{NODES}}` and `{{EDGES}}` placeholders for the build to populate.
- `viewport.css`, `viewport-fit.js`, and `viewport-labels.js`: layout, scaling,
  and arrow-label placement for the version that fits the viewport.
- `build.py`: validates the CSV data and generates both diagram versions.
- `test_build.py`: checks data validation, embedding, and repeatable output.

Preserve CSV quoting for text containing commas, quotation marks, or newlines.
Keep row order unless you want to change drawing and relationship-list order.

## Build and check

Run from the website directory; only Python's standard library is required:

```sh
python3 diagrams/grid-ownership/build.py
python3 -m unittest discover -s diagrams/grid-ownership -p 'test_*.py'
```

The normal website build (`python build.py`) also regenerates the diagrams.

## Outputs and embedding

The build writes two self-contained files under `static/diagrams/grid-ownership/`:

- `grid-ownership.html`: the canvas layout defined in `template.html`.
- `grid-ownership-fit.html`: a compact layout that fits the graph and a side
  detail panel into larger viewports. This is the version embedded in the blog.

Open either HTML file directly to preview it; no server or external assets are
required. Edit the source files above, since generated HTML is overwritten.

The blog's embedding styles are in `static/diagrams/grid-ownership/preview.css`.
Its mobile preview is `static/diagrams/grid-ownership/grid-preview.png`, a
separate screenshot that must be refreshed manually after visible diagram
changes. The website serves these assets at `/diagrams/grid-ownership/`.
