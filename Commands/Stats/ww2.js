const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "ww2",
  dev: false,
  usage: {
    docs:"ww2 <username>"
  },
  description: "Shows a Call of Duty WW2 stats",
  run: async (client, message, args) => {
    
    let api = `https://cod-api.theapinetwork.com/api/stats/wwii/${args[0]}/${args[1]}?type=multiplayer`
    
    fetch(api).then(r => {
      const statsEmbed = new Discord.MessageEmbed()
      .setTitle('Call of Duty WW2 Stats from ${args[0]}')
      .setColor('#fa521c')			
      .addField("Wins", `${r.body.stats.wins}`, true)
			.addField("Loses", `${r.body.stats.losses}`, true)
			.addField("Kills", `${r.body.stats.kills}`, true)
			.addField("Deaths", `${r.body.stats.deaths}`, true)
			.addField("Prestige", `${r.body.stats.prestige}`, true)
			.addField("Level", `${r.body.stats.level}`, true)
      message.channel.send(statsEmbed)
    })
  }
}
    