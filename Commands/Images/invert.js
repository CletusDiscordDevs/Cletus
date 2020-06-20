const path = require('path');
const Discord = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./Assets/Fonts/KOMIKAX.ttf',{ family: "Comic" });

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

    
    let canvas = createCanvas(512, 512);
    let ctx = canvas.getContext('2d');
    let mention = message.mentions.users.size > 0 ? message.mentions.members.last().user : message.author;
    let avatar = await loadImage(mention.displayAvatarURL({ format: "png", size: 512 }));

    ctx.drawImage(avatar, 0, 0);

    let imageData = ctx.getImageData(0, 0, avatar.width, avatar.height);
    let data = imageData.data;

    for(let i = 0; i < data.length; i += 4) {
        // red
        data[i] = 255 - data[i];
        // green
        data[i + 1] = 255 - data[i + 1];
        // blue
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'inverted.png');
    message.channel.send(attachment); 
    
    /*let msg = await message.channel.send('Generating image...');
    let background = await loadImage(`./Assets/Images/image.png`);
    let imageSize = 4096;
    let imageSizeNew = imageSize/16;
    let avatar = await loadImage(message.author.displayAvatarURL({ format: "jpg", size: imageSize }));
    let canvas = createCanvas(1204,677);
    let ctx = canvas.getContext('2d');
    let user = message.author.tag;
    //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    //draw background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //choose font size and write text
    ctx.font = "50px comic"
    ctx.fillText(user, 570, 264);
    // ctx.fillText("Hello :)", 570, 264);
    //draw/clip circle of avatar
    ctx.beginPath();
    ctx.arc(175, 341, imageSizeNew/2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    //draw avatar
    ctx.drawImage(avatar, (canvas.width-imageSizeNew)/20, (canvas.height-imageSizeNew)/2, imageSizeNew, imageSizeNew);

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "random.jpg");
    let embed = new Discord.MessageEmbed();
    embed.attachFiles(attachment)
    embed.setImage('attachment://random.jpg');
    msg.delete();
    return message.channel.send({embed: embed})*/
    // return msg.edit(null, {embed: embed})

  }
}