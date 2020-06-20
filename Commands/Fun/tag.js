const Discord = require('discord.js');
const path = require('path');
const db = require('quick.db');

module.exports = {
  name: "tag",
  dev: false,
  usage: {
    doc: "tag",
    example: "tag <name>"
  },
  category: path.basename(__dirname),
  description: "cmd desc",
  run: async (client, message, args) => {
    
    console.log("here");
    let tagsDB = new db.table('tags');
    
    
    const allTags = tagsDB.get('allTags');
    const tagExists = allTags.includes(args[0].toLowerCase());

    
    if(args[0].toLowerCase() == "create"){
      if(!args[1]) return message.channel.send('Please specify name.');
      if(!args[2]) return message.channel.send('Can\'t create empty tag!');

      const tagExists = allTags.includes(args[1].toLowerCase());
      if(tagExists) return message.channel.send(`Tag with name ${args[1]} already exists.`);

      const name = args[1].toLowerCase();
      const content = args[2];

      tagsDB.push('allTags', name);

      const tagObj = {
        content: content,
        owner: message.author.id,
        uses: 0
      };
      tagsDB.set(name, tagObj);
      return message.channel.send(`You created tag **${name}**. To use it write **--tag ${name}**.`);
    }
    
    if(args[0].toLowerCase() == "delete"){
      const tagExists = allTags.includes(args[1].toLowerCase());
      if(tagExists) {//return message.channel.send(`Tag with name ${args[1]} doesn\'t exist.`)
        const tagObj = tagsDB.get(args[1].toLowerCase());
        if(tagObj.owner == message.author.id){
          const embed = new Discord.MessageEmbed().setAuthor(`Are you sure?`, message.guild.iconURL());
          const msg = await message.channel.send(embed);
          const filter = (reaction, user) => {
            return (reaction.emoji.name == "✅" || reaction.emoji.name == "🅾️") && user.id == message.author.id;
          };
          msg.react("✅");
              msg.react("🅾️");
          msg.awaitReactions(filter, {max: 1, time: 10000}).then(reaction =>{
            if(reaction.first().emoji.name == "✅"){
              tagsDB.delete(args[1].toLowerCase());
              let tagIndex = allTags.findIndex(item => item == args[1].toLowerCase());
              allTags.splice(tagIndex, 1);
              tagsDB.set('allTags', allTags);
              return message.channel.send(`Your tag **${args[1]}** was deleted.`);
            }else{
              return message.channel.send(`Canceled.`);
            }
          });
        }else{
          return message.channel.send("You don\'t own this tag!");
        }
      }else{
        return message.channel.send("Tag with this name doen\'t exist.");
      }
    }
    
    if(args[0].toLowerCase() == "list"){
      const tagEmbed = new Discord.MessageEmbed()
        .setAuthor(`Tags`, message.guild.iconURL())
        .setDescription(` \`\`\`\n${allTags.join(" ")} \`\`\` `);
      return message.channel.send(tagEmbed);
    }
    
    
    
    if(tagExists){
      const tagObj = tagsDB.get(args[0].toLowerCase());
      const tagMsg = tagObj.content;
      tagObj.uses++;
      tagsDB.set(args[0].toLowerCase(), tagObj);
      return message.channel.send(tagMsg);
    }else{
      return message.channel.send(`Tag ${args[0]} doesn\'t exists. Create a new tag using **tag create <name> <content>**.`);
    }
    
  }
}
