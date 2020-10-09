// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const path = require('path');

module.exports = {
  name: 'ping',
  dev: true,
  usage: {
    doc: 'ping',
    example: 'ping'
  },
  category: path.basename(__dirname),
  description: 'Checks the bots ping',
  run: async (client, message) => {
    await message.channel.send('<a:googleloading:763951217583849473> Pinging...').then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;

      message.channel.send(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`);
    });
  }
};
