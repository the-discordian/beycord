const Discord = require("discord.js");
module.exports.run = async (client, message, args, prefix, player, db) => {
  if(message.channel.id !== process.env.approvalChannel) return;
  if(!args[0]) return message.reply("please provide the ID of the Buddy Bey that you want to approve.");
  let stats = await db.collection("buddybeys").findOne({_id: args[0]});
  if(!stats) return message.reply("no Buddy Bey found or it might've already been approved or declined.");
  let user = await client.getRESTUser(stats.submitter);
  if(!user) return message.reply("an error occurred while approving this Bey. Please try again.");
  let statsu = await db.collection("users").findOne({_id: stats.submitter});
  if(!args[1]) return message.reply("please leave a message for the Buddy Bey submitter.");
  let amessage = args.slice(1).join(" ");
  let congratulate = new Discord.MessageEmbed()
  .setTitle(`🎉 Congratulations! Your Buddy Bey, ${stats.bey.bbname}, has been approved!`)
  .setDescription(`**Approver:** ${message.author.username}#${message.author.discriminator}\n**Message from approver:** ${amessage}`)
  .setColor("#7f7fff")
  .setTimestamp();
  stats.bey.bbname = ":tools:" + stats.bey.bbname;
  db.collection("users").updateOne({_id: stats.submitter}, {$push: {beys: stats.bey}, $set: {xp: statsu.xp + 50}});
  db.collection("buddybeys").remove({_id: stats._id});
  let dmchannel = await user.getDMChannel();
  dmchannel.createMessage({embed: congratulate});
  message.channel.createMessage(`✅ Successfully approved #${args[0]}!`);
}
module.exports.help = {
  name: "approvebb",
  desc: "Approve a Buddy Bey. AUTHORIZED ACCESS ONLY",
  aliases: [],
  usage: "approvebb <ID> <message> - Approve a Buddy Bey according to the ID."
}