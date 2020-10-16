/* eslint-disable */
const assert = require('assert');
const fetch = require("node-fetch");

describe('Test Proxy server', async () => {
    let ProxyResponse = await fetch('https://api.proxyscrape.com/?request=getproxies&proxytype=socks4&timeout=10000&country=all');
    let proxies = await ProxyResponse.text();
    let proxy  = proxies.split("\n")[0];
    let {0: host, 1: port} = proxy.split(":");
    const res = await fetch("https://google.com",{
        host,
        port
    });
    console.log(res)
});
