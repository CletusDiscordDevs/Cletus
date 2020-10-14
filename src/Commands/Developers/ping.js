// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const path = require('path');

module.exports = {
    name: "ping",
    dev: true,
    usage: {
        doc: "ping",
        example: "ping"
    },
    category: path.basename(__dirname),
    description: "Checks the api and bots ping",
    run: async(client, message) => {
        // You do not need to add the emoji
    await message.channel.send('<a:googleloading:763951217583849473> Pinging...').then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;


      let botpingEmbed = new Discord.MessageEmbed();
      botpingEmbed.setTitle('Cletus Ping')
      botpingEmbed.setColor('#ffffff');
      botpingEmbed.addField('Bot 🤖', `${ping}`, true)
      botpingEmbed.addField('API', `${client.ws.ping}`, true)
      botpingEmbed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({size: 2048}))
      botpingEmbed.setTimestamp()

      message.channel.send(botpingEmbed)
    });
  }
};
