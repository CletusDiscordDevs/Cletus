const Discord = require('discord.js');
const path = require('path');
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

module.exports = {
  name: 'google',
  dev: false,
  usage: {
    doc: 'google <query>',
    example: 'google who is edward snowden'
  },
  category: path.basename(__dirname),
  description: 'check your profile',
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send('Send a query!');
    let res = await Nightmare({ show: false })
      .goto(`https://www.bing.com/search?q=${encodeURIComponent(args.join(' '))}&form=QBLH&sp=-1&pq=d&sc=8-1&qs=n&sk=&cvid=0B47DF570B2A4DCDBC84658BE39A1DCF`)
      .wait('ol#b_results')
      .evaluate(() => document.querySelector('body').innerHTML)
      .end();
    let data = getData(res);

    let embed = new Discord.MessageEmbed();
    embed.setTitle(`Bing Search results for ${args.join(' ')}`);
    embed.setDescription(data.map((d, i) => `**${i + 1}**: [${d.title}](${d.link})${d.desc.length === 0 ? '' : `\n${d.desc}\n`}`));
    // for(let row of data){
    //   embed.addField(`${row.title}\n\n${row.link}`, row.desc);
    // }

    embed.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
    return message.channel.send({ embed });
  }
};

function getData (html) {
  let $ = cheerio.load(html);
  let data = [];
  $('ol#b_results li.b_algo').each((i, e) => {
    data.push({
      title: $(e).find('h2.b_topTitle').text() || $(e).find('h2 a').text(),
      link: $(e).find('h2.b_topTitle a').attr('href') || $(e).find('h2 a').attr('href'),
      desc: $(e).find('div.b_caption p').text()
    });
  });

  return data.filter((d) => ![d.title, d.link, d.desc].includes(undefined)).slice(0, 5);
};
