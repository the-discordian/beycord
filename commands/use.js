const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Disabled command')
  .setDescription('This command is temporarily disabled due to maintenance. Join our [discord server!](https://discord.com/invite/42vkvZMv7d)')
  .setColor("#fa2c2c")
  .setTimestamp()
  message.channel.createMessage({embed:startembed});
}

/*module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  if(!args[0]) return message.reply("please provide the index number of the item you wish to use.");
  let itemi = stats.items[parseInt(args[0])-1];
  if(!itemi) return message.reply("no item found.");
  let itemc = client.items.get(itemi.name);
  if(!itemc) return message.reply("it looks like you got an unknown item. Please report it at the support server.");
  let item = new itemc(itemi);
  let res = await item.use(client, message, args, prefix, player, db, parseInt(args[0])-1);
}*/

module.exports.help = {
  name: "use",
  aliases: ["useitem", "uitem"],
  desc: "Use an item.",
  usage: "use <item index> <parameters required to use (optional, depends on item)> - Use the item."
}