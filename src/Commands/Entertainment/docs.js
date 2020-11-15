const path = require('path');
const fetch = require('node-fetch');

module.exports = {
  name: 'docs',
  dev: false,
  usage: {
    doc: 'docs <query>',
    example: 'docs MessageEmbed'
  },
  category: path.basename(__dirname),
  description: 'Displays Discord.js documentation',
  run: async (client, message, args) => {

    let res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`);
    let body = await res.json();
    if(body) message.channel.send({ embed: body });
    else return message.channel.send('❌ Could not find that documentation');
    
  }
};
