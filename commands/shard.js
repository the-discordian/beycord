const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let embed = new Discord.MessageEmbed()
    .setTitle(`This server is on Shard ${message.guild.shard.id}!`)
    .setColor("#7f7fff");
    message.channel.createMessage({embed:embed});
}

module.exports.help = {
    name: "shard",
    aliases: ["sh"],
    desc: "Displays the ID of the shard that the server belongs to.",
    usage: "shard - Read the description and you'll know what this does."
}