const path = require('path');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'test',
  dev: true,
  usage: {
    doc: 'test',
    example: 'test'
  },
  category: path.basename(__dirname),
  description: 'Test command for developers',
  path: __filename,
  run: async (client, message, args) => {
    let res = await fetch('https://discordemoji.com/api/');
    let fetchedEmojisFromwebsite = await res.json();
    let data = [];
    for (let i = 0; i < 25; i++) {
      data.push(random(data, fetchedEmojisFromwebsite));
    }
    let embed = new Discord.MessageEmbed();
    for (let i = 0; i < 25; i++) {
      embed.addField(data[i].title, `**Description:** ${data[i].description}\n**Slug:** ${data[i].slug}\n**Favorites:** ${data[i].faves}\n**Submitted By:** ${data[i].submitted_by}`, true);
    }
    return message.channel.send({ embed: embed });
  }
};

function random (hasArr, arr) {
  let emoji = arr[Math.round(Math.random() * arr.length)];
  if (hasArr.includes(emoji)) emoji = random(hasArr, arr);
  return emoji;
};
