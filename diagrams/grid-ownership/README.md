# Grid diagram

Edit `nodes.csv` and `relationships.csv`, then run from the website directory:

```sh
python3 diagrams/grid-ownership/build.py
```

This uses only Python's standard library and writes the self-contained
`static/diagrams/grid-ownership/grid-ownership.html`. The regular
`python build.py` also runs this step before building the blog.

- `nodes.csv`: one entity or piece of infrastructure per row. `id` is the stable
  identifier; `title`, `sub`, `symbol`, and `description` are displayed verbatim.
  `kind` is `entity`, `physical`, or `market`. `x` and `y` are integer coordinates
  on the original 1280 × 822 canvas.
- `relationships.csv`: one directed arrow per row. `from` and `to` reference
  node IDs; `kind` is `power`, `money`, or `control`. `label` is the arrow label
  and `detail` is its full explanation.
- `template.html`: the original diagram's markup, styles, and interaction code,
  with two placeholders for the CSV data. Edit this for presentation changes;
  generated HTML is overwritten on each build.

Use a spreadsheet editor or preserve standard CSV quoting when editing text
containing commas or quotation marks. Keep row order to preserve the original
drawing and relationship-list order. The build rejects duplicate IDs, broken
node references, unknown kinds, and malformed rows.

The output includes all data, CSS, and JavaScript. Opening the HTML directly
does not need a server, CSV fetches, or any external dependencies. The preview
image is a separate screenshot; refresh it after visible diagram edits.

The diagram HTML, embed stylesheet, and preview image are served from
`/diagrams/grid-ownership/`, independently of any blog post.

## Viewport experiment

The same build also writes `grid-ownership-fit.html`. This separate version
tightens the vertical row spacing and, on windows at least 1001px wide and
600px tall, puts the existing detail panel on the right and fits the graph
into the remaining width and height. All entities, relationships, text,
filters, tooltips, selection, dragging, and reset remain available. A long
detail panel can scroll independently. Smaller windows use the normal flow.

`viewport.css`, `viewport-fit.js`, and `viewport-labels.js` contain these
experimental overrides, including moving arrow labels into clear spaces.
They are never included in `grid-ownership.html`.

## Regulatory funding

Relationships `m10` and `m11` show illustrative utility-to-regulator payments.
FERC's operating appropriation is recovered through annual charges and filing
fees ([FERC annual charges](https://ferc.gov/general-information-0/annual-charges)).
California's PUC describes utility fees as funding its main operating account
([CPUC funding explanation, appendix on Fund 0462](https://www.cpuc.ca.gov/-/media/cpuc-website/transparency/commissioner-committees/finance-and-administration/2018/02-07-18-2018-february-update-re-12-31-17-v5.pdf)).
State arrangements vary. The diagram therefore does not equate all regulator
funding with general taxation or draw a direct household-to-regulator tax arrow.
