const Discord = require('discord.js');
const path = require('path');

module.exports = {
  name: 'kick',
  dev: false,
  usage: {
    doc: 'kick',
    example: 'kick @user#0345'
  },
  category: path.basename(__dirname),
  description: 'Kick tagged member',
  run: async (client, message, args) => {
    const logger = client.channels.cache.find(c => c.name === 'bot-logs');
    if (message.channel.type === 'DM') return message.channel.send(new Discord.MessageEmbed().setDescription('You can use this command only in servers'));
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(new Discord.MessageEmbed().setDescription("You haven't the permission to execute this command!"));
    let mentionMember = message.mentions.members.first();
    if (!mentionMember) return message.channel.send(new Discord.MessageEmbed().setDescription('Mention the user you want to kick!'));
    if (!mentionMember.kickable) return message.channel.send(new Discord.MessageEmbed().setDescription("I haven't the permission to kick this user. Does he have a higher role? Have I got the permission to kick him?"));
    try {
      mentionMember.kick();
    } catch (error) {
      message.channel.send(new Discord.MessageEmbed().setDescription("Can't kick this user, does he have a higher role? Is the server creator? Have I got the permission to kick him?"));
    }
    let kickConfirmEmbed = new Discord.MessageEmbed();
    kickConfirmEmbed.setColor('#0099ff');
    kickConfirmEmbed.setAuthor('Member Kicked');
    kickConfirmEmbed.addField('User Kicked', `${mentionMember.user.tag}`, true);
    kickConfirmEmbed.addField('Moderator', `${message.author.tag}`, true);
    kickConfirmEmbed.addField('Channel', message.channel, true);
    kickConfirmEmbed.setTimestamp();
    logger.send(kickConfirmEmbed);
  }
};
