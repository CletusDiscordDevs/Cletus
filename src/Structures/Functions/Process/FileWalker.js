const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const path = require('path');

module.exports = function fileWalker (path) {
  let items = [];
  let files = fs.readdirSync(path);
  files.forEach((file) => {
    let stats = fs.statSync(`${path}/${file}`);
    if (stats.isDirectory()) return items.push(fileWalker(`${path}/${file}`));
    items.push(`${path}/${file}`);
  });
  return items.flat();
};
