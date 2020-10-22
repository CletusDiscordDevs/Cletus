module.exports = (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(client.config.prefix)) return;

  let msgArr = message.content.slice(client.config.prefix.length).split(' ');
  let args = msgArr.slice(1);
  let cmd = msgArr[0].toLowerCase();
  let commandfile = client.commands.concat(client.aliases).get(cmd);

  if (!commandfile) return;
  commandfile.run(client, message, args);
};
