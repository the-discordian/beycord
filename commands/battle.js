const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {

    let stats = await db.collection("users").findOne({ _id: message.author.id });
    if(stats.states.inBattle == true) return message.reply(`You are already in a battle. Please end that one before doing another one. If you are stuck in a prompt, do \`${prefix}resetstates\`.`);
    if(!stats) return message.reply(`You haven't started the game. Type \`${prefix}start\` to begin.`);
    let challenged;
    if(message.mentions[0]) challenged = await message.guild.getRESTMember(message.mentions[0].id);
    else if(args[0]) challenged = await message.guild.getRESTMember(args[0]);
    if(!challenged) return message.reply("Unknown user. Please try again.");
    //if(challenged.id === "827343111234519040") return message.reply("Beycord's AI is currently training, try again at a later date.")
    let bsai = require("./battlesystemv3.js");
    if(challenged.id === "827343111234519040") return bsai.run(client, message, args, db, prefix, message.author, challenged.user, msg);
    if(challenged.bot) return message.reply("Why are you trying to battle a bot?");
    if(challenged.id === message.author.id) return message.channel.createMessage("Why are you trying to battle yourself?");
    let stats2 = await db.collection("users").findOne({ _id: challenged.user.id });
    if(!stats2 && challenged.user.id !== client.user.id) return message.reply("The challenged user has not started the game yet.");
    if(stats2.settings.breqs === false) return message.reply("That player has blocked battle requests from others.");
    if((stats.beys[stats.main].broken && stats.beys[stats.main].broken === true) || (stats2.beys[stats2.main].broken && stats2.beys[stats2.main].broken === true)) return message.channel.createMessage("One of the players needs to equip a non-broken Bey before trying to battle because you can't even launch it without it dropping off the launcher like every time.");
    //if(stats.beys[stats.main].name == "Buddy Bey" || stats2.beys[stats2.main].name == "Buddy Bey") return message.channel.createMessage("Buddy Beys are currently disabled for battles.");
    let emoji1 = null;
    let emoji2 = null;
    let row = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setCustomId('accept')
      .setLabel('Accept')
      .setStyle('SUCCESS'),
      new Discord.MessageButton()
      .setCustomId('decline')
      .setLabel('Decline')
      .setStyle('DANGER')
    )
    let disabledrow = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setCustomId('acceptnull')
      .setLabel('Accept')
      .setStyle('SUCCESS')
      .setDisabled(true),
      new Discord.MessageButton()
      .setCustomId('declinenull')
      .setLabel('Decline')
      .setStyle('DANGER')
      .setDisabled(true)
    )
    setTimeout(function(){
        if(emoji1 === null || emoji2 === null){
            let timeout = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
            .setFooter(`${challenged.user.username}#${challenged.user.discriminator}`, challenged.user.avatarURL)
            .setColor("#FF0000");
            req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, the prompt timed out.`, embed:timeout, components: [disabledrow]})
        }
    }, 60000);
    let request = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator} Waiting...`, message.author.avatarURL)
    .setFooter(`${challenged.user.username}#${challenged.user.discriminator} Waiting...`, challenged.user.avatarURL)
    .setColor("#ffcf00");
    let req = await message.channel.createMessage({content:`<@${challenged.id}>, <@${message.author.id}>, please approve the battle request below.`,embed:request, components: [row]})
    client.on('interactionCreate', interaction => {
        if((interaction.member.id != message.author.id && interaction.member.id != challenged.id) && (interaction.data.custom_id === 'accept' || interaction.data.custom_id === 'decline')) return;
        if(((interaction.member.id === message.author.id) && emoji1 === "✅") || ((interaction.member.id === challenged.id) && emoji2 === "✅")) return;
        if(interaction.data.custom_id === 'decline'){
            emoji1 = "❌"
            emoji2 = "❌"
            let decline = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator} ❌`, message.author.avatarURL)
            .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ❌`, challenged.user.avatarURL)
            .setColor("#FF0000");
            req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, the battle was cancelled.`, embed: decline, components: [disabledrow]})
        } else if(interaction.data.custom_id === 'accept' && interaction.member.id === message.author.id && emoji1 === null){
            emoji1 = '✅'
            let request1 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator} ✅`, message.author.avatarURL)
            .setColor("#ffcf00")
            .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ${emoji2 || "Waiting..."}`, challenged.user.avatarURL)
            req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, please approve the battle request below.`, embed: request1, components: [row]});
            if(emoji1 != null && emoji2 != null) {
              let battlereq = new Discord.MessageEmbed()
              .setAuthor(`${message.author.username}#${message.author.discriminator} ✅`, message.author.avatarURL)
              .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ✅`, challenged.user.avatarURL)
              req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, the battle started.`, embed: battlereq, components: [disabledrow]})
              if(emoji1 != null && emoji2 != null){
                let bs = require("./battlesystemv3.js");
                client.createMessage(message.channel.id, "Waiting for battle...").then(msg => {
                    if(stats2.states.inBattle == true) return message.channel.createMessage(`<@${challenged.user.id}>, you are already in a battle. Please end that one before doing another one.`)
                    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.inBattle": true}});
                    db.collection("users").updateOne({_id: challenged.user.id}, {$set: {"states.inBattle": true}});
                    bs.run(client, message, args, db, prefix, message.author, challenged.user, msg);
                    if(challenged.user.id !== "827343111234519040"){
                        db.collection("users").updateOne({_id: message.author.id}, {$set: {xp: stats.xp + 5}});
                        db.collection("users").updateOne({_id: challenged.user.id}, {$set: {xp: stats2.xp + 5}})
                    }
                });
              }
            }
        } else if(interaction.data.custom_id === 'accept' && interaction.member.id === challenged.id && emoji2 === null){
            emoji2 = '✅'
            let request2 = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}#${message.author.discriminator} ${emoji1 || "Waiting..."}`, message.author.avatarURL)
            .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ✅`, challenged.user.avatarURL)
            .setColor("#ffcf00")
            req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, please approve the battle request below.`, embed: request2, components: [row]})
            if(emoji1 != null && emoji2 != null) {
              let battlereq = new Discord.MessageEmbed()
              .setAuthor(`${message.author.username}#${message.author.discriminator} ✅`, message.author.avatarURL)
              .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ✅`, challenged.user.avatarURL)
              req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, the battle started.`, embed: battlereq, components: [disabledrow]})
              if(emoji1 === "✅" && emoji2 === "✅"){
                let bs = require("./battlesystemv3.js");
                client.createMessage(message.channel.id, "Waiting for battle...").then(msg => {
                    if(stats2.states.inBattle == true) return message.channel.createMessage(`<@${challenged.user.id}>, you are already in a battle. Please end that one before doing another one.`)
                    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.inBattle": true}});
                    db.collection("users").updateOne({_id: challenged.user.id}, {$set: {"states.inBattle": true}});
                    bs.run(client, message, args, db, prefix, message.author, challenged.user, msg);
                    if(challenged.user.id !== "827343111234519040"){
                        db.collection("users").updateOne({_id: message.author.id}, {$set: {xp: stats.xp + 5}});
                        db.collection("users").updateOne({_id: challenged.user.id}, {$set: {xp: stats2.xp + 5}})
                    }
                  
                });
            }
          }
        }
        //client.requestHandler.request("POST", "/interactions/" + interaction.id + "/" + interaction.token + "/callback", false, {type: 6});
    })
}

module.exports.help = {
    name: "battle",
    aliases: ["duel", "b"]
  };