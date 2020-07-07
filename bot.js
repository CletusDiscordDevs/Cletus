const fetch = require('node-fetch');
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.music = new (require('./Lib/Music/index').MusicManager)();
client.config = require('./config.json').bot;
client.util = require('./Lib/Util/index');
const constant = require('./node_modules/discord.js/src/util/Constants.js')
constant.DefaultOptions.ws.properties.$browser = `Discord iOS`


client.on('message', (message) => {

  if(message.author.bot) return;  
  if(!message.content.startsWith(client.config.prefix)) return;

  let msgArr = message.content.slice(client.config.prefix.length).split(" ");
  let args = msgArr.slice(1);
  let cmd = msgArr[0].toLowerCase();
  let commandfile = client.commands.concat(client.aliases).get(cmd);

  if(!commandfile) return;
  commandfile.run(client, message, args);

});

function load(token, prefix){

  console.log(`Preparing to login`);
  client.config.prefix = prefix;
  console.log(token)
  client.login(token).then(async () => {

  let developers = await Promise.all(client.config.developers.map(async function(ID){
    let res = await fetch(`https://discord.com/api/v7/users/${ID}`,{
      headers: {
        Authorization: `Bot ${token}`
      }
    });
    let body = await res.json();
    return `${body.username}#${body.discriminator}`;
  }));

  console.log(`Successfully logged in`);
  console.log(`Developed by ${developers.join(" and ")}`);
  require('./Handlers/commands')(client);

  }).catch((e) => {
    console.log(e);
  });

}

module.exports = load;