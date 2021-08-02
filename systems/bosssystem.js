const Discord = require("discord.js");
const ReactionHandler = require("eris-reactions");

async function start(client, message, prefix, player, db, boss){
    let waitembed = new Discord.MessageEmbed()
    .setTitle("***A boss appears!***")
    .setDescription("Players have 1 minute to join.")
    .setAuthor("Boss Battle", client.user.avatarURL)
    .setImage(boss.image);
    message.channel.createMessage({embed:waitembed});
    let joins = await message.channel.awaitMessages(m => m.content.toLowerCase() === boss.keyword && !boss.players.includes(m.author.id), {time: 60000});
    if(joins.length <= 0) return message.channel.createMessage(`${boss.name} ran away because no one joined.`);
    boss.users = new Discord.Collection();
    joins.forEach(async join => {
        let stats = await db.collection("users").findOne({_id: join.author.id});
        if(!boss.players.includes(join.author.id) && stats.states.inBattle !== true){
        boss.players.push(join.author.id);
        boss.users.set(join.author.id, join.author);
        boss.hp = boss.hp + 150;
        join.author.hp = 300;
        join.author.atk = 21;
        join.author.stamina = 3;
        join.author.sp = 3;
        join.author.sd = stats.beys[stats.main].sd || "Right";
        if(stats.beys[stats.main].name === "Guardian Kerbeus Red Ver. <:haoyunshu:669481031400816650>") stats.beys[stats.main].name = "Guardian Kerbeus Red Ver. HYS";
        join.author.bey = new (client.beys.get(stats.beys[stats.main].name))(join.author.id, stats.beys[stats.main].id,stats.beys[stats.main]);
        join.author.lvl = stats.beys[stats.main].level;
        join.author.hp = join.author.hp + (stats.beys[stats.main].level-1) * 5;
        join.author.stamina = join.author.stamina + (stats.beys[stats.main].level-1) * 0.051;
        if(join.author.stamina > 10) join.author.stamina = 10;
        if(join.author.bey.type === "Stamina") join.author.stamina = join.author.stamina + 2;
        if(join.author.bey.type === "Balance") join.author.stamina = join.author.stamina + 1;
        if(join.author.bey.sd === "Right") join.author.atk = join.author.atk + 2;
        if(join.author.bey.sd === "Left") join.author.stamina = join.author.stamina + 1;
        join.author.maxstamina = join.author.stamina;
        join.author.maxhp = join.author.hp;
        join.author.wins = stats.wins;
        join.author.xp = stats.xp;
        join.author.valtz = stats.valtz;
        join.author.stats = stats;
        join.author.passiveAllowed = true;
        join.author.bleed = {status: false, dmg: 0, turn: 0};
        join.author.effectAllowed = true;
        join.author.atk = Math.round(join.author.atk + ((stats.beys[stats.main].level-1) * 0.4));
        join.author.moveChosen = false;
        join.author.dead = false;
        db.collection("users").updateOne({_id: join.author.id}, {$set: {"states.inBattle": true}});
        join.author.stats.states.inBattle = true;
        }
    });
    let dbossembed = new Discord.MessageEmbed()
    .setTitle(`***${boss.name}***`)
    .setThumbnail(boss.image2)
    .setDescription(`Type \`${prefix}battleinstructions\` to know how to fight the boss.\n\n**HP:** ${boss.hp}\n**Stamina:** ${boss.stamina}\n**Remaining players:** ${boss.players.length}\n**Timer:** 300 seconds left`)
    .addField("__*Logs*__", `${boss.logs}`)
    .setColor("#eb1465")
    .setAuthor("Boss Battle", client.user.avatarURL)
    .setFooter("Do you hear boss music?", "https://i.redd.it/l7u85m34qrw41.png")
    .setTimestamp();
    let msg = await message.channel.createMessage({embed: dbossembed});
    msg.addReaction("🗡️");
    msg.addReaction("🛡️");
    msg.addReaction("🔄");
    msg.addReaction("✨");
    msg.addReaction("❌");
    let resetembed = setInterval(() => {
        let now = new Date();
        let diff = ((300-((now - boss.startTime)/1000))+660).toFixed(1);
        let bossembed = new Discord.MessageEmbed()
        .setTitle(`***${boss.name}***`)
        .setThumbnail(boss.image2)
        .setDescription(`Type \`${prefix}battleinstructions\` to know how to fight the boss.\n\n**HP:** ${boss.hp}\n**Stamina:** ${boss.stamina}\n**Remaining players:** ${boss.players.length}\n**Timer:** ${diff} seconds left`)
        .addField("__*Logs*__", `${boss.logs}`)
        .setColor("#eb1465")
        .setAuthor("Boss Battle", client.user.avatarURL)
        .setFooter("Do you hear boss music?", "https://i.redd.it/l7u85m34qrw41.png")
        .setTimestamp();
        msg.edit({embed: bossembed});
    }, 5000);
    let decreasestamina = setInterval(() => {
        let users = client.users.filter(user1 => boss.players.some(bplayer => bplayer === user1.id));
        users.forEach(user2 => {
            user2.stamina = user2.stamina - 1;
        });
        boss.stamina = boss.stamina - 1;
    }, 3000);
    let sendstats = setInterval(() => {
        let users = client.users.filter(user1 => boss.players.some(bplayer => bplayer === user1.id));
        users.forEach(async user2 => {
            let statsembed = new Discord.MessageEmbed()
            .setTitle("Your boss battle stats")
            .setColor("#eb1465")
            .setDescription(`**HP:** ${user2.hp}\n**Stamina:** ${user2.stamina.toFixed(1)}\n**Energy:** ${user2.sp}`)
            .setFooter("I'm here once again asking do you hear boss music?", "https://i.redd.it/l7u85m34qrw41.png")
            .setTimestamp();
            let dmchannel = await client.getDMChannel(user2.id);
            dmchannel.createMessage({embed:statsembed}).catch(err => console.log(err));
        });
    }, 15000);
    let bossattack = setInterval(() => {
        if(boss.stamina <= 2){
            boss.stamina = boss.stamina + 4;
            boss.addLogs(`${boss.name} spun more! Stamina increased!`);
        }else{
            let users = client.users.filter(user1 => boss.players.some(bplayer => bplayer === user1.id));
            if(boss.atk < 1) boss.atk = 1;
            users.forEach(user2 => {
                user2.hp = user2.hp - boss.atk;
            });
            boss.addLogs(`${boss.name} attacked! ${boss.atk} damage dealt to everyone.`);
        }
    }, 3000);
    let executespecial = setInterval(() => {
        boss.special(client);
    }, 60000);
    let checkdeath = setInterval(async () => {
        let users = client.users.filter(user1 => boss.players.includes(user1.id));
        users.forEach(async user3 => {
            if(user3.hp <= 0 || user3.stamina <= 0) boss.removePlayer(user3.id, client, db);
        });
        if(boss.hp <= 0 || boss.stamina <= 0){
            boss.awardPlayers(db);
            clearInterval(decreasestamina);
            clearInterval(sendstats);
            clearInterval(resetembed);
            clearInterval(bossattack);
            clearInterval(executespecial);
            clearInterval(checkdeath);
            clearTimeout(timer);
            let now = new Date();
            let remaining = ((300-((now - boss.startTime)/1000))+660).toFixed(1);
            let diff = (300 - remaining).toFixed(1);
            let latest = await db.collection("speedruns").findOne({_id: boss.name});
            if(diff < latest.time){
                let participants = "";
                boss.players.forEach(pid => participants += `<@${pid}>\n`)
                let embed = new Discord.MessageEmbed()
                .setTitle("***New speedrun record!***")
                .setColor("#eb1465")
                .setDescription(`Boss: ${boss.name}\nDuration: ${diff} seconds\nSpeedrunners:\n${participants}`)
                .setFooter("Congratulations!")
                .setThumbnail(boss.image2)
                .setTimestamp();
                client.executeWebhook("ID", "TOKEN", {embeds: [embed], embed: embed});
                db.collection("speedruns").updateOne({_id: boss.name}, {$set: {time: diff}});
            }
            return message.channel.createMessage(`${boss.name} is defeated! Surviving players each got ${boss.rewards}`);
        }
        if(boss.players.length <= 0){
            clearInterval(decreasestamina);
            clearInterval(sendstats);
            clearInterval(resetembed);
            clearInterval(bossattack);
            clearInterval(executespecial);
            clearInterval(checkdeath);
            clearTimeout(timer);
            return message.channel.createMessage(`All players got ringed-out. ${boss.name} won!`);
        }
    }, 5555)
    let timer = setTimeout(() => {
        clearInterval(decreasestamina);
        clearInterval(sendstats);
        clearInterval(resetembed);
        clearInterval(bossattack);
        clearInterval(executespecial);
        clearInterval(checkdeath);
        let users = client.users.filter(user1 => boss.players.includes(user1.id));
            users.forEach(async user3 => {
                db.collection("users").updateOne({_id: user3.id}, {$set: {"states.inBattle": false}});
                user3.stats.states.inBattle = false;
            });
        return message.channel.createMessage(`Time ran out. ${boss.name} won!`);
    }, 300000);
    async function awaitMoves(client, message, prefix, player, db, boss){
        let users = client.users.filter(user1 => boss.players.includes(user1.id));
        users.forEach(async user3 => {
            if(user3.hp <= 0 || user3.stamina <= 0){
                boss.removePlayer(user3.id, client, db);
            if(user3.dead === false){
                user3.dead = true;
                let dmchannel = await client.getDMChannel(user3.id);
                dmchannel.createMessage("Oh nice! You got ringed-out... that's kind of sad actually.").catch(err => console.log(err));
            }
        }
        });
        if(boss.hp <= 0 || boss.stamina <= 0){
            boss.awardPlayers(db);
            clearInterval(decreasestamina);
            clearInterval(sendstats);
            clearInterval(resetembed);
            clearInterval(bossattack);
            clearInterval(executespecial);
            clearInterval(checkdeath);
            clearTimeout(timer);
            let now = new Date();
            let remaining = ((300-((now - boss.startTime)/1000))+660).toFixed(1);
            let diff = (300 - remaining).toFixed(1);
            let latest = await db.collection("speedruns").findOne({_id: boss.name});
            if(diff < latest.time){
                let participants = "";
                boss.players.forEach(pid => participants += `<@${pid}>\n`)
                let embed = new Discord.MessageEmbed()
                .setTitle("***New speedrun record!***")
                .setColor("#eb1465")
                .setDescription(`Boss: ${boss.name}\nDuration: ${diff} seconds\nSpeedrunners:\n${participants}`)
                .setFooter("Congratulations!")
                .setThumbnail(boss.image2)
                .setTimestamp();
                client.executeWebhook("ID", "TOKEN", {embeds: [embed], embed: embed});
                db.collection("speedruns").updateOne({_id: boss.name}, {$set: {time: diff}});
            }
            return message.channel.createMessage(`${boss.name} is defeated! Surviving players each got ${boss.rewards}`);
        }
        if(boss.players.length <= 0){
            clearInterval(decreasestamina);
            clearInterval(sendstats);
            clearInterval(resetembed);
            clearInterval(bossattack);
            clearInterval(executespecial);
            clearInterval(checkdeath);
            clearTimeout(timer);
            return message.channel.createMessage(`All players got ringed-out. ${boss.name} won!`);
        }
        let checktime = new Date();
        if((checktime - boss.receiving) > 5000){
        async function fight(acted, boss){
            if(acted.atk < 0) acted.atk = 0;
            boss.hp = boss.hp - acted.atk;
            boss.addLogs(`<@${acted.id}> attacked ${boss.name}! ${acted.atk} damage dealt.`);
        }
        async function defend(acted, boss){
            let ogatk = boss.atk;
            boss.atk = boss.atk - Math.round(boss.atk / 100 * 5);
            acted.hp = acted.hp + Math.round(boss.atk / 100 * 50);
            boss.addLogs(`<@${acted.id}> defended! Damage from ${boss.name} reduced for everyone and health regained.`);
        }
        async function spin(acted, boss){
            acted.stamina = acted.stamina + 2;
            boss.addLogs(`<@${acted.id}> spun more! A bit of stamina regained.`)
        }
        async function special(acted, boss){
            let fakesend = async function(content){return true}
            let biomessage = {
                channel: {
                    send: fakesend,
                    createMessage: fakesend,
                    sendMessage: fakesend
                }
            }
            if(acted.sp >= 5){
                //Still in V1
                try{acted.bey.special(acted, boss, biomessage, player)
                }catch(err){
                  let errorembed = new Discord.MessageEmbed()
                  .setColor("#ff0000")
                  .setTitle(`__***${acted.bey.name}'s special move seems to be broken!***__`)
                  .setDescription("Please report the error below to the [support server](https://discord.gg/ZvQ6F6QSUB).")
                  .addField("Error:", err.stack);
                  message.channel.createMessage({embed:errorembed});
                }
                acted.sp = 0;
                boss.addLogs(`<@${acted.id}> used their special move!`);
            }else{
                acted.sp = acted.sp + 1;
                boss.addLogs(`<@${acted.id}> charged up their energy!`);
            }
        }
        let respond = await ReactionHandler.collectReactions(msg, userid => boss.players.includes(userid), {time: 60000, maxMatches: 1});
        if(respond[0]){
        let userobjectarray = client.users.filter(user123 => respond[0].userID === user123.id);
        let userobject = userobjectarray[0];
        let emoji = respond[0].emoji.name;
        if(!userobject.moveChosen){
        if(emoji === "🗡️") fight(userobject, boss);
        if(emoji === "🛡️") defend(userobject, boss);
        if(emoji === "🔄") spin(userobject, boss);
        if(emoji === "✨") special(userobject, boss);
        if(emoji === "❌"){
            boss.removePlayer(userobject.id, client, db);
            boss.addLogs(`<@${userobject.id}> left the battle!`);
        }
        userobject.moveChosen = true;
        setTimeout(() => {
           userobject.moveChosen = false;
        }, 1000);
    }
}
    }
    awaitMoves(client, message, prefix, player, db, boss);
    }
    awaitMoves(client, message, prefix, player, db, boss);
}

module.exports.run = async (client, message, prefix, player, db, bosss) => {
    let bosses;
    if(bosss) bosses = [bosss];
    else bosses = client.bosses.array();
    let index = Math.floor(Math.random() * bosses.length);
    let bossss = bosses[index];
    let boss = new bossss();
    let alert = new Discord.MessageEmbed()
    .setTitle("<a:alert:724198069226438686>***ALERT!*** A boss is about to spawn in 10 minutes!")
    .setColor("#eb1465")
    .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a3f544f1-f07b-4aa9-b6f9-824148c31a10/daqrpoq-f7ee01ed-ac8e-4c47-86c9-360f670365d2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTNmNTQ0ZjEtZjA3Yi00YWE5LWI2ZjktODI0MTQ4YzMxYTEwXC9kYXFycG9xLWY3ZWUwMWVkLWFjOGUtNGM0Ny04NmM5LTM2MGY2NzAzNjVkMi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.37GhMgHrxdiLQPB8OPtK_04vGDSUum7EM4vxWzmkzYY")
    .setDescription("React to this message with <:notify:758285253965643776> if you wish to get notified 1 minute before the boss battle starts.\n*Get your strongest and most trustworthy Bey ready, bladers!*")
    .setTimestamp();
    let alertembed = await message.channel.createMessage({embed: alert}).catch(err => {
        return;
    });
    alertembed.addReaction("emojiName:758285253965643776")
    let notifs = await ReactionHandler.collectReactions(alertembed, userid => true, {time: 540000});
    notifs.forEach(async reacted => {
        if(reacted.emoji.id && reacted.emoji.id === "758285253965643776" && !boss.notifs.includes(reacted.userID)){
            boss.notifs.push(reacted.userID);
            let dmchannel = await client.getDMChannel(reacted.userID);
            dmchannel.createMessage(`A boss is about to spawn in 1 minute at <#${message.channel.id}>!`).catch(err => console.log(err.stack));
        }
    });
    setTimeout(() => {
        start(client, message, prefix, player, db, boss);
    }, 60000);
}