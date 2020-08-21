const fetch = require("node-fetch");
const cheerio = require("cheerio");

module.exports = async (link) => {
 
    const params = `hl=${options.lang || 'en'}`;
    const watchPageURL = `${VIDEO_URL + id}&${params}&bpctr=${Math.ceil(Date.now() / 1000)}`;
    const jsonEndpointURL = `${watchPageURL}&pbj=1`;

    

}