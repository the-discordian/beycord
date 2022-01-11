const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`it seems like you haven't started the game yet. Please type \`${prefix}start\` to begin.`);
    let starred = stats.beys.filter(bey => bey.starred && bey.starred === true);
    let maxpages = Math.ceil(starred.length / 25) || 1;
    let page = parseInt(args[0]) || 1;
    if(page > maxpages || page < 1) return message.reply("no page found.")
    let stars = "";
    for(var i = (page-1)*25; i < (page-1)*25+25; i++){
        let crnt = starred[i];
        if(crnt){
            if(client.shadowbeys.has(crnt.name)) stars += "<:black:721678218859511829>";
            if(crnt.broken && crnt.broken === true) stars += "<a:alert:724198069226438686>";
            if(crnt.level === 0) stars += "<:level0:722078650190528583>";
            stars += `⭐**[${parseInt(stats.beys.indexOf(crnt))+1}]:** Level ${crnt.level} ${crnt.bbname || crnt.name}\n`;
        }
    }
    let embed = new Discord.MessageEmbed()
    .setTitle("Starred Beys")
    .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
    .setDescription(stars || "You don't have any Bey starred.")
    .setFooter(`PAGE ${page}/${maxpages}`)
    .setColor("#7f7fff")
    .setTimestamp();
    message.channel.createMessage({embed: embed});
}

module.exports.help = {
    name: "stars",
    aliases: ["starredbeys", "sbs"],
    desc: "View all of the starred Beys.",
    usage: "stars - View the first page of starred Beys.\nstars <page number> - View a page of starred Beys."
}
