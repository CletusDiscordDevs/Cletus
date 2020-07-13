const path = require('path');
const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: "invert",
  dev: false,
  usage: {
    doc: "invert",
    example: "invert"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  path: __filename,
  run: async (client, message, args) => {

    let msg = await message.channel.send('Generating image...');
    let avatar = await loadImage(message.author.displayAvatarURL({ format: "jpg", size: 4096 }));
    let canvas = createCanvas(1024,1024);
    let ctx = canvas.getContext('2d');

    ctx.drawImage(avatar, 0, 0);

    let imageData = ctx.getImageData(0, 0, avatar.width, avatar.height);
    let data = imageData.data;

    for(let i=0;i < data.length;i += 4){
      data[i] = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }

    ctx.putImageData(imageData, 0, 0);

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "random.jpg");
    let embed = new Discord.MessageEmbed();
    embed.attachFiles(attachment);
    embed.setImage('attachment://random.jpg');
    return await msg.edit({embed: embed});
    // return msg.edit(null, {embed: embed})

  }
}