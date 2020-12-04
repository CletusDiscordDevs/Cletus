const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const FileWalker = require('../../Functions/Process/FileWalker');

/**
 * Custom Discord Client
 * @class
 */
class Client extends Discord.Client {

  /**
   * @constructor
   * @param {string} token - Discord client Token 
   * @param {string} prefix  - Discord bot prefix
   */

  constructor (token, prefix) {
    super(require('../../../config.json').options);
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.music = new (require('./Music/index').MusicManager)();
    this.config = require('../../../config.json');
    this.util = require('../../Functions/Client/index.js');
    this.logger = require('../Process/Logger');
    this.options = this.config.options;
    // display as mobile presence
    // require(`${process.cwd()}/node_modules/discord.js/src/util/Constants.js`).DefaultOptions.ws.properties.$browser = `Discord iOS`;
    this.load(token, prefix);
  }

  /** 
   * Things to create when instance has been created
   * @async
   * @function
   * @param {string} token - Discord client token
   * @param {string} prefix - Discord bot prefix
   */
  async load (token, prefix) {
    this.logger.info('Client', 'Preparing to login');
    this.config.prefix = prefix;

    let developers = await Promise.all(this.config.developers.map(async function (ID) {
      let res = await fetch(`https://discord.com/api/v7/users/${ID}`, {
        headers: {
          Authorization: `Bot ${token}`
        }
      });
      let body = await res.json();
      return `${body.username}#${body.discriminator}`;
    }));
    this.loadEvts();
    this.loadCmds();
    await this.login(token);
    this.logger.info('Client', 'Successfully logged in');
    this.logger.debug('Client', `Developed by ${developers}`);
  }

  /**
   * load commands
   * @function
   */
  loadCmds () {
    let cmds = {};
    // eslint-disable-next-line no-return-assign
    fs.readdirSync(`${process.cwd()}/src/Commands`).map((dir) => cmds[dir] = fs.readdirSync(`${process.cwd()}/src/Commands/${dir}`).filter((f) => f.endsWith('.js')));

    return Object.values(cmds).forEach((items, i) => {
      let dir = Object.keys(cmds)[i];
      items.forEach((file) => {
        let combined = this.commands.concat(this.aliases);
        let name = file.replace('.js', '');
        let prop = require(`${process.cwd()}/src/Commands/${dir}/${file}`);
        if (combined.has(name)) throw new Error(`${name} is a multiple ${combined.filter((cmd) => cmd.name === name).map((cmd) => cmd.name).join(', ')}`);
        this.commands.set(name, prop);
        if (!prop.aliases) return;
        prop.aliases.forEach((alias) => {
          if (this.aliases.has(name)) throw new Error(`${name} is a multiple ${this.aliases.filter(cmd => cmd.name === name).map(cmd => cmd.name).join(', ')}`);
          this.aliases.set(alias, prop);
        });
      });
    });
  }

  /**
   * load events
   * @function
   */
  loadEvts () {
    return FileWalker(`${process.cwd()}/src/Events`).forEach((fp) => {
      let eName = path.basename(fp).replace('.js', '');
      let evt = require(fp);
      this.on(eName, evt.bind(null, this));
    });
  }
}

module.exports = Client;