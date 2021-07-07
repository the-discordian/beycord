const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Help')
  .setDescription (`[Command List](https://beycord.gitbook.io/beycord/how-to-use-the-bot/command-list)\n[Support Server](https://discord.com/invite/42vkvZMv7d)\n[Trello](https://trello.com/invite/b/HAsUZM0K/389f801c6203b6c79bdc284140feffe7/beycord-management)\n[Donate](https://www.patreon.com/CorruptX)`)
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "help"
}