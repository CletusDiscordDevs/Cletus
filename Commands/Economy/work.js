const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db');
const ms = require("parse-ms");
// var work = new db.table('work')

module.exports = {
  name: "work",
  dev: false,
  usage: {
    doc: "work",
    example: "work"
  },
  category: path.basename(__dirname),
  description: "earn money for the ecoonmy system",
  run: async (client, message, args) => {
    

	  var user = message.author.id
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`);

    let timeout = 6;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author))

    let embed = new Discord.MessageEmbed()
      embed.setTitle('Try Again')
      embed.setDescription(`You can't work right now.\nTry again in ${time.minutes}m ${time.seconds}s `)
      message.channel.send({ embed: embed })
      } else {
    
    let jobs = ['Programmer', 'Cashier', 'Waiter', 'Busboy', 'Chief', 'Truck Driver', 'Mechanic', 'Bouncer', 'Garbage Man'];
    
    
    let job = Math.floor((Math.random() * jobs.length));
    let reward = Math.floor(Math.random() * 100) + 300; 

    let uplaodEmbed = new Discord.MessageEmbed()
      uplaodEmbed.setTitle('PayCheck!');
      uplaodEmbed.setDescription(`You worked as a **${jobs[job]}** and earned **$${reward}**`);
    message.channel.send({embed: uplaodEmbed });
    
        
        
    db.add(`money_${message.guild.id}_${user.id}`, reward);
    let bank = db.get(`money_${message.guild.id}_${user.id}`);
        console.log(bank)
        message.channel.send(bank)
    db.set(`work_${message.guild.id}_${user.id}`, Date.now());
    };
  }
}