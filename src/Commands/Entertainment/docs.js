const Discord = require('discord.js')
const path = require('path')
const axios = require('axios')

module.exports = {
  name: 'docs',
  dev: false,
  usage: {
     doc: 'docs <query>',
     example: 'docs MessageEmbed'
  },
  category: path.basename(__dirname),
  description: 'Displays Discord.js documentation',
  run: async (client, message, args) => {
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent( 
      args
      )}`


    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed 

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.channel.send('❌ Could not find that documentation')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}