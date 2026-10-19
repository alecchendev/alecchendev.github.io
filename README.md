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
