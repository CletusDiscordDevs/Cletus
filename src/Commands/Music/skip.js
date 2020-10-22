const Discord = require('discord.js');

module.exports = {
  name: 'skip',
  dev: false,
  usage: 'skip',
  description: 'skips current song',
  run: async (client, message, args) => {
    let player = client.music.players.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('Join a voice channel before using this command!'));
    if (!message.guild.me.hasPermission(['CONNECT', 'SPEAK'])) return client.util.missingPerms(message, ['CONNECT', 'SPEAK']);
    if (!player) return message.channel.send(new Discord.MessageEmbed().setDescription('Nothing is playing!'));

    let song = player.queue[0];
    player.finish();

    return message.channel.send(`Successfully skipped ${song.title} by ${song.requester.tag}`);
  }
};
