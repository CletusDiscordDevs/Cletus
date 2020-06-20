const { Discord, MessageAttachment } = require('discord.js');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require("canvas");
const isImage = require('is-image');
module.exports = {
  name: "banner",
  dev: false,
  usage: {
    doc: "ban",
    example: "an"
  },
  category: path.basename(__dirname),
  description: "Ban members",
  run: async (client, message, args) => {
    

    }
  }
