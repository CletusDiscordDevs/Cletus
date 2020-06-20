
const { Discord, MessageAttachment } = require('discord.js');
const path = require('path');
const util = require('util');
const db = require('quick.db');
const ms = require('ms');

module.exports = {
  name: "rank",
  dev: false,
  usage: {
    doc: "rank",
    example: "rank"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  run: async (client, message, args) => { 
    
  let user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    match(args.join(" ").toLowerCase(), message.guild) ||
    message.author;
    
    
  let author = message.author.id;
  if(util.isNull(client.db.get(`xp_${author}`))){
    client.db.set(`xp_${author}`, 0);
  }
  if(util.isNull(client.db.get(`level_${author}`))){
    client.db.set(`level_${author}`, 1);
  }
  let xp = client.db.get(`xp_${author}`);
  let lvl = client.db.get(`level_${author}`);
  
  let every = client.db
    .all()
    .filter(i => i.ID.startsWith("xp_"))
    .sort((a, b) => b.data - a.data);
    
    
  let rank = every.map(x => x.ID).indexOf(`level_${author}`) + 1;
  rank = rank.toString();
    
  //rank({ username, discrim, level, rank, neededXP, currentXP, avatarURL })
  console.log(`${author} ${xp} ${lvl}`)
  let img = await client.canvas.rank({
    username: user.username,
    discrim: user.discriminator,
    level: lvl,
    rank: rank,
    neededXP: getReqXPForLvl(lvl),
    currentXP: xp.toString(),
    avatarURL: user.displayAvatarURL({ format: "png" }),
    color: "#42f572"
  });
  return message.channel.send(new MessageAttachment(img, "rank.png"));
  }
}
function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}

function getReqXPForLvl(lvl){
  return Math.floor(151.9803 + (47.06153 * (lvl - 1)) + Math.pow(5.048377 * (lvl - 1),2));
}