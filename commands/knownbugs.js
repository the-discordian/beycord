const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Known Bugs')
  .setDescription('Below is a list of all the known bugs as of **Oct 5, 2021.** ```\n[1]Quests and items have no spaces\n[2]getpremium command is bugged\n[3]beypedia command does not show special move\n[4]!!battlesystemv3 in progress!!```' + "\nKnow a bug not listed? Let us know in our [discord server!](https://discord.gg/8FJKAMDSv9)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "knownbugs",
  aliases: ["kb", "bugs"]
}