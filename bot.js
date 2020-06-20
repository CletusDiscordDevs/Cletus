const fetch = require('node-fetch');
const Discord = require("discord.js");
const db = require('quick.db');
const promisify = require('util');
const ms = require('ms')
const Canvacord = require('canvacord');
const client = new Discord.Client();
//Defining globaly\\
client.aliases = new Discord.Collection();
client.afk = new Map();
client.canvas = new Canvacord();

client.commands = new Discord.Collection();
client.config = require('./config.json');
client.db = require('quick.db')
client.music = new (require('./Lib/Music/index').MusicManager)();
client.talkedRecently = new Set();
client.sleep = ms => new Promise(res => setTimeout(res, ms));
client.util = require('./Lib/Util/index');
const constant = require('./node_modules/discord.js/src/util/Constants.js')
constant.DefaultOptions.ws.properties.$browser = `Discord iOS`

// client.on('message', (message) => {

//   if(message.author.bot) return;  
//   if(!message.content.startsWith(client.config.prefix)) return;

//   let msgArr = message.content.slice(client.config.prefix.length).split(" ");
//   let args = msgArr.slice(1);
//   let cmd = msgArr[0].toLowerCase();
//   let commandfile = client.commands.concat(client.aliases).get(cmd);

//   if(!commandfile) return;
//   commandfile.run(client, message, args);

// });
// load();

function load(token, prefix){

  console.log(`Preparing to login`);
  client.config.prefix = prefix;
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
  require('./Handlers/Events')(client);
  }).catch((e) => {
    console.log(e);
  });

}

module.exports = load;