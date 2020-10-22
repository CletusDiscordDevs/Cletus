const Discord = require('discord.js');
const path = require('path');
const util = require('util');

module.exports = {
  name: 'eval',
  dev: true,
  usage: {
    doc: 'eval <code>',
    example: 'eval message.author.id'
  },
  category: path.basename(__dirname),
  description: 'Evaluates code',
  run: async (client, message, args) => {
    if (!client.config.developers.includes(message.author.id)) return;

    try {
      let code = args[0].toLowerCase() === '-a' ? args.slice(1).join(' ') : args.join(' ');
      let decideAwait = args[0].toLowerCase() === '-a' ? `(async () => {\n${code}\n})();` : `${code}`;
      // eslint-disable-next-line no-eval
      let evaluation = util.inspect(await eval(decideAwait));
      let embed = new Discord.MessageEmbed();
      embed.setTitle('Output');
      embed.addField('Input', `\`\`\`js\n${code}\`\`\``);
      embed.addField('Output', `\`\`\`js\n${evaluation}\`\`\``);
      embed.addField('Output Type', `\`\`\`js\n${typeof evaluation}\`\`\``);
      embed.setFooter(`Evaulated by ${message.author.username}`);
      return await message.channel.send({ embed: embed });
    } catch (e) {
      return message.channel.send(`\`\`\`bash\n${e}\`\`\``);
    };
  }
};
