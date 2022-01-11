const Item = require("./Item.js");

class PerfectBlack extends Item {
    constructor(){
        super("PerfectBlack", Infinity);
    }
    async use(client, message, args, prefix, iindex, db){
        let stats = await db.collection("users").findOne({_id: message.author.id});
        message.channel.createMessage("Please provide the index number of the Perfect Phoenix you wish to paint.");
        let awaitpp = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
        if(awaitpp[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.")
        let ppindex = parseInt(awaitpp[0].content)-1;
        let pp = stats.beys[ppindex];
        if(!pp) return message.reply("no Perfect Phoenix found.")
        if(pp.name !== "Perfect Phoenix") return message.reply("the paint doesn't respond. Please retry with a Perfect Phoenix.");
        let darkchance = Math.round(Math.random() * 100);
        if(darkchance === 1){
            let darkpp = new (client.beys.get("Dark Perfect Phoenix"))(message.author.id);
            darkpp.init(message);
            darkpp.level = pp.level;
            darkpp.xp = pp.xp;
            stats.beys.splice(ppindex, 1);
            stats.beys.push(darkpp);
            stats.items.splice(iindex, 1);
            db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, items: stats.items}});
            message.channel.createMessage("Oh wow, you got a fake product. The paint was not black enough so you got Dark Perfect Phoenix instead. Not bad either, I guess?");
            return;
        }
        let blackpp = new (client.beys.get("Black Perfect Phoenix"))(message.author.id);
        blackpp.init(message);
        blackpp.level = pp.level;
        blackpp.xp = pp.xp;
        stats.beys.splice(ppindex, 1);
        stats.beys.push(blackpp);
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, items: stats.items}});
        message.channel.createMessage("Painted successfully! You got a Black Perfect Phoenix");
    }
}

module.exports = PerfectBlack;