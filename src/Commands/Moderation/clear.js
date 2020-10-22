const Discord = require('discord.js');
const path = require('path');

module.exports = {
  name: 'clear',
  dev: false,
  usage: {
    doc: 'clear amount of messages',
    example: 'clear 10'
  },
  category: path.basename(__dirname),
  description: 'Clear messages',
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('You haven\'t given an amount of messages which should be deleted!'));
    if (isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed().setDescription("The amount parameter isn't a number!"));
    if (args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setDescription("You can't delete more than 100 messages at once!"));
    if (args[0] < 1) return message.reply(new Discord.MessageEmbed().setDescription('You have to delete at least 1 message!'));

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setDescription("You haven't the permission to execute this command!"));

    await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
      message.channel.bulkDelete(messages).then(messages => message.channel.send(`Deleted ${messages.size} messages`))
      
    });
  }
};
