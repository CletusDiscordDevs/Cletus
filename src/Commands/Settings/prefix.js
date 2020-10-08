const Discord = require('discord.js');
const db = require('quick.db');
const path = require('path');

module.exports = {
  name: "setprefix",
  dev: true,
  usage: {
    doc: "test",
    example: "setprefix [prefix]"
  },
  category: path.basename(__dirname),
  description: "Test command for developers",
  run: async (client, message, args) => {
    
    let defaultPrefix = client.config.prefix;
    if(args[0] == undefined) return message.channel.send(new Discord.MessageEmbed().setDescription('You cannot set the prefix to nothing!'))
    if(args[0] == "reset"){
      db.set(`prefix_${message.guild.id}`, defaultPrefix)
      return message.channel.send(`Succesfully changed the prefix to ${defaultPrefix}`)
    } else {
      db.set(`prefix_${message.guild.id}`, args[0])
      return message.channel.send(`Succesfully changed the prefix to ${args[0]}`)
    }
  
    } 
  }
