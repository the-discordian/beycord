const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Information')
  .setDescription('In the early days, Beycord was sponsored by [Stardust.](https://stardust.gg/)')
  .setColor("#7f7fff")
  .addFields(
    { name: 'Author of Beycord', value: 'SunSOG/CorruptX'},
    { name: 'Version of Beycord', value: 'Beycord V2.0'},
    { name: 'Support Server', value: 'You can find the support server [here.](https://discord.gg/8FJKAMDSv9)'}
)
  .setTimestamp()
  .setFooter('Thank you to StarDust for making Beycord possible in the early days.', client.user.avatarURL);
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "botinfo",
  aliases: ["bot"],
  desc: "Information about the bot."
}