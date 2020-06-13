const Player = require('./Player');
const Discord = require('discord.js');

class MusicManager {
  
  constructor(){
    this.players = new Discord.Collection();
  }
  
  delete(guildID){
    this.player.delete(guildID);
    return true
  }
  
  createPlayer(guildID, voiceChannel){
    let player = new Player(guildID, voiceChannel);
    this.players.set(guildID, player);
    return player;
  }
  
}

module.exports = MusicManager;