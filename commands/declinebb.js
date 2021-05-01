const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('DeclineBB')
  .setDescription("Dude what Buddy Bey are you trying to decline 😅 Like we don't even have the Buddy Bey system set up and you're not even authorized to use the command lol. \n[Check out our Discord Server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "declinebb",
  desc: "declinebb",
}

/*const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  if(message.channel.id !== "APPROVAL CHANNEL") return;
  if(!args[0]) return message.reply("please provide the ID of the Buddy Bey that you want to decline.");
  let stats = await db.collection("buddybeys").findOne({_id: args[0]});
  if(!stats) return message.reply("no Buddy Bey found or it might've already been approved or declined.");
  let user = await client.getRESTUser(stats.submitter);
  if(!user) return message.reply("an error occurred while declining this Bey. Please try again.");
  if(!args[1]) return message.reply("please leave a message for the Buddy Bey submitter.");
  let amessage = args.slice(1).join(" ");
  let declined = new Discord.MessageEmbed()
  .setTitle(`😢 Sorry but your Buddy Bey, ${stats.bey.bbname} has been declined`)
  .setDescription(`**Decliner:** ${message.author.username}#${message.author.discriminator}\n**Message from decliner:** ${amessage}\nYou got your Buddy Bey Kit back so that you can retry.`)
  .setColor("#7f7fff")
  .setTimestamp();
  db.collection("users").updateOne({_id: stats.submitter}, {$push: {items: {name: "Buddy Bey Kit", civ: 20000, cigv: 1}}});
  db.collection("buddybeys").remove({_id: stats._id});
  let dmchannel = await user.getDMChannel();
  dmchannel.createMessage({embed: declined});
  message.channel.createMessage(`✅ Successfully declined #${args[0]}!`);
}

module.exports.help = {
  name: "declinebb",
  desc: "Decline a Buddy Bey. AUTHORIZED ACCESS ONLY",
  usage: "declinebb <ID> <message> - Decline a Buddy Bey according to the ID."
}*/