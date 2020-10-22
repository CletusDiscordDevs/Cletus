const Discord = require('discord.js');

module.exports = {
  name: 'volume',
  dev: false,
  usage: 'volume <number>',
  description: 'sets volume',
  run: async (client, message, args) => {
    let player = client.music.players.get(message.guild.id);
    if (!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('Join a voice channel before using this command!'));
    if (!player) return message.channel.send(new Discord.MessageEmbed().setDescription('Nothing is playing!'));
    if (!args[0]) return message.channel.send('Cannot set volume as nothing!');

    player.connection.setVolume(args[0] / 10);

    return message.channel.sned(`Successfully setted the volume to ${args[0]}`);
  }
};
