const Discord = require('discord.js');
const path = require('path');
const util = require('util');

module.exports = {
    name: "ping",
    dev: true,
    usage: {
        doc: "ping",
        example: "ping"
    },
    category: path.basename(__dirname),
    description: "Checks the bots ping",
    run: async(client, message) => {
        // You do not nead to add the emoji
    await message.channel.send('<a:googleloading:763951217583849473> Pinging...').then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        message.channel.send(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)

    })
    },
}