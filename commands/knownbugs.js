const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Known Bugs')
  .setDescription('Below is a list of all the known bugs as of **July 4, 2021.** ```\n[1]Boosters don\'t actually work \n[2]Current/Info commands do not show a valid ID \n[3]RNG System\n[4]Leagues are not added (profile command)\n[5]Purchase is not working \n[6]SetPrefix is not working \n[7]Use is not working \n[8]Aliases are not set up.```' + "\nKnow a bug not listed? Let us know in our [discord server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "knownbugs"
}