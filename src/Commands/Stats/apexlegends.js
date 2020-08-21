const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "apexlegends",
  dev: false,
  usage: {
    docs:"apexlegends <platform> <username>"
  },
  description: "Shows a apex legends status",
  run: async (client, message, args) => {

    let res = await fetch(`https://public-api.tracker.gg/v2/apex/standard/profile/${args[0]}/${args[1]}`, {
      headers:{
        "TRN-Api-Key": process.env.TrackerAPI,
        "Accept":"application/json",
        "Accept-Encoding":"gzip"
      }
    });
    let body = await res.json();
    console.log(res.status)
    if(res.status != 200) return message.channel.send('Something went wrong!');
    
    let fields = data(body);
    
    let segment = body.data.segments[0].stats;
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`${user} Apex Legends Status`);
    embed.setThumbnail(body.data.platformInfo.avatarUrl);
    embed.addFields(fields);
    embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL());
    embed.setTimestamp();
    return message.channel.send({embed: embed});
    
  }
}

function data(body){
  
  let segment = body.data.segments[0].stats;
  return [
    {
      name: "Damage",
      value: segment.damage.displayValue,
      inline: true
    },
    {
      name: "Kills",
      value: segment.kills.displayValue,
      inline: true
    },
    {
      name: "Kills As Leader",
      value: segment.killsAsKillLeader.displayValue,
      inline: true
    },
    {
      name: "Kills Per Match",
      value: segment.killsPerMatch.displayValue,
      inline: true
    },
    {
      name: "Level",
      value: segment.level.displayValue,
      inline: true
    },
    {
      name: "Matches Played",
      value: segment.matchesPlayed.displayValue,
      inline: true
    },
    {
      name: "Revives",
      value: segment.revives.displayValue,
      inline: true
    },
    {
      name: "Season Damage",
      value: segment.seasonDamage.displayValue,
      inline: true
    },
    {
      name: "Season Kills",
      value: segment.seasonKills.displayValue,
      inline: true
    },
    {
      name: "Season Wins",
      value: segment.seasonWins.displayValue,
      inline: true
    },
    {
      name: "Sniper Kills",
      value: segment.seasonKills.displayValue,
      inline: true
    },
    {
      name: "Winning Kills",
      value: segment.winningKills.displayValue,
      inline: true
    },
    {
      name: "Current Season",
      value: body.data.metadata.currentSeason,
      inline: true
    },
    {
      name: "Username",
      value: body.data.platformInfo.platformUserId,
      inline: true
    },
    {
      name: "Verified",
      value: body.data.userInfo.isVerified == false ? "No":"Yes",
      inline: true
    },
    {
      name: "Premium",
      value: body.data.userInfo.isPremium == false ? "No":"Yes",
      inline: true
    },
    {
      name: "Influencer",
      value: body.data.userInfo.isInfluencer == false ? "No":"Yes",
      inline: true
    },
    {
      name: "Country Code",
      value: body.data.userInfo.countryCode,
      inline: true
    },
    
  ]
  
}