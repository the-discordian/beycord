const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle(`Beycord's Information`)
  .setDescription(`Beycord's server is sponsored by [Stardust](https://stardust.gg/). Stardust enables game developers to increase their revenue and improve their game's player experience. Developers can tap into the Stardust Platform's revenue sharing secondary marketplace and game explorer through our API and blockchain infrastructure.`)
  .setColor("#7f7fff")
  .addFields(
    { name: 'Owner', value: 'cobrahh#6830'},
    { name: 'Invite', value: `Click [here](https://discord.com/api/oauth2/authorize?client_id=827343111234519040&permissions=0&scope=bot)`},
    { name: 'Support server', value: `Click [here](https://discord.gg/8FJKAMDSv9)`},
    { name: "Created on", value: "Tue Apr 23 2019 14:15:10 GMT+0900 (Japan Standard Time)"}
)
  .setTimestamp()
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "botinfo",
  aliases: ["bot"],
  desc: "Information about the bot."
}