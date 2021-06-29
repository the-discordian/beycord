const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Known Bugs')
  .setDescription('Below is a list of all the known bugs as of **May 8, 2021.** ```\n[1]Beypedia lists a bey named 1 \n[2]Beys are not dexable \n[3]Boosters don\'t actually work \n[4]Current/Info commands do not show a valid ID \n[5]RNG System \n[6]Help command needs to be updated \n[7]Profile needs to be fixed (leagues will be added) \n[8]Purchase is not working \n[9]Redirect is not working \n[10]SetPrefix is not working \n[11]Use is not working```' + "\nKnow a bug not listed? Let us know in our [discord server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "knownbugs"
}