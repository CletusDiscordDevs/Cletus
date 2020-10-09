const fetch = require('node-fetch');

class SpotifyManager {
  constructor () {
    this.accessToken = null;
    this.refreshToken();
  }

  async search (proxy, query) {
    let res = await fetch(`https://spclient.wg.spotify.com/searchview/km/v4/search/${encodeURIComponent(query)}?entityVersion=2&limit=10&imageSize=large&catalogue=&country=US&locale=en&platform=web`, {
      // "host": proxy[0],
      // "port": proxy[1],
      headers: {
        authorization: `Bearer ${this.accessToken}`
      }
    });
    let body = await res.json();
    if (body.error) {
      if (body.error.status === 401 && ['The access token expired', 'Invalid access token'].includes(body.error.message)) {
        await this.refreshToken();
        body = await this.search(proxy, query);
      }
    }
    return body;
  }

  async refreshToken () {
    let res = await fetch('https://open.spotify.com/get_access_token?reason=transport&productType=web_player');
    let body = await res.json();
    this.accessToken = body.accessToken;
    return body.accessToken;
  }
}

module.exports = SpotifyManager;
