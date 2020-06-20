const db = require('quick.db');
const util = require('util');
// var afk = new db.table('afk')
// afk.get('afk')
// afk.set('afk', false)
module.exports = (client, message) => {
  if(message.author.bot) return;  
    //xp(message)
    let msgArr = message.content.slice(client.config.prefix.length).split(" ");
    let args = msgArr.slice(1);
    let cmd = msgArr[0].toLowerCase();
    let commandfile = client.commands.concat(client.aliases).get(cmd);

    if (message.content.includes(message.mentions.users.first())) {
    client.afk.forEach(key => {
      if (key.id == message.mentions.users.first().id) {
        message.guild.fetchMember(key.id).then(member => {
          let user_tag = member.user.tag;
          return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
        });
      }
    });
  }

  client.afk.forEach(key => {
    if (message.author.id == key.id) {
      client.afk.delete(message.author.id);
      return message.channel.send(`you have been removed from the afk list!`).then(msg => msg.delete(5000));
    }
  });
  
    if(message.content.startsWith(client.config.prefix)){
      if(!commandfile) return;
      commandfile.run(client, message, args);
    }else{
      
      let author = message.author.id;
      let xpCooldown = 10;//in seconds
      let msgLen = message.content.length;

      let xpRandL = Math.floor(Math.random() * 20 + 20); // 20-40  
      let xpRandM = Math.floor(Math.random() * 20 + 40); // 40-60    
      let xpRandH = Math.floor(Math.random() * 20 + 80); // 80-100
      if(util.isNull(client.db.get(`xp_${author}`))){
        client.db.set(`xp_${author}`, 0);
      }
      if(util.isNull(client.db.get(`level_${author}`))){
        client.db.get(`level_${author}`, 1);
      }

      
      let xp = client.db.get(`xp_${author}`);
      let lvl = client.db.get(`level_${author}`);
      
      if(!client.talkedRecently.has(author)){
          client.talkedRecently.add(author);
          xp += msgLen <= 25 ? xpRandL : msgLen <= 60 ? xpRandM : xpRandH;
          setTimeout(() => {
              client.talkedRecently.delete(author);
          }, xpCooldown * 1000)
      }

      if(xp >= getReqXPForLvl(lvl)){
          lvl++;
          xp = 0;
          message.channel.send(`:tada: ${message.author.toString()}, You just advanced to level ${lvl}!`);
      }
      
      client.db.set(`xp_${author}`, xp);
      client.db.set(`level_${author}`, lvl);
    }
}
  
function getReqXPForLvl(lvl){
  return Math.floor(151.9803 + (47.06153 * (lvl + 1)) + Math.pow(5.048377 * (lvl - 1),2));
}