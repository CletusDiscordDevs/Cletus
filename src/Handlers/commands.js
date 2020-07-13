const fs = require('fs');
const path = require('path');
const db = require('quick.db');

module.exports = (client) => {

  let cmds = new Object();
  fs.readdirSync(`./src/Commands`).forEach((dir) => {
    let jsfiles = fs.readdirSync(`./src/Commands/${dir}`).filter((f) => f.endsWith(".js"));
    cmds[dir] = jsfiles;
  })

  Object.values(cmds).forEach((items, i) => {
      let dir = Object.keys(cmds)[i];
      items.forEach((file) => {
          let combined = client.commands.concat(client.aliases)
          let name = file.replace(".js","");
          let prop = require(`../Commands/${dir}/${file}`);
          if(combined.has(name)) throw new Error(`${name} is a multiple ${combined.filter((cmd) => cmd.name == name).map((cmd) => cmd.name).join(', ')}`);
          client.commands.set(name, prop);
          if(!prop.aliases) return;
          prop.aliases.forEach((alias) => {
          if(client.aliases.has(name)) throw new Error(`${name} is a multiple ${client.aliases.filter(cmd => cmd.name == name).map(cmd => cmd.name).join(', ')}`);
              client.aliases.set(alias, prop);
          });
      });
  });

}