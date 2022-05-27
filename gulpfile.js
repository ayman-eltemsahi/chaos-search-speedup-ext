const { src, dest, series } = require('gulp');
const { writeFile } = require('fs').promises;

const DEST_DIR = 'unpacked';

const copyUI = () =>
  src('src/ui/*.!(ts)')
    .pipe(dest(`${DEST_DIR}/`));

const copyManifest = () =>
  src('src/manifest.json')
    .pipe(dest(`${DEST_DIR}/`));

const writeReadMe = () => writeFile('unpacked/README.md', 'THIS FOLDER IS AUTO GENERATED, DO NOT MODIFY ANYTHING HERE.');

exports.default = series(
  copyUI,
  copyManifest,
  writeReadMe
);
