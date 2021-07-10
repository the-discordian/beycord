const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
    let info = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, coins: 1, wins:1, xp: 1, level: 1})
    let startembed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .addFields(
      { name: 'Blader Level', value: `${info.levels}`},
      { name: 'EXPs', value: `${info.xp}`},
      { name: 'Balance', value: `<:valtz:863052675968925716> ${info.coins}`},
      { name: 'Wins', value: `${info.wins}`},
      { name: 'Bey Count', value: 'No bey count'},
      { name: 'Equipped bey', value: 'No bey equipped'},
      { name: 'League', value: 'No leagues added'}
  )
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "profile",
}