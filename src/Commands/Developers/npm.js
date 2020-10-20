const Discord = require('discord.js');
const path = require('path');
const fetch = require('node-fetch');

module.exports = {
  name: 'npm',
  dev: true,
  usage: {
    doc: 'npm <package name>',
    example: 'npm winston'
  },
  category: path.basename(__dirname),
  description: 'Displays information on NPMs',
  run: async (client, message, args) => {
    try {
  const jsonRes = await fetch(`https://registry.npmjs.com/${args.join(' ')}`).then(res => res.json())
      if (body.time.unpublished) return message.channel.send('This package no longer exists.');
      let version = body.versions[body['dist-tags'].latest];
      let maintainers = body.maintainers.map(user => user.name);
      let dependencies = version.dependencies ? Object.keys(version.dependencies) : null;
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
        .setTitle(body.name)
        .setURL(`https://www.npmjs.com/package/${args.join(' ')}`)
        .setDescription(body.description || 'No description.')
        .addField('❯ Version', body['dist-tags'].latest, true)
        .addField('❯ License', body.license || 'None', true)
        .addField('❯ Author', body.author ? body.author.name : '???', true)
        .addField('❯ Creation Date', new Date(body.time.created).toDateString(), true)
        .addField('❯ Modification Date', new Date(body.time.modified).toDateString(), true)
        .addField('❯ Main File', version.main || 'index.js', true)
        .addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
        .addField('❯ Maintainers', maintainers.join(', '))
        .setFooter()
        .setTimestamp();
      return message.channel.send(embed);
    } catch (err) {
      if (err.statusCode === 200) return message.channel.send('Could not find any results.');
      return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    };
  }
};
