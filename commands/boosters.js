const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Boosters')
  .setDescription("This command is temporarily turned off due to maintenance. Try again soon? \n[Check out our Discord Server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "boosters",
  desc: "Boosters",
}

/*const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`you haven't started the game yet. Please type \`${prefix}start\` to begin the game.`);
    let exp = "You have no active EXP booster.";
    let valtz = "You have no active Valtz booster.";
    let booster1 = client.expboost.get(message.author.id);
    let booster2 = client.valtzboost.get(message.author.id);
    let now = new Date();
    if(booster1) exp = `x${booster1.amt} (${Math.ceil((booster1.time - (now - booster1.start))/1000/60)} minutes left)`;
    if(booster2) valtz = `x${booster2.amt} (${Math.ceil((booster2.time - (now - booster2.start))/1000/60)} minutes left)`;
    let embed = new Discord.MessageEmbed()
    .setTitle("Active Boosters")
    .setColor("#7f7fff")
    .addField("EXP Booster", exp)
    .addField("Valtz Booster", valtz)
    .setFooter(`Buy more boosters at ${prefix}shop!`)
    .setTimestamp();
    message.channel.createMessage({embed: embed});
}

module.exports.help = {
    name: "boosters",
    aliases: ["booster"],
    desc: "List all active boosters on you.",
    usage: "boosters - List your boosters."
}*/