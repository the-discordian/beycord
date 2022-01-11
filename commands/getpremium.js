const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, coins: 1})
  if(!stats) return message.reply(`you haven't started the game yet. Type \`${prefix}start\` to begin.`);
  if(stats.gv < 5){
    message.reply("You don't have enough Golden Valtz. You need 5 Golden Valtz to activate Premium. You can get Golden Valtz here -> https://www.patreon.com/join/beikard")
  } else {
    if(stats.premium === true) return message.reply('You already have premium. Thank you for donating!')
    db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: {premium: true, coins: stats.coins + 2000, gv: stats.gv - 5}})
    let cons = client.beys.get("Cho-Z Achilles");
    let bey = new cons(message.author.id);
    db.collection("users").updateOne({_id: message.author.id}, {$push: {beys: bey}, $set: {xp: 4500}});
    message.reply("✅Successfully bought Beycord Premium! Enjoy your perks :)")
        }
  }

module.exports.help = {
  name: "getpremium",
  aliases: []
}