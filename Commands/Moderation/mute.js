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
  let tempMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let tempmuteReason = args.join(" ").slice(25);

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete();
	if(!tempMute) return message.channel.send(new Discord.MessageEmbed().setDescription("Couldn't find user."));
	if(tempMute.hasPermission("MANAGE_MESSAGES")) return message.delete();
	
	message.delete();
	if (tempmuteReason.length < 1) return message.channel.send(new Discord.MessageEmbed().setDescription('Please state a valid reason')).then(message => {
    	message.delete(10000);
	});

	let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");

	if(!muteRole){
		try{
			muteRole = await message.guild.roles.create({
				name: "Temp Mute",
				color: "#000000",
				permissions: []
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muteRole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				})
			})
		} catch(e) {
			console.log(e.stack);
		}
	}

	let muteTime = args[1];
	if(!muteTime) return message.channel.send(new Discord.MessageEmbed().setDescription("That is not a time period."));

	await(tempMute.roles.add(muteRole.id));
	let tempEmbed = new Discord.MessageEmbed()
	      tempEmbed.setDescription("User Temp Muted")
	      tempEmbed.setColor("#15f153")
	      tempEmbed.addField("Muted User", `${tempMute.tag}`, true)
	      tempEmbed.addField("Muted By", `${message.author.tag}`, true)
	      tempEmbed.addField("Channel", message.channel, true)
	      tempEmbed.addField("Time", message.createdAt, true)
	      tempEmbed.addField("Reason", tempmuteReason, true)
	      tempEmbed.addField("Length", `${muteTime}`, true);

logger.send(tempEmbed)
	if(!logger) return message.channel.send(new Discord.MessageEmbed().setDescription("Couldn't find logging channel."));

	message.delete().catch(O_o=>{});

	logger.send(tempEmbed);

	setTimeout(function(){
		tempMute.roles.remove(muteRole.id);
		logger.send(new Discord.MessageEmbed().setDescription(`${tempMute} mute has expired.`));
	}, ms(muteTime));
  }
}