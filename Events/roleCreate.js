const Discord = require('discord.js')
module.exports = (client, role, message) => {

  if(role.guild.channels.cahe.find(c => c.name === "bot-logs")){
    const roleEmbed = new Discord.MessageEmbed()
      roleEmbed.setTitle('Role Created');
      roleEmbed.addField(`Role Name`, `${role.name}`)
      roleEmbed.addField(`Role ID`, `${role.id}`)
      roleEmbed.addField(`Users in role`, `${role.members.size}`)
      roleEmbed.addField(`Mentionable`, `${role.mentionable}`)
      roleEmbed.addField(`isplayed separately`, `${role.hoist}`)
      roleEmbed.addField(`Color`, `${role.color}`)
    role.guild.channels.cache.find(c  => c.name === "bot-logs").send({ embed: roleEmbed });
  }
}                 
  
