const Queue = require('./Queue');
const yt = require('yt-search');
const ytdl = require('ytdl-core');

class Player {
  constructor (guildID, message) {
    this.voiceChannel = message.member.voice.channel;
    this.textChannel = message.channel;
    this.connection = null;
    this.guildID = guildID;
    this.queue = new Queue();
    this.playing = false;
    this.dispatcher = null;
  }

  async getSongs (str, ...args) {
    if (typeof str !== 'string') throw new Error(`Player#search requires one argument and its a string\nGot: ${typeof str}`);
    if (args.length !== 0) console.log('[Warning] Player#search requires only one argument and its a string');
    let res = await yt(str);
    return res.videos.slice(0, 10);
  }

  async getSong (str, ...args) {
    if (typeof str !== 'string') throw new Error(`Player#playFirstSong requires one argument and its a string\nGot: ${typeof str}`);
    if (args.length !== 0) console.log('[Warning] Player#search requires only one argument and its a string');
    // eslint-disable-next-line no-irregular-whitespace
    if (/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/.test(str)) return await this.getSongByURL(str);
    let res = await yt(str);
    if (res === undefined) this.getSong(str);
    return res.videos[0];
  }

  async getSongByURL (url, ...args) {
    if (typeof str !== 'string') throw new Error(`Player#playFirstSong requires one argument and its a string\nGot: ${typeof str}`);
    if (args) console.log('[Warning] Player#search requires only one argument and its a string');
    return await ytdl.getInfo(url);
  }

  async play () {
    if (this.connection == null) this.connection = await this.voiceChannel.join();
    this.dispatcher = this.connection.play(ytdl(this.queue[0].url));
    this.playing = true;
    this.textChannel.send(`Now playing: ${this.queue[0].title}`);
    this.dispatcher.on('finish', this.finish.bind(this));
    return this.queue[0];
  }

  finish () {
    this.queue.shift();
    if (this.queue.length !== 0) return this.play();
    else this.playing = false;
  }

  end () {
    return this.voiceChannel.connection.end();
  }
}

module.exports = Player;
