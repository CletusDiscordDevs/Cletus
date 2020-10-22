const Discord = require('discord.js');
const path = require('path');

module.exports = {
  name: 'store',
  dev: false,
  usage: {
    doc: 'store',
    example: 'store'
  },
  category: path.basename(__dirname),
  description: 'look at the store ',
  run: async (client, message, args) => {
    // fix code

    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setAuthor('Cletus Store', message.guild.iconURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .addField('Properties', '`=store properties `', true)
        .addField('Cars Dealers', '`=store car-dealerships`', true);
      message.channel.send({ embed: embed });
    } else if (args[0] === 'properties') {
      const houseEmbed = new Discord.MessageEmbed()
        .setTitle('House Market')
        .setDescription('This is just a list of the different types of property you can buy\n**Note:** These are real propertie\'s')
        .addField('Studio\'s', '`=store studio-apartments`', true)
        .addField('Apartment\'s', '`=store apartments`', true)
        .addField('Houses', '`=store houses`', true)
      // .addField('Desil')
      // .addField('Truck Dealership', '`=truck-dealer`', true)
      // .addField('Crossover Dealership', '`=crossover-dealer`', true)
      // .addField(`Sport's Car Dealership`, '`=sport-dealer`', true)
      // .addField('Luxury Dealership', '`=luxury-dealer`', true)
        .setTimestamp();

      message.channel.send({ embed: houseEmbed });
    }
    if (args[0] === 'studio-apartments') {
      let studioEmbed = new Discord.MessageEmbed()
        .setTitle('Studio Apartment')
        .setDescription('There are real properties')
        .addField('**For Rent**', 'These properties are **For Rent**\n\n\n')
      // .addField('\u200B', '\u200B')
        .addField('**The Max**', '**Address:** 606 W 57th St, New York, NY10019, Apt: 1623\n**Info:** WaterFront, 44th floor, 1 Bath, Pet Friendly, Maintenance on site, On-Site ATM, Garage, Fitness Center, Kitchen, Living Room, Gaming Room, Smoke Free, Heating, Air Conditing\n**Price:** $2,911\n To buy this propertie use `=buy The-Max`\n\n\n', false)
      // .addField('\u200B', '\u200B')
        .addField('**AVA Hollywood at La Pietra Place**', '**Address:** 6677 W Santa Monica Blvd, Los Angeles, CA 90038\n**Info:** 2 Pet Limit, 1 Bath,  Clubhouse, Lounge, Pool, Fitness Center, Gameroom, Washer/Dryer - In Unit, Air Conditioning, Smoke Free, Car Charging Station\n**Price:** $2,810 | One-Time: Cat/Dog Rent: $70\n To buy this propertie use `=buy Ava-Hollywood` and to get the pet package use `=buy Ava-Hollywood-pet`', false)
        .addField('\u200B', '\u200B')
        .addField('**For Sale**', 'These properties are **For Sale**\n\n\n', false)
        .addField('**Still looking for properties**', '**Address: unknown\n**Info:** unknown\n**Price:** unknown')
        .addField('**Still looking for properties**', '**Address: unknown\n**Info:** unknown\n**Price:** unknown');
      message.channel.send({ embed: studioEmbed });
    } else if (args[0] === 'car-dealerships') {
      const carEmbed = new Discord.MessageEmbed()
        .setTitle('Car Dealerships')
        .setDescription('This is just a list of the car dealerships\n**Note:** These are real car\'s and dealership\'s')
        .addField('Van Dealership', '`=store van-dealer`', true)
        .addField('Sedan Dealership', '`=store sedan-dealer`', true)
        .addField('SUV Dealership', '`=store suv-dealer`', true)
        .addField('Diesel Truck Dealership', '`=store diesel-dealer`')
        .addField('Truck Dealership', '`=store truck-dealer`', true)
        .addField('Crossover Dealership', '`=store crossover-dealer`', true)
        .addField('Sport\'s Car Dealership', '`=store sport-dealer`', true)
        .addField('Luxury Dealership', '`=store luxury-dealer`', true)
        .setTimestamp();

      message.channel.send({ embed: carEmbed });
    } else if (args[0] === 'van-dealer') {
      let embed = new Discord.MessageEmbed()
        .setTitle('Van Dealership')
        .addField('**Toyota Sienna**', '**Price:** $33,200\n**Year:** 2014, ', true)
        .addField('**Mazda Mazada5**', '**Price:** $21,600\n**Year:** 2012', true)
        .addField('**Honda Odyssey**', '**Price:** $36,600\n**Year:** 2015', true)
        .addField('**Dodge Grand Caravan**', '**Price:** $25,400\n**Year:** 2010', true)
        .setTimestamp();
      message.channel.send({ embed: embed });
    } else if (args[0] === 'sedan-dealer') {
      let sedanEmbed = new Discord.MessageEmbed()
        .setTitle('Sedan Dealership')
      // .addField('**Sedan**', 'Below are sedans')
        .addField('**Honda Accord LX**', '**Price:** $18,532\n**Year:** 2018', true)
        .addField('**Nissan Altima 2.5 S**', '**Price:**$19,599\n**Year:** 2020', true)
        .addField('**Ford Fusion Hybrid SE**', '**Price:** $23,275\n**Year:** 2020', true)
        .addField('**Infiniti G35x Base**', '**Price:** $6,995\n**Year:** 2008', true)
        .addField('**Lexus ES 350**', '**Price:** $6,588\n**Year: 2010**', true)
        .setTimestamp();
      message.channel.send({ embed: sedanEmbed });
    } else if (args[0] === 'suv-dealer') {
      let suvEmbed = new Discord.MessageEmbed()
        .setTitle('SUV Dealership')

        .addField('**Ford Explorer**', '**Price:** $16,990\n**Year:** 2014', true)
        .addField('**Kia Niro**', '**Price:** $25,590\n**Year:** 2019', true)
        .addField('**Dodge Durango**', '**Price:** $22,590\n**Year:** 2016', true)
        .addField('**Chevrolet Tahoe**', '**Price:** $32,990\n**Year:** 2017', true)
        .addField('**BMW X5**', '**Price: $62,990** \n**Year: 2019**', true)
        .setTimestamp();
      message.channel.send({ embed: suvEmbed });
    } else if (args[0] === 'truck-dealer') {
      let truckEmbed = new Discord.MessageEmbed()
        .setTitle('Truck Dealership')
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .setTimestamp();
      message.channel.send({ embed: truckEmbed });
    } else if (args[0] === 'diesel-truck-dealer') {
      let dieselEmbed = new Discord.MessageEmbed()
        .setTitle('Diesel Truck Dealership')
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Truck Name**', '**Price:** unknown\n**Year:** unknown', true)
        .setTimestamp();
      message.channel.send({ embed: dieselEmbed });
    } else if (args[0] === 'crossover-dealer') {
      let crossoverEmbed = new Discord.MessageEmbed()
        .setTile('Crossover Dealership')
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .setTimestamp();
      message.channel.send({ embed: crossoverEmbed });
    } else if (args[0] === 'sport-dealer') {
      let sportEmbed = new Discord.MessageEmbed()
        .addField('**Sports\'s**', 'Below are Sports cars')
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .setTimestamp();
      message.channel.send({ embed: sportEmbed });
    } else if (args[0] === 'luxury-dealer') {
      let luxuryEmbed = new Discord.MessageEmbed()
        .addField('**Luxury\'s**', 'Below are Luxury cars')
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .addField('**Car Name**', '**Price:** unknown\n**Year:** unknown', true)
        .setTimestamp();
      message.channel.send({ embed: luxuryEmbed });
    }
  }
};
