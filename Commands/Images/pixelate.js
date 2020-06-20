const path = require('path');
const Discord = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./Assets/Fonts/KOMIKAX.ttf',{ family: "Comic" });

module.exports = {
  name: "pixelate",
  dev: false,
  usage: {
    doc: "pixelate",
    example: "pixelate"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  path: __filename,
  run: async (client, message, args) => {
    console.log("here");
    
    let value = args[0] == null ? 25 : args[0].match(/<@.\d+>/) ? args[1] == null ? 25 : args[1] : args[0];

    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    let mention = message.mentions.users.size > 0 ? message.mentions.members.first().user : message.author;
    let image = await loadImage(mention.displayAvatarURL({ format: "png", size: 512 }));

    if(!isNaN(value)){
      let sizeToModify = value;
      let sizeToMap = sizeToModify < 5 ? 5 : sizeToModify;
      let size = (sizeToMap - 0) * (0.5 - 0) / (100 - 0) + 0;
      let w = canvas.width * size;
      let h = canvas.height * size;


      ctx.drawImage(image, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'pixelated.png');
      message.channel.send(attachment);
    }
  }
}