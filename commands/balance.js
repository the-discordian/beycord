const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let coins = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, coins: 1, stars: 1})
  if(!coins) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  if(coins.coins == NaN || coins.coins == Infinity || coins.coins == "Infinity" || coins.coins == "NaN" || coins.coins == undefined || coins.coins == null || typeof coins.coins !== "number" || typeof coins.coins == "string"){
    db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: 100}});
    message.reply("HoI! WhY iS yOUr bAlANCe BRokEn??! Don't worry I fixed it. :wink:");
    return;
  }
  let user = await db.collection("cny").findOne({_id: message.author.id}) || {given: 0, received: 0, ingots: 0, balance: 0};
  if(args[0] && args[0].toLowerCase() == "claim"){
    if(user.balance <= 0) return message.reply("you don't have any pending Valtz to claim.");
    db.collection("cny").updateOne({_id: message.author.id}, {$set: {balance: 0}});
    db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: coins.coins + user.balance}});
    return message.channel.createMessage(`You claimed <:valtz:863052675968925716> ${user.balance}. Thanks for being part of 2021's LNY event!`);
  }
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTitle("Your balance")
  .setThumbnail("https://cdn.discordapp.com/attachments/496658978638397450/746868144491987014/beycordbag.png")
  .setDescription(`<:valtz:863052675968925716> ${coins.coins}\n⭐ ${coins.stars}`)
  .setColor("#50c878");
  embed.addField("Pending", `<:valtz:863052675968925716> ${user.balance}`)
  client.createMessage(message.channel.id, {embed:embed});
}

module.exports.help = {
  name: "balance",
  aliases: ["bal", "coins", "starpoints"],
  desc: "Shows your currencies.",
  usage: "balance - Shows your balance.\nbalance claim - Claim your pending balance."
}