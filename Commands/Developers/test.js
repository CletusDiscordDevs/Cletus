const path = require('path');
const Discord = require('discord.js');
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./Assets/Fonts/KOMIKAX.ttf',{ family: "Comic" });

module.exports = {
  name: "test",
  dev: true,
  usage: {
    doc: "test",
    example: "test"
  },
  category: path.basename(__dirname),
  description: "Test command for developers",
  path: __filename,
  run: async (client, message) => {
    
    let args = message.content.slice(client.config.prefix.length).split(/ +/)
            // let x = args.join(' ')
            let x = args[0]
            var ancmnt = args[1];
            var chnlID = args[2];

//             for (x = 0, len = ancmnt.length, text = ""; x < len; x++) {
//                 if (ancmnt.charAt(x) === '_') {
//                     ancmnt = setCharAt(ancmnt, x, ' ');
//                 }
//             }

            if (chnlID === undefined) {
            const embed = new Discord.MessageEmbed()
               embed.setDescription(x);
               embed.setTimestamp();
                message.channel.send({embed: embed})
            }
            else {
                client.channels.cache.get(chnlID).send(ancmnt);
            }
  }
}
//      let msg = await message.channel.send('Generating image...');
//     let background = await loadImage(`./Assets/Images/image.png`);
//     let imageSize = 4096;
//     let imageSizeNew = imageSize/16;
//     let avatar = await loadImage(message.author.displayAvatarURL({ format: "jpg", size: imageSize }));
//     let canvas = createCanvas(1204,677);
//     let ctx = canvas.getContext('2d');
//     let user = message.author.tag;
//     //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
//     //draw background
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//     //choose font size and write text
//     ctx.font = "50px comic"
//     ctx.fillText(user, 570, 264);
//     // ctx.fillText("Hello :)", 570, 264);
//     //draw/clip circle of avatar
//     ctx.beginPath();
//     ctx.arc(175, 341, imageSizeNew/2, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.clip();
//     //draw avatar
//     ctx.drawImage(avatar, (canvas.width-imageSizeNew)/20, (canvas.height-imageSizeNew)/2, imageSizeNew, imageSizeNew);

//     let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "random.jpg");
//     let embed = new Discord.MessageEmbed();
//     embed.attachFiles(attachment)
//     embed.setImage('attachment://random.jpg');
//     msg.delete();
//     return message.channel.send({embed: embed})
//     // return msg.edit(null, {embed: embed})

//   }
// }

// function random(hasArr, arr){
//   let emoji = arr[Math.round(Math.random()*arr.length)];
//   if(hasArr.includes(emoji)) emoji = random(hasArr, arr);
//   return emoji;
// }