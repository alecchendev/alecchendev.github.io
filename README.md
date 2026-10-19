# personal website

how to develop:
- assumption: Python and Node.js 22.12+ are installed (Node is only used during the build)
- `python3 -m venv venv`
- `source venv/bin/activate.fish`
- `pip install -r requirements.txt`
- `npm ci`
- to deactivate: `deactivate`
- when editing content, run `python build.py` to build website
- run `python3 -m http.server --directory public` and visit locally

## Math in posts

Use `$...$` for inline math and `$$...$$` for a separate equation:

```markdown
The energy is $E = mc^2$.

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

Leave a blank line before and after display equations, with no blank lines inside.
Code blocks and inline code are left alone. Escape literal dollar signs with `\$`
when needed to avoid treating them as math.

The Python build protects math from Markdown formatting, then uses KaTeX to
generate HTML and MathML. It copies KaTeX's CSS and fonts into `public/katex/`;
pages with math load the local stylesheet. No math JavaScript or CDN is needed
in the browser. Invalid or unsupported formulas stop the build with the source
file and KaTeX error. See the [supported commands](https://katex.org/docs/supported.html).

Run the math rendering checks with `python -m unittest test_build.py`.

## Grid diagram

The diagram's editable CSVs and original presentation template are in
[`diagrams/grid-ownership/`](diagrams/grid-ownership/README.md).
The normal site build regenerates the self-contained HTML automatically.
To rebuild just the diagram, run `python3 diagrams/grid-ownership/build.py`.


## Illustrated Gridterms links

See the [integration handoff and future widget plan](/home/hermes/grid-terms/docs/blog-popups.md) in the local Gridterms checkout for file ownership, refresh commands, visual fixes, and the remaining work for a public widget.

Link the first useful introduction of a term in Markdown, for example
`[transformers](http://hermes-vps:8087/terms/transformer/)`. The normal build
recognizes explicit links to the saved Gridterms origin, embeds only the linked
definitions and SVG templates in that post, and loads the reader assets only for
posts that use them. Repeated links share one definition. Ordinary links remain
usable without JavaScript; RSS retains normal links too.

`data/gridterms.json`, `static/gridterms/reader.*`, and `templates/gridterms.html`
are a generated snapshot from Gridterms. Commit them with the blog changes;
ordinary builds and GitHub Pages do not need the Gridterms checkout or a remote
API. Refresh the snapshot from this VPS with:

```bash
node /home/hermes/grid-terms/site/scripts/export-blog.mjs . http://hermes-vps:8087
```

The current full-entry links point to the private Tailscale preview. Before public
launch, replace that origin in the authored Markdown and rerun the export with
the public Gridterms origin. The pop-up definitions and diagrams are already
served locally by the blog. The export is for this integration; a general public
widget and installation guide remain future work.

Run `.venv/bin/python -m unittest test_build.py test_gridterms.py` for build checks.
