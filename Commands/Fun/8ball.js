const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db');

module.exports = {
  name: "8ball",
  dev: false,
  usage: {
    doc: "8ball",
    example: "8ball <question>"
  },
  category: path.basename(__dirname),
  description: "cmd desc",
  run: async (client, message, args) => {
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('What would you like to ask?'));
    const msg = await message.channel.send(new Discord.MessageEmbed().setDescription('${client.util.emoji.typing} **8ball** is generating a response for `${args[0]}`'));
    await client.sleep(1500)
    return message.edit(`**${client.util.random(client.util.eightBall)}`)
    
  }
}
