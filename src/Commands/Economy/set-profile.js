const path = require('path');

module.exports = {
  name: 'set-profile',
  dev: false,
  usage: {
    doc: 'profile',
    example: 'profile'
  },
  category: path.basename(__dirname),
  description: 'check your profile',
  run: async (client, message, args) => {
    // const startEmbed = new Discord.MessageEmbed();
    // startEmbed.setTitle('Set your profile');
    // startEmbed.setDescripton('I have moved this you your dm\'s to prevent spam.');
    // message.channel.send({ embed: startEmbed });

    // const jobEmbed = new Discord.MessageEmbed()
    //   .setTitle('Pick A Job')
    //   .setDescription('Pick a job')
    //   .addField('Web Developer', 'Hourly: $61-80\nKeyword: `webdev`', true)
    //   .addField('Software Developer', 'Hourly: $81-100\nKeyword: `softdev`', true)
    //   .addField('Mobile Developer', 'Hourly: $41-60\nKeyword: `mobdev`', true)
    //   .addField('Car Dealer', 'Hourly: $20\nKeyword: `cardealer`', true)
    //   .addField('Cashier', 'Hourly: $10\nKeyword:`cashier`', true)
    //   .addField('Lifeguard', 'Hourly: $7\nKeyword:`lifeguard`', true);
    //   // jobEmbed.addField('', 'Hourly: $ \nKeyword:``', true)
    // message.author.send({ embed: jobEmbed });

    // let bankEmbed = new Discord.MessageEmbed()
    //   .setAuthor(`${message.author.tag} Profile`)
    //   .setTimestamp();
    // return message.channel.send({ embed: profileEmbed});
  }
};
