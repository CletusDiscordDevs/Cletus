const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

function missingPerm(message, permArr) {
  
  let missingPerms = permArr.map((perm) => {
    if(message.guild.me.hasPermission(perm)) return undefined
    return perm.split("_").map(str => str.slice(0,1).toUpperCase()+str.slice(1).toLowerCase()).join(" ");
  });
  
  let embed = new Discord.MessageEmbed();
  embed.setTitle(`Missing Permissions`);
  embed.setDescription(stripIndents`The following permissions are need to execute ${message.content.slice(message.client.config.prefix.length).split(" ")[0]}
  ${missingPerms.join("\n")}`);
  embed.setFooter(`Missing permissions`);
  embed.setTimestamp();
  return message.channel.send(embed);
  
}

module.exports = missingPerm;