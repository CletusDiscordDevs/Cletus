const { Discord, MessageAttachment } = require('discord.js');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require("canvas");
const isImage = require('is-image');
module.exports = {
  name: "banner",
  dev: false,
  usage: {
    doc: "ban",
    example: "an"
  },
  category: path.basename(__dirname),
  description: "Ban members",
  run: async (client, message, args) => {
    
    let cmd = args[0]
    let subcmd = args[1]
      
      if(!cmd) return message.channel.send(`To see all possible options please run ${client.config.prefix}help banner`);
      
    if(cmd === "on" || cmd === "true"){
            const guild = await client.Guild.findOne({
                'guildId': message.guild.id
            });
            if (guild.welcome.canvas === "on") return message.channel.send("Welcome banner is `"+guild.welcome.status+"`");
            if (guild.welcome.status === "off") return message.channel.send("Welcome banner is `"+guild.welcome.status+"`"
            + "and needs to be active for the banner to work type`"+ client.config.prefix +"welcome on`");

            guild.welcome.canvas = "on";
            guild.save(function (err){
                if(!err) return message.channel.send("Welcome banner `"+guild.welcome.canvas+"` ");
            });
        }
        else if(cmd === "off" || cmd === "false"){
            const guild = await client.Guild.findOne({
                'guildId': message.guild.id
            });
            if (guild.welcome.canvas === "off") return message.channel.send("Banner is already `"+guild.welcome.status+"`");

            guild.welcome.canvas = "off";
            guild.save(function (err){
                if(!err) return message.channel.send("Welcome banner `"+guild.welcome.canvas+"` :sunglasses:");
            });
        }
        else if(cmd === "cst" || cmd === "custom"){
            let url = subcmd;
            
            if (isImage(url)){
                
                const guild = await client.Guild.findOne({
                    'guildId': message.guild.id
                });
                
                guild.welcome.canvasUrl = url;
                guild.save(function (err){
                    if(!err) return message.channel.send("Image changed` obs: The recommended dimensions are 1000x360 !! `\ n" + "` Type "+ client.config.prefix +" sh banner to see the banner preview` ")
                })
            }
            else if(!isImage(url)){
                return message.channel.send("No valid image was found:` The image must end with a valid image extension (png, jpg and others) `!!")
            }
        }
    else if (cmd === 'sh' || cmd === "show"){
      const guild = client.guild.findOne({
        'guildId': message.guild.id
      });
      if(guild.welcome.canvasUrl === "off" || guild.welcome.canavs.Url === "") return message.channel.send('No images customized....') 
      
      let imagem = guild.welcome.canvasUrl;
      
      const canvas = createCanvas(1999, 360);
      const ctx = canvas.getContext("2d");
      const background = await loadImage(imagem);
        ctx.drawImage(background, 0,0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(65,280,870,65);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeRect(65,280,870,65);
        ctx.stroke();
        ctx.fillStyle = "#e67e22";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(180,216,100);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
      //thinking how to do the text...
        ctx.arc(500,140,120,0,Math.PI * 2, true);
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
      const avatar = await loadImage(message.member.user.avatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 370,20,250,250);
      const attachment = new MessageAttachment(canvas.toBuffer(),"welcome.png");
        return message.channel.send("`Preview of the banner:`", attachment)
    }
  }
}