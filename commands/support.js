const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Support')
  .setDescription (`If you need support with Beycord, get super cool news, or want to help, join the support server by clicking the button below!`)
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({
    embed:startembed,
    components: [{
      "type": 1,
      components: [{
        "type": 2,
        "label": "Support Server",
        "style": 5,
        "url": "https://discord.com/invite/42vkvZMv7d"
      }]
    }]
  });
}

module.exports.help = {
  name: "support"
}