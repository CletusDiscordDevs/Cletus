const Discord = require('discord.js');

module.exports = {
  name: "play",
  dev: false, 
  usage: "play <terms>",
  description: "plays music",
  run: async (client, message, args) => {
    
    let player = client.music.players.has(message.guild.id) ? client.music.players.get(message.guild.id) : client.music.createPlayer(message.guild.id, message);
    if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Join a voice channel before using this command!"));
    if(!message.guild.me.hasPermission(["CONNECT","SPEAK"])) return client.util.missingPerms(message, ["CONNECT","SPEAK"]);;
    if(args.join(' ').length == 0) return message.channel.send(new Discord.MessageEmbed().setDescription('Need Query!'));
    let song = await player.getSong(args.join(' '));
    if(song == undefined) song = await player.getSong(args.join(' '));
    if(!song) return message.channel.send("Unable to find song");
    player.queue.add(song.title, song.url, message.author);
    if(!player.playing) player.play();
    return message.channel.send(new Discord.MessageEmbed().setDescription(`Successfully added [${song.title}](${song.url})`));

  }
}