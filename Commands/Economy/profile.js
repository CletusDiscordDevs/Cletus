
const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db');
const ms = require('ms');
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./Assets/Fonts/KOMIKAX.ttf',{ family: "Comic" });
// var work = new db.table('work')
    

module.exports = {
  name: "profile",
  dev: false,
  usage: {
    doc: "profile",
    example: "profile"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  run: async (client, message, args) => { 
    

    let user = message.mentions.members.first() || message.author;
    let canvas = createCanvas(1204,677);
    let background = await loadImage(`./Assets/Images/image.png`);
    let imageSize = 4096;
    let imageSizeNew = imageSize/16;


   let money = db.get(`money_${message.guild.id}_${user.id}`)
      if (money === null) money = 0;
    console.log(money)
    let ctx = canvas.getContext('2d');
    
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = "50px comic"
        ctx.fillText(money, 570, 264);
        ctx.beginPath();
        ctx.arc(175, 341, imageSizeNew/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
    

 let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "random.jpg");
    let embed = new Discord.MessageEmbed();
    embed.attachFiles(attachment)
    embed.setImage('attachment://random.jpg');
    return message.channel.send({embed: embed})
  }
}