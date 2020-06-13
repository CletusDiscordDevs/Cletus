const Discord = require('discord.js');
const path = require('path');
const ms = require("ms");
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

  const logger = client.guild.channels.cache.find(c => c.name === 'bot-logs');
  if(message.channel.type == 'DM') return message.reply(new Discord.MessageEmbed().setDescription('You can use this command only in servers'));
	if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(new Discord.MessageEmbed().setDescription('I don\'t have permission to change nicknames!'));
	if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(new Discord.MessageEmbed().setDescription("You haven't the permission to execute this command!"));
	let mentionMember = message.mentions.members.first();
	let newNickname = args.slice(1).join(' ');
	if(!mentionMember) return message.channel.send(new Discord.MessageEmbed().setDescription("Mention the user you want to change the nickname"));
	if(!newNickname) return message.channel.send(new Discord.MessageEmbed().setDescription("Input the new nickname for the user you mentioned"));
	if(!mentionMember.kickable) return message.channel.send(new Discord.MessageEmbed().setDescription("Can't change nickname of this user, does he have a higher role? Is the server creator? Have I got the permission to change his nickname?"));
	try {
		mentionMember.setNickname(newNickname);
	} catch (error) {
		message.channel.send(new Discord.MessageEmbed().setDescription("Can't change nickname of this user, does he have a higher role? Is the server creator? Have I got the permission to change his nickname?"));
	} 
  let nickEmbed = new Discord.MessageEmbed()
  nickEmbed.setDescription("User Temp Muted")
	nickEmbed.setColor("#15f153")
	nickEmbed.addField("Nickname change", `${mentionMember.tag}`, true)
	nickEmbed.addField("Changed by", `${message.author.tag}`, true)
	nickEmbed.addField("New Nickname", message.createdAt, true)
  logger.send(nickEmbed)
	if(!logger) return message.channel.send(new Discord.MessageEmbed().setDescription("Couldn't find logging channel."));
	// message.channel.send(`Changed nickname of ${mentionMember} to **${newNickname}**`));
  }
}