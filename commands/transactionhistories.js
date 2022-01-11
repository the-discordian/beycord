const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, pltayer, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`it seems you haven't started the game yet. Please type \`${prefix}start\` to begin the game.`);
    if(args[0] && args[0].toLowerCase() === "upgrade"){
        if(stats.hslots >= 50) return message.reply(`you've already reached the maximum amount of transaction history slots that can be unlocked.`);
        if(stats.gv < 2) return message.reply("you need 2 Golden Valtz to upgrade your transaction history slots.")
        db.collection("users").updateOne({_id: message.author.id}, {$set: {hslots: stats.hslots + 10, gv: stats.gv - 2}});
        message.channel.createMessage(`Purchase made! You now have ${stats.hslots + 10} transaction history slots.`);
    }else if(args[0] && args[0].toLowerCase() == "clear"){
        db.collection("users").updateOne({_id: message.author.id}, {$set: {histories: []}});
        message.channel.createMessage("Histories cleared!")
    }else{
        let histories = stats.histories.join("\n");
        let embed = new Discord.MessageEmbed()
        .setTitle(`Your transaction histories (${stats.histories.length}/${stats.hslots})`)
        .setDescription(histories || "You have no recorded transaction histories.")
        .setColor("#7f7fff");
        message.channel.createMessage({embed: embed});
    }
}

module.exports.help = {
    name: "transactionhistories",
    aliases: ["transactionhistory", "th"],
    desc: "Check your trade and payment history.",
    usage: "transactionhistories - Show all of your recorded transaction histories.\ntransactionhistories upgrade - Buy 10 more extra transaction history slots. They cost <:premiumvaltz:899373241557209158>2.\ntransactionhistory clear - Clear your histories so new ones can get recorded."
}