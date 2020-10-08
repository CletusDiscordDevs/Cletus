const Discord = require('discord.js');
const path = require('path');
const Nightmare = require("nightmare");
const cheerio = require("cheerio");

module.exports = {
  name: "google",
  dev: false,
  usage: {
    doc: "google <query>",
    example: "google who is edward snowden"
  },
  category: path.basename(__dirname),
  description: "check your profile",
  run: async (client, message, args) => { 

    if(!args[0]) return message.channel.send("Send a query!");
    let res = await Nightmare({ show: false})
    .goto(`https://www.google.com/search?q=${encodeURIComponent(args.join(" "))}&aqs=chrome..69i57.797j0j1&sourceid=chrome&ie=UTF-8`)
    .wait("div#rso")
    .evaluate(() => document.querySelector("body").innerHTML)
    .end();
    let data = getData(res);

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Google Search results for ${args.join(" ")}`);
    embed.setDescription(data.map((d, i) => `**${i+1}**: [${d.title}](${d.link})\n\n${d.desc}\n`).join("\n"))
    // for(let row of data){
    //   embed.addField(`${row.title}\n\n${row.link}`, row.desc);
    // }
    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
    return message.channel.send({embed});
    

  }
}

function getData(html){

  let $ = cheerio.load(html);
  let data = new Array();
  $('div#rso div.g').each((i, e) => {
      let rowData = $(e).find("div.rc");
      data.push({
          title: rowData.find("div.r a h3 span").text(),
          link: rowData.find("div.r a").attr("href"),
          desc: rowData.find("div.s div span.st span").text()
      });
  });

  return data.filter((d) => ![d.title, d.link, d.desc].includes(undefined)).slice(0, 5);
  
}