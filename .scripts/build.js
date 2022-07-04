const path = require('path');
const rimraf = require('rimraf');
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

build({ watch: process.argv.includes('--watch') });

function build({ watch }) {
  const entry = resolvePath('src/main.ts');
  const dist = resolvePath('dist');
  const outfile = path.join(dist, 'main.js');

  rimraf.sync(dist);

  esbuild.build({
    watch,
    outfile,
    entryPoints: [entry],
    format: 'cjs',
    platform: 'node',
    target: 'node16',
    bundle: true,
    logLevel: 'info',
    plugins: [nodeExternalsPlugin()]
  });
}

function resolvePath(relativePath) {
  return path.resolve(__dirname, '..', relativePath);
}
