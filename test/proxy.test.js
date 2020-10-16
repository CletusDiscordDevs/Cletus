/* eslint-disable */
const assert = require('assert');
const fetch = require("node-fetch");

describe('Test Proxy server', async () => {
    const res = await fetch("https://google.com",{
        host: "104.238.97.215",
        port: 36067
    });
    console.log(res)
});
