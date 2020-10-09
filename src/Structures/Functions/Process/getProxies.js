const fs = require('fs');
const fetch = require('node-fetch');

module.exports = async () => {
  let res = await fetch('https://api.proxyscrape.com/?request=getproxies&proxytype=socks4&timeout=10000&country=all');
  let proxies = await res.text();
  return fs.writeFileSync(`${process.cwd()}/src/Assets/proxies.txt`, JSON.stringify(proxies.split('\n').map((str) => str.replace(/\r/g, ''))));
};
