const Discord = require('discord.js');
const path = require('path')

module.exports = {
  name: 'reload',
  category: path.basename(__dirname),
  description: 'Reloads Commands provided.',
  dev: true,
  run: async (client, message, args) => {
    if (!client.config.developers.includes(message.author.id)) return;
    if (args.length === 1) load(client, message, args[0].toLowerCase());
    else load(client, message);
  }
};

function load (client, message, command) {
  if (command) {
    if (!Array.from(client.commands).concat(client.aliases).flat().find(c => c.name === command.toLowerCase())) return message.channel.send('That is not a valid command!');
    const commandPath = client.commands.get(command.toLowerCase()).path;
    delete require.cache[require.resolve(commandPath)];
    client.commands.delete(command);
    client.commands.set(command, require(commandPath));
    if (client.aliases.has(command)) {
      let aliases = client.aliases.filter((prop) => prop.name === command.toLowerCase());
      aliases.array().forEach((prop, i) => {
        client.commands.delete(prop.name);
        client.commands.set(prop.aliases[i], prop);
      });
    }
    return message.channel.send(`Reloaded ${command}!`);
  } else {
    Array.from(client.commands).forEach((command) => {
      delete require.cache[require.resolve(command.path)];
      client.commands.delete(command.name);
      client.commands.set(command.name, require(command.path));
      if (!command.aliases) return;
      Array.from(command.aliases).forEach((prop, i) => {
        client.aliases.delete(prop.name);
        client.commands.set(prop.aliases[i], prop);
      });
    });
    return message.channel.send('Reloaded all of the commands!');
  };
};
