const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db');
const ms = require('ms');
const { get } = require('node-superfetch');
const { Canvas } = require('canvas-constructor');
module.exports = {
  name: "profile",
  dev: false,
  usage: {
    doc: "profile",
    example: "profile"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  run: async (client, message, args) => { 
    

 let user = message.mentions.members.first() || message.author;
    
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    if (money === null) money = 0;
    
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    if (bank === null) bank = 0;
    
    Canvas.registerFont(`${process.cwd()}/assests/Name-offont.tff`)
  
//     let theMax = db.fetch(`the-max_${message.guild.id}_${user.id}`) == true ? "The Max" : ""

//     let avaHollwood = db.fetch(`the-max_${message.guild.id}_${user.id}`) == true ? "AVA Hollywood" : ""    
  	// let house = await db.fetch(`house_${message.guild.id}_${user.id}`)
  
    //   db.set(`ford-fusion-hybird${message.guild.id}_${user.id}`, true)
    const profileEmbed = new Discord.MessageEmbed()
        profileEmbed.setAuthor(`${message.author.tag} Profile`)
        profileEmbed.addField('Money:', `${money.toLocaleString()}`, true)
        profileEmbed.addField('Bank:', `$${bank.toLocaleString()}`, true)
        profileEmbed.addField('Level', `${levelfetch}`, true)
        profileEmbed.addField('Items', '\u200b', false)
        profileEmbed.addField('Laptop', `${laptop}`, true)
        profileEmbed.setTimestamp()
    
    message.channel.send({ embed: profileEmbed});



  }
}