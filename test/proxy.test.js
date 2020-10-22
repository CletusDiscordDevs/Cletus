/* eslint-disable */
const assert = require('assert');
const fetch = require("node-fetch");
const HttpsProxyAgent = require('https-proxy-agent');
const { doesNotMatch } = require('assert');

describe('Test Proxy server', async () => {

    it('Return different IP than local network', async (done) => {

        let localIP = await (await fetch("https://api.ipify.org?format=json")).json();
        let res = await fetch("https://api.ipify.org?format=json",{
            agent: new HttpsProxyAgent({
            host: "103.216.82.153",
            port: 6667,
            secureProxy: false
            })
        });
        let data = await res.json();
        resolve(localIP != data.ip);
        // return localIP != data.ip;
        console.log(body)
        done()     

    });

});

// function checkProxies(proxies, ...args) {

//     if(!(proxies instanceof Array)) throw new TypeError(`First argument must be array of proxies.`);
//     if(args.length != 0) console.log("function only needs and uses one argument");
//     return Promise.all(proxies.filter(async (proxy) => {

//         let online = false;
//         try {
//             let res = await fetch("https://api.ipify.org",{
//                 agent: HttpsProxyAgent(proxy)
//             });
//             if(res.status === 200) online = true;
//             else online = false;
//         } catch(e){
//             console.log(e)
//             process.exit()
//         }
//         return online ? false : true;

//     }));

// }