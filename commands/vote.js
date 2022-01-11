const Discord = require('discord.js');
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api(process.env.topggApi)

module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id:message.author.id});
    if(!stats) return message.reply(`It seems like you haven't started the game yet. Please type \`${prefix}start\` to begin.`)
    let voted = await topgg.hasVoted(message.author.id);
    let reward;
    if(stats.premium === true){
        reward = 500;
    } else {
        reward = 250;
    }
    const testForNumber = Math.floor(Math.random() * 100);
    if(args[0] && (args[0].toLowerCase() === "claim")){
        if(!voted) return message.reply(`It looks like you haven\'t voted for this 12 hours yet. Please do so at https://top.gg/bot/827343111234519040/vote and do this command again to claim your long-deserved rewards!`);
        const now = new Date();
        if(now-stats.lastVoted<720 *60*100) return message.reply(`You already claimed the vote reward for the last 12 hours.`)
        db.collection("users").updateOne({_id: message.author.id}, {$set: {lastVoted: now}})
        if(testForNumber>=10){
            let startembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`Thanks for voting Beycord, ${message.member.effectiveName}!`)
            .setDescription(`Beycord would not be here without people like you who vote for Beycord every day.\n\nYou received <:valtz:899373217255407646>${reward} and 25 EXPs as a voting reward!`)
            .setColor("#7f7fff")
            .setTimestamp()
            message.channel.createMessage({embed:startembed});
        db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: {coins: stats.coins + reward, streak: stats.streak+1}})
        } else if(testForNumber>=5){
            let startembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`Thanks for voting Beycord, ${message.member.effectiveName}!`)
            .setDescription(`Beycord would not be here without people like you who vote for Beycord every day.\n\nYou received <:valtz:899373217255407646>${reward} and 25 EXPs as a voting reward!\n**Extra Rewards**\n- Giveaway Ticket`)
            .setColor("#7f7fff")
            .setTimestamp()
            message.channel.createMessage({embed:startembed});
            db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: {coins: stats.coins + reward, streak: stats.streak+1}})
            let pockets = stats.items.filter(item => item.name === "Pocket");
            if(pockets[0]){
                let pocketi = stats.items.indexOf(pockets[0]);
                stats.items[pocketi].tickets = stats.items[pocketi].tickets + 1;
                db.collection("users").updateOne({_id: stats._id}, {$set: {items: stats.items}});
            }
        } else if(testForNumber>=2){
            let startembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`Thanks for voting Beycord, ${message.member.effectiveName}!`)
            .setDescription(`Beycord would not be here without people like you who vote for Beycord every day.\n\nYou received <:valtz:899373217255407646>${reward} and 25 EXPs as a voting reward!\n**Extra Rewards**\n- Black Paint`)
            .setColor("#7f7fff")
            .setTimestamp()
            message.channel.createMessage({embed:startembed});
            let itemc = client.items.get("PerfectBlack");
            let iteme = new itemc();
            db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: {coins: stats.coins + reward, streak: stats.streak+1}, $push: {items: iteme}})
        } else if(testForNumber===1){
            let startembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`Thanks for voting Beycord, ${message.member.effectiveName}!`)
            .setDescription(`Beycord would not be here without people like you who vote for Beycord every day.\n\nYou received <:valtz:899373217255407646>${reward} and 25 EXPs as a voting reward!\n**Extra Rewards**\n- Giveaway Ticket\n-Black Paint`)
            .setColor("#7f7fff")
            .setTimestamp()
            message.channel.createMessage({embed:startembed});
            let itemc = client.items.get("PerfectBlack");
            let iteme = new itemc();
            db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: {coins: stats.coins + reward, streak: stats.streak+1}, $push: {items: iteme}})
            let pockets = stats.items.filter(item => item.name === "Pocket");
            if(pockets[0]){
                let pocketi = stats.items.indexOf(pockets[0]);
                stats.items[pocketi].tickets = stats.items[pocketi].tickets + 1;
                db.collection("users").updateOne({_id: stats._id}, {$set: {items: stats.items}});
            }
        }
    } else {
        let weekstreak = stats.streak%7;
        let statistics;
        if(weekstreak === 0){
            if(!voted){
                statistics = "<:startbar:870717057350647881><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:endbar:870717057598124112> [0/7]";
            } else {
                statistics = "<:startbarfilled:870717057723940894><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:endbarfilled:870717057518403594> [7/7]";
            }
        } else if(weekstreak === 1){
            statistics = "<:startbarfilled:870717057723940894><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:endbar:870717057598124112> [1/7]";
        } else if(weekstreak === 2){
            statistics = "<:startbarfilled:870717057723940894><:barfilled:870717057891717201><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:endbar:870717057598124112> [2/7]";
        } else if(weekstreak === 3){
            statistics = "<:startbarfilled:870717057723940894><:barfilled:870717057891717201><:barfilled:870717057891717201><:emptybar:870717057656832010><:emptybar:870717057656832010><:emptybar:870717057656832010><:endbar:870717057598124112> [3/7]";
        } else if(weekstreak === 4){
            statistics = "<:startbarfilled:870717057723940894><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:emptybar:870717057656832010><:emptybar:870717057656832010><:endbar:870717057598124112> [4/7]";
        } else if(weekstreak === 5){
            statistics = "<:startbarfilled:870717057723940894><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:emptybar:870717057656832010><:endbar:870717057598124112> [5/7]";
        } else if(weekstreak === 6){
            statistics = "<:startbarfilled:870717057723940894><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:barfilled:870717057891717201><:endbar:870717057598124112> [6/7]";
        }
        let startembed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor("#000000")
        .setTitle("Voting Statistics")
        .setTimestamp()
        .setDescription(`Vote at [top.gg](https://top.gg/bot/827343111234519040/vote) to support Beycord and get rewards!\nType \`${prefix}vote claim\` within 12 hours of voting to claim your voting rewards.\n\n**Streaks**\nWeekly Streak:\n${statistics}\nTotal Streak: ${stats.streak}`)
        .setFooter("Voting is much appreciated")
        message.channel.createMessage({embed:startembed});
    }
}

module.exports.help = {
  name: "vote",
  aliases: []
}