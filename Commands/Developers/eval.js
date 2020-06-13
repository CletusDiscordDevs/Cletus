const Discord = require('discord.js');
const path = require('path');
const util = require('util');
const { stripIndents } = require('common-tags');

module.exports = {
  name: "eval",
  dev: true,
  usage: {
    doc: "eval <code>",
    example: "eval message.author.id"
  },
  category: path.basename(__dirname),
  description: "Evaluates code",
  run: async (client, message, args) => {
    
    try{
      let code = args[0].toLowerCase() == "-a" ? args.slice(1).join(" ") :  args.join(' ');
      let decideAwait = args[0].toLowerCase() == "-a" ? stripIndents`(async () => {
      {code}
      })();`:`{code}`;
      decideAwait = decideAwait.replace(`{code}`, code);
      let evaluation = util.inspect(await eval(decideAwait));
      let embed = new Discord.MessageEmbed();
      embed.setTitle(`Output`);
      embed.addField(`Input`, `\`\`\`js\n${code}\`\`\``);
      embed.addField(`Output`, `\`\`\`js\n${evaluation}\`\`\``);
      embed.addField(`Output Type`, `\`\`\`js\n${typeof evaluation}\`\`\``);
      embed.setFooter(`Evaulated by ${message.author.username}`);
      return await message.channel.send({embed: embed});
    }catch(e){
      return message.channel.send(`\`\`\`bash\n${e}\`\`\``)
    }
    
  }
}