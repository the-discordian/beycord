const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Invite Beycord')
  .setDescription (`Click the button below to invite Beycord to your server! Also, if someone uses a refferal ID while starting, they get extra Valtz! Pog!`)
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
  name: "invite"
}