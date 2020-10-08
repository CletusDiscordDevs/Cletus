const Discord = require('discord.js');
const path = require('path');

module.exports = {
  name: "ban",
  dev: false,
  usage: {
    doc: "ban",
    example: "Ban @user#3489"
  },
  category: path.basename(__dirname),
  description: "Ban members",
  run: async (client, message, args) => {

const logger = client.channels.cache.find(c => c.name === 'bot-logs');
    if(message.channel.type == 'DM') return message.reply(new Discord.MessageEmbed().setDescription('You can use this command only in servers'));
	var user = message.mentions.users.first();
	const banReason = args.slice(1).join(' ');
	if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(new Discord.MessageEmbed().setDescription("You haven't the permission to execute this command!"));
	if(!user) {
		try {
			if (!message.guild.members.cache.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\'t get a Discord user with this userID!');
			user = message.guild.members.cache.get(args.slice(0, 1).join(' '));
			user = user.user;
		} catch (error) {
			return message.channel.send(new Discord.MessageEmbed().setDescription('Couldn\'t get a Discord user with this userID!'));
		}
	}
	if (user === message.author) return message.channel.send(new Discord.MessageEmbed().setDescription('You can\'t ban yourself'));
	if (!banReason) return message.channel.send(new Discord.MessageEmbed().setDescription('You forgot to enter a reason for this ban!'));
	message.guild.members.ban(user, { reason: banReason });
	const banConfirm = new Discord.MessageEmbed()
	banConfirm.setColor('#0099ff')
	banConfirm.setDescription(`${user.tag} has been successfully banned!\nReason: __${banReason}__`)
  banConfirm.addField('User Banned', `${user.tag}`, true)
  banConfirm.addField('Reason', `${banReason}`, true)
  banConfirm.addField('Moderator', `${message.author.tag}`, true)
  banConfirm.setTimestamp()
	logger.send(banConfirm);
    
  }
}