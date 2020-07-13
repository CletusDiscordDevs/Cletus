const Discord = require('discord.js');

module.exports = {
  name: "search",
  dev: false, 
  usage: "search <terms>",
  description: "searchs query and plays music",
  run: async (client, message, args) => {
    
    if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription("Join a voice channel before using this command!"));
    if(!message.guild.me.hasPermission(["CONNECT","SPEAK"])) return client.util.missingPerms(message, ["CONNECT","SPEAK"]);
    let player = client.music.players.has(message.guild.id) ? client.music.players.get(message.guild.id) : client.music.createPlayer(message.guild.id, message);
    if(args.join(' ').length == 0) return message.channel.send(new Discord.MessageEmbed().setDescription('Need Query!'));
    let songs = await player.getSongs(args.join(' '));
    
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Results for ${args.join(' ')}\nYou have 20 seconds to choose!`);
    embed.setDescription(songs.map((song, i) => `**${i+1}**: [${song.title}](${song.url})`));
    embed.setFooter(`Music System`, client.user.displayAvatarURL());
    let msg = await message.channel.send({embed: embed});
    let response = await client.util.getResponse(message, (m) => /[0-9]/.test(m.content), { max: 1, time: 20000 });
    
    msg.delete();
    let song = songs[Number(response.first().content)];
    console.log(response.first().content);
    player.queue.add(song.title, song.url);
    if(!player.playing) return player.play();
    
  }
}