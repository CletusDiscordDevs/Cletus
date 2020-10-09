const Discord = require('discord.js');

module.exports = {
  name: 'queue',
  dev: false,
  usage: 'queue <page num>',
  description: 'plays music',
  run: async (client, message, args) => {
    let player = client.music.players.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('Join a voice channel before using this command!'));
    if (!player) return message.channel.send(new Discord.MessageEmbed().setDescription('Nothing is playing!'));

    let num = !args[0] ? Number(args[0]) : 0;
    let embed = new Discord.MessageEmbed();
    embed.setTitle('Queue');
    embed.setDescription(player.songs[num].map((s, i) => `**${i}**: [${s.title}](${s.title})`).join('\n'));
    return message.channel.send({ embed: embed });
  }
};
