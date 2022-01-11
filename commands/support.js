const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Got questions or problem setting up Beycord?')
  .setDescription (`All you have to do is join this server by clicking [here](https://discord.gg/8FJKAMDSv9) or the button below and ask people there. You can also compose an email to support@beycord.com`)
  .setTimestamp();
  message.channel.createMessage({
    embed:startembed,
    components: [{
      "type": 1,
      components: [{
        "type": 2,
        "label": "Support Server",
        "style": 5,
        "url": "https://discord.gg/8FJKAMDSv9"
      }]
    }]
  });
}

module.exports.help = {
  name: "support",
  aliases: []
}