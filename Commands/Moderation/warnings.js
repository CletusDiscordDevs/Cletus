const Discord = require('discord.js');
const path = require('path');
const db = require("quick.db");
module.exports = {
  name: "tempmute",
  dev: false,
  usage: {
    doc: "tempmute [@user] [s/m/d] [reason]",
    example: "tempmute [@user#3489] [s/m/d] [reason]"
  },
  category: path.basename(__dirname),
  description: "Mute member for a time frame",
  run: async (client, message, args) => {
    
    if(args[0] == undefined) return wrongSyntax.syntax(client, message);
      let member = getMemberFromMention(message, args[0]);
      let reason = args.slice(1).join(' ').length != 0 ? args.slice(1).join(' ') : "Not Specified"
      if(!member) return message.channel.send(`Invalid MemberID`)
      let warns = db.fetch(`warns_${message.guild.id}_${member.user.id}`);
      if(warns == null) db.set(`warns_${message.guild.id}_${member.user.id}`, []);
      warns = db.fetch(`warns_${message.guild.id}_${member.user.id}`);
      
      let warn = warns[0] == undefined ? 1 : warns.slice().sort(function(a,b){
        if(a.number>b.number) return 1;
        if(b.number>a.number) return -1;
        return 0;
      }).reverse()[0].Number+1
      
      if(warns == null) warns = [];
      
      warns.push({
        Number: warn,
        Reason: reason,
        Moderator: message.author.id,
        Date: Date.now()
      })
      
      db.set(`warns_${message.guild.id}_${member.user.id}`, warns);
      warns = db.fetch(`warns_${message.guild.id}_${member.user.id}`)
      
      let embed = new Discord.MessageEmbed();
      embed.setTitle(`${member.user.tag} has been warned`);
      embed.addField(`Current # of warnings`, warn);
      embed.addField(`Reason`, reason);
      embed.setFooter(`Moderator: ${message.author.tag} || Victim: ${member.user.tag}`, message.author.displayAvatarURL());
      embed.setTimestamp();
      return message.channel.send({embed: embed})
      
    }
  
}

class wrongSyntax {
  
  static syntax(client, message){
    
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Invalid Syntax`);
    embed.setDescription(`${client.config.prefix}warn <userID or mention> <reason(optional)>`)
    embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    return message.channel.send({embed: embed})
    
  }
  
}

function getMemberFromMention(message, str){
  
  if(!str) return;
  if(str.startsWith("<@") && str.endsWith('>')){
    str = str.slice(2,-1);
    if(str.startsWith("!")) str = str.slice(1);
    return message.guild.members.cache.get(str);
  } else {
    return message.guild.members.cache.get(str);
  }
  
}