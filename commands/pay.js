const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  if(stats === null) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to start.`);
  if(!args[0]) return message.reply("please provide a user to pay and amount.");
  let user;
  if(message.mentions[0]) user = await message.guild.getRESTMember(message.mentions[0].id);
  else user = await message.guild.getRESTMember(args[0]);
  if(!user) return message.reply("no user found.");
  if(user.id === message.author.id) return message.channel.createMessage("You paid yourself all the Valtz that you have. You are now officially broke while yourself is now officially rich thanks to you.");
  let stats2 = await db.collection("users").findOne({_id: user.user.id});
  if(stats2 === null) return message.reply("the user has not started the game yet.");
  if(!args[1]) return message.reply("please provide an amount to give to.");
  let amount = parseInt(args[1]);
  if(stats.coins < amount) return message.reply("you don't have that many Valtz.");
  if(amount == NaN || amount == Infinity || amount == "NaN" || amount == "Infinity" || typeof amount != "number" || typeof amount == "string" || !amount) return message.reply("please try again with an actual number.")
  if(amount < 1) return message.reply("the minimum amount your must at least pay is 1 Valtz.");
  if(stats.histories.length < stats.hslots){
    stats.histories.push(`-${amount} (Payment to ${user.id})`);
  }
  if(stats2.histories.length < stats2.hslots){
    stats2.histories.push(`+${amount} (Payment from ${message.author.id})`);
  }
  db.collection("users").updateOne({_id: user.id}, {$set: {coins: stats2.coins + amount, histories: stats2.histories}});
  db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: stats.coins - amount, histories: stats.histories, xp: stats.xp + 5}});
  message.channel.createMessage(`✅ <:valtz:834572655616196658>${amount} successfully paid to ${user.effectiveName}.`);
  let webhookembed2 = new Discord.MessageEmbed()
  .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) paid <:valtz:834572655616196658>${amount} to ${user.username}#${user.discriminator} (${user.id})!`)
  .setTimestamp()
  .setColor("#7f7fff");
  client.executeWebhook("ID", "TOKEN", {embeds: [webhookembed2]}).catch(err => {console.error(err)});
}

module.exports.help = {
  name: "pay",
  aliases: ["transfer"],
  desc: "Pay someone with Valtz.",
  usage: "pay <mention> <amount>"
}
