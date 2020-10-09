const path = require('path');
const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'grayscale',
  dev: false,
  usage: {
    doc: 'greyscale',
    example: 'greyscale'
  },
  category: path.basename(__dirname),
  description: 'greyscale',
  path: __filename,
  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.author;
    let msg = await message.channel.send('Generating image...');
    let avatar = await loadImage(user.displayAvatarURL({ format: 'jpg', size: 4096 }));
    let canvas = createCanvas(avatar.height, avatar.width);
    let ctx = canvas.getContext('2d');

    ctx.drawImage(avatar, 0, 0);
    let id = ctx.getImageData(0, 0, avatar.height, avatar.width);
    ctx.clearRect(0, 0, avatar.height, avatar.width);
    let data = id.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let y = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i] = y;
      data[i + 1] = y;
      data[i + 2] = y;
    }
    ctx.putImageData(id, 0, 0);

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'random.jpg');
    let embed = new Discord.MessageEmbed();
    embed.attachFiles(attachment);
    embed.setImage('attachment://random.jpg');
    msg.delete();
    return message.channel.send(embed);
    // return msg.edit(null, {embed: embed})
  }
};
