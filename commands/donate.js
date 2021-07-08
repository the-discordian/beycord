const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Donate')
  .setDescription (`Donate to keep Beycord alive and running. Your donations are highly appreciated as keeping Beycord running needs quite a lot of money.\nIf you do decide to donate, you get GOLDEN (oooh) Valtz, which you can use to purchase Beycord Premium!`)
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({
    embed:startembed,
    components: [{
      "type": 1,
      components: [{
        "type": 2,
        "label": "Donate",
        "style": 5,
        "url": "https://www.patreon.com/CorruptX"
      }]
    }]
  });
}

module.exports.help = {
  name: "donate"
}