const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Known Bugs')
  .setDescription('Below is a list of all the known bugs as of **May 1, 2021.** ```\nBeys do not have a valid ID/No ID/Undefined \nMultiple commands are turned off/disabled due to multiple issues in the code.```')
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "knownbugs"
}