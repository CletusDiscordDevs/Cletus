const fetch = require("node-fetch");
const ProxyVerifier = require("proxy-verifier");

(async () => {

    let HttpProxies = await (await fetch("https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all")).text();
    let Socks4Proxies = await (await fetch("https://api.proxyscrape.com/?request=getproxies&proxytype=socks4&timeout=10000&country=all")).text();
    let Socks5Proxies = await (await fetch("https://api.proxyscrape.com/?request=getproxies&proxytype=socks5&timeout=10000&country=all")).text();
    let proxies = [HttpProxies, Socks4Proxies, Socks5Proxies].join("\n").split("\n").map((p) => {
        let proxy = p.split(":");
        try{
            return {
                ipAddress: proxy[0],
                port: proxy[1]
            }
        }catch(e){
            console.log(proxy)
        }
    });
    console.log(proxies[0])

    // ProxyVerifier.testAll(proxy, (e, r) => {

    // });
})();