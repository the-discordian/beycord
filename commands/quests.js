const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`it looks like you haven't started the game yet. Please type \`${prefix}start\` to begin the game.`);
    if(args[0] && (args[0].toLowerCase() === "claim" || args[0].toLowerCase() === "complete" || args[0].toLowerCase() === "finish")){
        if(!args[1]) return message.reply("please provide the index of the quest you wish to complete.");
        let qindex = (parseInt(args[1])-1);
        if(!stats.quests[qindex]) return message.reply("that quest doesn't exist.");
        let quest = stats.quests[qindex];
        let questc = new (client.quests.get(quest.name))();
        if(quest.completed){
            message.channel.createMessage(`Quest completed! You received ${quest.rewards}!`)
            questc.award(stats, db, qindex);
        }else{
            message.channel.createMessage("Please complete that quest first.")
        }
    }else if(args[0] && args[0].toLowerCase() === "unlock"){
        if(stats.qslots == 5) return message.reply("you already unlocked all quest slots.");
        switch(stats.qslots){
            case 1:
                if(stats.coins < 250) return message.reply("you need <:valtz:665760587845861386>250 to unlock Slot 2.");
                db.collection("users").updateOne({_id: message.author.id}, {$set: {qslots: 2, coins: stats.coins - 250}});
                message.channel.createMessage("You unlocked Slot 2!");
            break;
            case 2:
                if(stats.coins < 500) return message.reply("you need <:valtz:665760587845861386>500 to unlock Slot 3.");
                db.collection("users").updateOne({_id: message.author.id}, {$set: {qslots: 3, coins: stats.coins - 500}});
                message.channel.createMessage("You unlocked Slot 3!");
            break;
            case 3:
                if(stats.gv < 1) return message.reply("you need <:goldenvaltz:863052675321823233>1 to unlock Slot 4.");
                db.collection("users").updateOne({_id: message.author.id}, {$set: {qslots: 4, gv: stats.gv - 1}});
                message.channel.createMessage("You unlocked Slot 4!");
            break;
            case 4:
                if(stats.gv < 1) return message.reply("you need <:goldenvaltz:863052675321823233>1 to unlock Slot 5.");
                db.collection("users").updateOne({_id: message.author.id}, {$set: {qslots: 5, gv: stats.gv - 1}});
                message.channel.createMessage("You unlocked Slot 5!");
            break;
        }
    }else if(args[0] && args[0].toLowerCase() === "remove"){
        if(!args[1]) return message.reply("please provide the slot number of the quest you wish to remove.")
        let qindex = parseInt(args[1])-1;
        let quest = stats.quests[qindex];
        if(!quest) return message.reply("no quest found.");
        stats.quests.splice(qindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {quests: stats.quests}});
        message.channel.createMessage(`Successfully removed ${quest.name}!`)
    }else{
        let embed = new Discord.MessageEmbed()
        .setTitle("Quests")
        .setColor("#a1c639")
        .setDescription(`Type \`${prefix}help quests\` to know how to interact with quests.`)
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        let quests = [];
        for(var i = 0; i < 5; i++){
            if(stats.quests[i]){
                quests[i] = `${stats.quests[i].name} [Completed: ${stats.quests[i].completed.toString().toUpperCase()}]`;
            }else if(stats.qslots <= i){
                quests[i] = "Slot locked";
            }else{
                quests[i] = "Empty";
            }
        }
        embed.addField("Slot 1", quests[0]);
        embed.addField("Slot 2", quests[1]);
        embed.addField("Slot 3", quests[2]);
        embed.addField("Slot 4", quests[3]);
        embed.addField("Slot 5", quests[4]);
        message.channel.createMessage({embed: embed});
    }
}

module.exports.help = {
    name: "quests",
    aliases: ["quest", "q"],
    desc: "Complete quests and earn rewards!",
    usage: "quests - Shows your current acquired quests\nquests claim/complete/finish/ <quest index> - Finish a quest\nquest unlock - Unlock a quest slot.\nquests remove <slot number> - Remove a quest and empty a quest slot.\n\n__**Quest Slots Prices**__\nSlot 2: <:valtz:665760587845861386>250\nSlot 3: <:valtz:665760587845861386>500\nSlot 4: <:goldenvaltz:863052675321823233>1\nSlot 5: <:goldenvaltz:863052675321823233>1"
}