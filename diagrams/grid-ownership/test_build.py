import csv
import importlib.util
import json
from pathlib import Path
import re
import shutil
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('grid_builder', Path(__file__).with_name('build.py'))
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class DiagramBuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.source = Path(self.temp.name) / 'source'
        shutil.copytree(builder.SOURCE, self.source, ignore=shutil.ignore_patterns('__pycache__'))
        self.output = Path(self.temp.name) / 'output'
        for name, value in [('SOURCE', self.source), ('OUTPUT', self.output)]:
            patcher = patch.object(builder, name, value)
            patcher.start()
            self.addCleanup(patcher.stop)

    def update(self, filename, callback):
        path = self.source / filename
        with path.open(newline='', encoding='utf-8') as stream:
            rows = list(csv.DictReader(stream))
        callback(rows)
        with path.open('w', newline='', encoding='utf-8') as stream:
            writer = csv.DictWriter(stream, fieldnames=rows[0].keys())
            writer.writeheader()
            writer.writerows(rows)

    def test_edits_round_trip_without_breaking_inline_script(self):
        text = 'A comma, a "quote", a newline\nand </script><script>alert(1)</script>'
        self.update('nodes.csv', lambda rows: rows[0].update(description=text))
        builder.build()
        html = (self.output / 'grid-ownership.html').read_text()
        nodes = json.loads(re.search(r'const NODES = (\[.*?\n\]);', html, re.S)[1])
        self.assertEqual(nodes[0]['description'], text)
        self.assertIsInstance(nodes[0]['x'], int)
        self.assertNotIn(text, html)
        self.assertNotIn('grid-template-columns: minmax(0, 1fr) 310px', html)
        self.assertIn('grid-template-columns: minmax(0, 1fr) 310px',
                      (self.output / 'grid-ownership-fit.html').read_text())

    def test_duplicate_ids_fail(self):
        self.update('nodes.csv', lambda rows: rows[1].update(id=rows[0]['id']))
        with self.assertRaisesRegex(ValueError, 'unique'):
            builder.build()

    def test_broken_relationship_fails(self):
        self.update('relationships.csv', lambda rows: rows[0].update(to='missing'))
        with self.assertRaisesRegex(ValueError, 'unknown node'):
            builder.build()

    def test_build_is_repeatable(self):
        builder.build()
        first = (self.output / 'grid-ownership.html').read_bytes()
        builder.build()
        self.assertEqual(first, (self.output / 'grid-ownership.html').read_bytes())


if __name__ == '__main__':
    unittest.main()
