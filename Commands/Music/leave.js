const Discord = require('discord.js');

module.exports = {
  name: "leave",
  dev: false, 
  usage: "leave",
  description: "leaves voice channel",
  run: async (client, message, args) => {
    
    let player = client.music.players.get(message.guild.id);
    if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Join a voice channel before using this command!"));
    if(!message.guild.me.hasPermission(["CONNECT","SPEAK"])) return client.util.missingPerms(message, ["CONNECT","SPEAK"]);
    if(player) client.music.players.delete(message.guild.id);
    
    player.voiceChannel.disconnect();
    
    return message.channel.send(`Successfully left ${player.voiceChannel.name}`);
    
  }
}