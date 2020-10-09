const Discord = require('discord.js');
const Player = require('./Player');
const YoutubeManager = require('../Youtube/Manager.js');
const SpotifyManager = require('../Spotify/Manager.js');

class MusicManager {
  constructor () {
    this.players = new Discord.Collection();
    this.youtube = new YoutubeManager();
    this.spotify = new SpotifyManager();
  }

  delete (guildID) {
    this.player.delete(guildID);
    return true;
  }

  createPlayer (guildID, voiceChannel) {
    let player = new Player(guildID, voiceChannel);
    this.players.set(guildID, player);
    return player;
  }
}

module.exports = MusicManager;
