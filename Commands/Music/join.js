const Discord = require('discord.js');

module.exports = {
  name: "join",
  dev: false, 
  usage: "join",
  description: "joins voice channel",
  run: async (client, message, args) => {
    
    if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Join a voice channel before using this command!"));
    if(!message.guild.me.hasPermission(["CONNECT","SPEAK"])) return client.util.missingPerms(message, ["CONNECT","SPEAK"]);
    
    message.member.voice.channel.join();
    
    return message.channel.send(`Successfully joined ${message.member.voice.channel.name}`);
    
  }
}