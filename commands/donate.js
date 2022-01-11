const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Interested in keeping Beycord Alive?\nAlready have premium but still want to donate?\nGreat!')
  .setDescription (`You can click [HERE](https://www.patreon.com/beikard) or the button below to donate. All the money donated will be used to support Beycord and future development products. Your donations are highly appreciated.`)
  .setColor("#7f7fff")
  .setFooter("Please donate if possible :)")
  .setTimestamp();
  message.channel.createMessage({
    embed:startembed,
    components: [{
      "type": 1,
      components: [{
        "type": 2,
        "label": "Donate",
        "style": 5,
        "url": "https://www.patreon.com/beikard"
      }]
    }]
  });
}

module.exports.help = {
  name: "donate",
  aliases: ["patreon"]
}