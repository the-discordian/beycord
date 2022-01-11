const Item = require("./Item.js");
const Discord = require("discord.js");

class Toolbox extends Item {
    constructor(){
        super("Toolbox", 250);
    }
    async use(client, message, args, prefix, iindex, db){
        let stats = await db.collection("users").findOne({_id: message.author.id});
        if(!args[1]) return message.reply("please provide the index number of the broken Bey you wish to fix.");
        let bindex = parseInt(args[1])-1;
        if(!stats.beys[bindex]) return message.reply("no broken Bey found. Please try again.");
        if(!stats.beys[bindex].broken || stats.beys[bindex].broken === false) return message.reply("that Bey is not broken.");
        stats.beys[bindex].broken = false;
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, items: stats.items}});
        let bey = stats.beys[bindex];
        message.channel.createMessage(`✅Successfully fixed **[${bindex+1}] ${bey.name}**!`);
        return true;
    }
}

module.exports = Toolbox;