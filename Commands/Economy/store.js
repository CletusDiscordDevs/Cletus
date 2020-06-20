const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db')
const ms = require('ms')
module.exports = {
  name: "store",
  dev: false,
  usage: {
    doc: "store",
    example: "store"
  },
  category: path.basename(__dirname),
  description: "look at the store ",
  run: async (client, message, args) => { 
    
     
  }
}
