const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: 'spotify',
  dev: false,
  usage: 'spotify <query>',
  description: 'search spotify',
  run: async (client, message, args) => {
    let proxies = JSON.parse(Buffer.from(fs.readFileSync('proxies.json')).toString('utf8'));
    let proxy = proxies[Math.round(Math.random() * proxies.length)];
    let body = await client.music.spotify.search(proxy.split(':'), args.join(' '));
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Spotify results for ${args.join(' ')}`);
    embed.setDescription(body.results.tracks.hits.map((t, i) => `**${i + 1}:** [${t.name} by ${t.artists.map((a) => a.name).join(', ')}](${`https://open.spotify.com/track/${t.uri.slice(14)}`})`));
    return message.channel.send({ embed: embed });
  }
};
