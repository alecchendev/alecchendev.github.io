import re
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import build


class MathRenderingTests(unittest.TestCase):
    def test_inline_math_preserves_tex_and_escapes_html(self):
        html = build.render_markdown(r'Test $a_i < b_j$ and $\frac{1}{2}$.')
        self.assertEqual(html.count('class="katex"'), 2)
        self.assertIn('<math ', html)
        self.assertIn('a_i &lt; b_j', html)
        self.assertNotIn('<em>', html)
        self.assertNotIn('arithmatex', html)
        self.assertNotIn('<script', html)

    def test_display_math(self):
        html = build.render_markdown(
            '$$\n\\begin{aligned}a &= b \\\\ c &= d\\end{aligned}\n$$'
        )
        self.assertIn('class="katex-display"', html)
        self.assertIn('display="block"', html)

    def test_code_and_currency_are_not_rendered(self):
        text = (
            '`$x$`\n\n```\n$$x$$\n```\n\nI have $2.00 and Bob has $10.00.'
            '\n\nCosts \\$5, shipping >\\$10.'
        )
        with patch('build.subprocess.run') as render:
            html = build.render_markdown(text)
        render.assert_not_called()
        self.assertIn('<code>$x$</code>', html)
        self.assertIn('$$x$$', html)
        self.assertIn('I have $2.00 and Bob has $10.00.', html)
        self.assertIn('Costs $5, shipping &gt;$10.', html)

    def test_invalid_tex_reports_source_file(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / 'bad-equation.md'
            source.write_text(r'$\thiscommanddoesnotexist{x}$', encoding='utf-8')
            with self.assertRaisesRegex(RuntimeError, 'bad-equation.md: Math rendering failed'):
                build.load_page(source)

    def test_local_stylesheet_has_all_its_fonts(self):
        with tempfile.TemporaryDirectory() as directory:
            with patch('build.OUTPUT_DIR', Path(directory)):
                build.copy_math_assets()
            assets = Path(directory) / 'katex'
            css = (assets / 'katex.min.css').read_text(encoding='utf-8')
            font_urls = re.findall(r'url\(([^)]+)\)', css)
            self.assertTrue(font_urls)
            for url in font_urls:
                self.assertTrue((assets / url.strip('\'"')).is_file(), url)
            self.assertTrue((assets / 'LICENSE').is_file())
            self.assertFalse(list(assets.rglob('*.js')))


if __name__ == '__main__':
    unittest.main()
