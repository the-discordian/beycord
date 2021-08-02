const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("guilds").findOne({_id: message.guild.id});
  if(!stats){
    db.collection("guilds").insertOne({_id: message.guild.id,redirect: "nothing",prefix: ";",bey: "nothing",type: "nothing",answer: "number",disabled: []});
    stats = await db.collection("guilds").findOne({_id: message.guild.id});
  }
  if(!message.member.permission.has("manageGuild")) return message.reply("woah there partner. You didn't met the requirements to use this command. Missing permission: MANAGE_SERVER");
  if(!args[0] && !message.channelMentions[0]) return message.reply("please provide a channel or type \"none\" to remove the current redirect channel if there is one.");
  if(args[0].toLowerCase() === "none"){
    db.collection("guilds").updateOne({_id: message.guild.id}, {$set: {redirect: "nothing"}});
    message.reply("redirect channel removed!");
    return;
  }
  let restchannel = await message.guild.getRESTChannels();
  let schannel = restchannel.filter(channel => channel.id === (message.channelMentions[0] || args[0]) && channel.type === 0)[0];
  if(!schannel.id) return message.reply("couldn't find a channel mention with your message. If there is one, it seems like I cannot track down it. Please try again.");
  let cid = schannel.id;
  stats.redirect = cid;
  db.collection("guilds").updateOne({_id: message.guild.id}, {$set: {redirect: cid}});
  let nembed = new Discord.MessageEmbed()
  .setTitle("Redirect channel has been successfully set!")
  .addField("Redirect channel", `<#${cid}>`)
  .setColor("#98FB98")
  .setTimestamp();
  message.channel.createMessage({embed:nembed});
  console.log(cid);
}

module.exports.help = {
  name: "redirect",
  aliases: ["setredirect", "set-redirect", "sr", "redirectchannel"]
}
