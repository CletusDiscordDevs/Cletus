const Discord = require('discord.js');
const path = require('path');
const ms = require('ms');
const Database = require("better-sqlite3");
const db = new Database('./json.sqlite');

module.exports = {
  name: "upload",
  dev: false,
  usage: {
    doc: "upload",
    example: "upload"
  },
  category: path.basename(__dirname),
  description: "earn money for the eco system",
  run: async (client, message, args) => {
    

	  var account = message.author.id
    // let author = await db.fetch(`work_${message.guild.id}_${user.id}`)
    let money = Math.floor(Math.random() * 10000) + 1290; 


    
    let uplaodEmbed = new Discord.MessageEmbed()
    .setDescription('Here are some stats from you\'\re upload')
    .addField('Money', `${money.toLocaleString()}`, true)

    
    return message.channel.send({embed: uplaodEmbed});
  }
}