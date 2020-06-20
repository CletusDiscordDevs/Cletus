const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db');
var afk = new db.table('afk')
afk.set('afk', true);
// afk.get('afk')
module.exports = {
  name: "afk",
  dev: false,
  usage: {
    doc: "clear amount of messages",
    example: "clear 10"
  },
  category: path.basename(__dirname),
  description: "Clear messages",
  run: async (client, message, args) => {
    
    let afklist = client.afk.get(message.author.id);

    if (!afklist) {
        let construct = {
            id: message.author.id,
        };
        var user = message.mentions.users.first();
        client.afk.set(message.author.id, construct);
        return message.channel.send(new Discord.MessageEmbed().setDescription(`@${user} has been set to afk....`)).then(msg => msg.delete(5000));
    }
  }
}