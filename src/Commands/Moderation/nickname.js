const Discord = require('discord.js');
const path = require('path');
const ms = require("ms");
module.exports = {
  name: "nickname",
  dev: false,
  usage: {
    doc: "nickname [@user#3489]",
    example: "nickname [@user#3489]"
  },
  category: path.basename(__dirname),
  description: "Changes the nickname of a user",
  argsType: 'multiple',

  run: async (message, args) => {
	const target = message.mentions.users.first()
	const member = message.guild.members.cache.get(target.id)

	args.shift()
	const nickname = args.join(' ')

	member.setNickname(nickname)

	message.channel.send('You changed the nickname!')
  }
}
