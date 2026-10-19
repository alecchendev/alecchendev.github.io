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
- `sources.csv`: primary sources for the audit, with space-separated node and
  relationship IDs in `applies_to`. References stay outside the diagram UI.

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
California's PUC assesses utility fees to fund its regulatory budget
([CPUC Resolution M-4879, effective 2026](https://docs.cpuc.ca.gov/PublishedDocs/Published/G000/M590/K540/590540853.pdf)).
State arrangements vary. The diagram therefore does not equate all regulator
funding with general taxation or draw a direct household-to-regulator tax arrow.

## Data audit, 2026-10-19

Checked all 12 nodes, the 25 existing relationships, and the company examples
against regulator, ISO/RTO, government and company sources. The revised text
is about 20% shorter, including the added ISO/RTO funding relationship `m12`.

The model represents a FERC-regulated ISO/RTO region with retail choice, using
PJM as the transmission-billing example. It is not a universal U.S. arrangement:
ERCOT, vertically integrated regions, public utilities and cooperatives can
differ. Company names illustrate roles; they do not imply one common region or
a commercial relationship between those companies.

Generation owners and operators are grouped as generation companies; equipment
operations may be contracted out. ISO/RTO coordination remains separate from
owners' physical operation and maintenance. The markets/settlements node is a
schematic billing hub; bilateral contracts need not settle through an ISO/RTO.
The power arrows show one delivery path through a connected network, omitting
distribution-connected generators and direct transmission customers.

For `m5`, the distribution utility is an illustrative transmission customer.
The responsible payer and the placement of transmission charges on retail
bills vary. For `m12`, market and transmission customers pay administrative
tariff charges, shown through settlements rather than as another customer node
([PJM administrative cost recovery](https://www.pjm.com/committees-and-groups/committees/fc/pjm-admin-cost-rates.aspx)).
