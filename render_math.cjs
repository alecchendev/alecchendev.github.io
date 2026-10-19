const fs = require('node:fs');
const katex = require('katex');

try {
  const equations = JSON.parse(fs.readFileSync(0, 'utf8'));
  const rendered = equations.map(({tex, displayMode}) =>
    katex.renderToString(tex, {
      displayMode,
      output: 'htmlAndMathml',
      throwOnError: true,
      trust: false,
    })
  );
  process.stdout.write(JSON.stringify(rendered));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
