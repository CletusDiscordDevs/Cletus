const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db')
const ms = require('ms')
module.exports = {
  name: "set-profile",
  dev: false,
  usage: {
    doc: "profile",
    example: "profile"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  run: async (client, message, args) => { 
    

 let user = message.mentions.members.first() || message.author;
    let author = message.author;
     const startEmbed = new Discord.MessageEmbed()
         startEmbed.setTitle('Set your profile')
         startEmbed.setDescripton('I have moved this you your dm\'\s to prevent spam.')   
    message.channel.send({ embed: startEmbed })
    const jobEmbed = new Discord.MessageEmbed()
       jobEmbed.setTitle('Pick A Job')
       jobEmbed.setDescription('Pick a job')
       jobEmbed.addField('Web Developer', 'Hourly: $61-80\nKeyword: `webdev`', true)
       jobEmbed.addField('Software Developer', 'Hourly: $81-100\nKeyword: `softdev`', true)
       jobEmbed.addField('Mobile Developer', 'Hourly: $41-60\nKeyword: `mobdev`', true)
       jobEmbed.addField('Car Dealer', 'Hourly: $20\nKeyword: `cardealer`', true)
       jobEmbed.addField('Cashier', 'Hourly: $10\nKeyword:`cashier`', true)
       jobEmbed.addField('Lifeguard', 'Hourly: $7\nKeyword:`lifeguard`', true)
       // jobEmbed.addField('', 'Hourly: $ \nKeyword:``', true)
      message.author.send({ embed: jobEmbed })
  

    const bankEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} Profile`)
        .setTimestamp()
    
    // message.channel.send({ embed: profileEmbed});



  }
}