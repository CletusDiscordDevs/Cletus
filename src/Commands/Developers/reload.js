// const Discord = require('discord.js')
// const path = require('path')

// module.exports = {
//   name: "reload",
//   dev: true,
//   description: 'Reload a command. Developers only!',
//   category: path.basename(__dirname),
//   usage: {
//  doc: 'reload <command>',
//  example: 'reload test'
// }
  
  
//    run: async (client, message, args) {
//     const commandName = args[0];

//     if (!commandName) {
//       let cmdEmbed = new MessageEmbed()
//         .setTitle('Reload Unsuccessful')
//         .setDescription(`Please specify a command for me to reload!`)
//         .setTimestamp(message.createdAt, true)
        

//       message.channel.send(cmdEmbed)
//       return;
//     }

//     const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

//     if (!command) {
//       let cmdNoExistEmbed = new MessageEmbed()
//         .setTitle('Reload Unsuccessful')
//         .setDescription(`There is no command with the name or alias **\`${commandName}\`**!`)
//         .setTimestamp(message.createdAt, true)
        

//       message.channel.send(cmdNoExistEmbed)
//     }

//     delete require.cache[require.resolve(`../../Commands/${command.category}/${command.name}.js`)];

//     try {
//       const newCommand = require(`../../Commands/${command.category}/${command.name}.js`);
//       message.client.commands.set(newCommand.name, newCommand);

//       let cmdReloadedEmbed = new MessageEmbed()
//         .setTitle('Reload Successful')
//         .setDescription(`The command \`${command.name}\` was reloaded!`)
//         .setTimestamp(message.createdAt, true)
        

//       message.channel.send(cmdReloadedEmbed)
//       console.log(`${chalk.yellow('[Command]')} ${command.name} was reloaded by ${message.author.tag}`);
//     } catch (error) {
//       console.error(error);
//       message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
//     }
//   }
// }