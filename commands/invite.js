const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Want to invite Beycord? Awesome!')
  .setDescription (`All you have to do is to click [here](https://discord.com/api/oauth2/authorize?client_id=827343111234519040&permissions=0&scope=bot) or the button below and done. Fast and easy.`)
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({
    embed:startembed,
    components: [{
      "type": 1,
      components: [{
        "type": 2,
        "label": "Invite",
        "style": 5,
        "url": "https://discord.com/api/oauth2/authorize?client_id=827343111234519040&permissions=0&scope=bot"
      }]
    }]
  });
}

module.exports.help = {
  name: "invite",
  aliases: []
}