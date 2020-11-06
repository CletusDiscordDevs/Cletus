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
        
      message.channel.send("<a:googleloading:763951217583849473> Pinging...").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp;

      m.delete();
      let botpingEmbed = new Discord.MessageEmbed()
      botpingEmbed.setTitle('Cletus Ping');
      botpingEmbed.setColor('#f8f8f8');
      botpingEmbed.addField('🤖 Bot Latency', `${client.ws.ping}`, true);
      botpingEmbed.addField('🌐 API Latency', `${ping}`, true)
      botpingEmbed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ size: 2048 }));
      botpingEmbed.setTimestamp();

      message.channel.send(botpingEmbed)
    });
  }
}
