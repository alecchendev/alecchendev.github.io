import json
import unittest

from gridterms import load_catalog, prepare_gridterms
import build


class GridtermsTests(unittest.TestCase):
    def test_post_has_only_selected_unique_terms_and_matching_diagrams(self):
        page = build.load_page(build.CONTENT_DIR / 'blog/grid-intro/index.md')
        terms = json.loads(page.gridterms['json'])
        self.assertEqual(len(terms), 17)
        self.assertEqual(page.content.count('data-grid-term='), 17)
        for term_id in terms:
            self.assertEqual(page.gridterms['diagrams'].count(f'id="diagram-{term_id}"'), 1)
        self.assertIn('class="katex"', page.content)
        self.assertIn('grid-ownership-fit.html', page.content)

    def test_unrelated_links_and_code_stay_unchanged(self):
        html = build.render_markdown(
            '[Elsewhere](https://example.com/terms/transformer/)\n\n'
            '`[Transformer](https://gridterms.org/terms/transformer/)`'
        )
        annotated, glossary = prepare_gridterms(html)
        self.assertEqual(annotated, html)
        self.assertIsNone(glossary)

    def test_repeated_link_shares_one_definition_and_unknown_term_fails(self):
        origin = load_catalog()['origin']
        html = build.render_markdown(f'[One]({origin}/terms/transformer/) and [two]({origin}/terms/transformer/)')
        annotated, glossary = prepare_gridterms(html)
        self.assertEqual(annotated.count('data-grid-term='), 2)
        self.assertEqual(len(json.loads(glossary['json'])), 1)
        with self.assertRaisesRegex(ValueError, 'Unknown Gridterms entry'):
            prepare_gridterms(f'<a href="{origin}/terms/misspelled/">Broken</a>')

    def test_embedded_json_cannot_end_script(self):
        from unittest.mock import patch
        origin = load_catalog()['origin']
        term = {**load_catalog()['terms']['transformer'], 'definition': '</script><script>bad</script>'}
        with patch('gridterms.load_catalog', return_value={'origin': origin, 'terms': {'transformer': term}}):
            _, glossary = prepare_gridterms(f'<a href="{origin}/terms/transformer/">Term</a>')
        self.assertNotIn('</script>', glossary['json'])
        self.assertEqual(json.loads(glossary['json'])['transformer']['definition'], term['definition'])


if __name__ == '__main__':
    unittest.main()
