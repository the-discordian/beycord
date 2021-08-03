const Discord = require("discord.js");
const jimp = require("jimp");
const ReactionHandler = require("eris-reactions");
const fs = require("fs");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  if(!stats) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  let tuser;
  if(message.mentions[0]) tuser = await message.guild.getRESTMember(message.mentions[0].id);
  else if(args[0]) tuser = await message.guild.getRESTMember(args[0]);
  else return message.channel.createMessage(`Please type \`${prefix}help trade\` to know how to use the command properly.`);
  if(!tuser) return message.reply("no player found.");
  if(tuser.id === message.author.id) return message.reply("why are you trying to trade yourself.");
  if(tuser.id === "BOT ID") return message.reply("***No.***");
  let stats2 = await db.collection("users").findOne({_id: tuser.id});
  if(!stats2) return message.reply(`the player haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  if(stats2.settings.treqs === false) return message.reply("that player has turned off their trades.")
  if(!args[1]) message.channel.createMessage(`Please type \`${prefix}help trade\` to know how to use the command properly.`);
  if(!args[2]) message.channel.createMessage(`Please type \`${prefix}help trade\` to know how to use the command properly.`);
  if(stats.states.isTrading === true) return message.reply("you're already inside a trading prompt. Please cancel the previous one before continuing.");
  if(stats2.states.isTrading === true) return message.reply("one of you is already inside a trading prompt. Please cancel the previous one before continuing.");
  let index1 = parseInt(args[1])-1;
  let index2 = parseInt(args[2])-1;
  if(index1 == 0) return message.channel.createMessage("***No.***");
  if(index2 == 0) return message.channel.createMessage("***No.***");
  let bey1 = stats.beys[index1];
  let bey2 = stats2.beys[index2];
  if(!bey1) return message.reply("first Bey not found.");
  if(!bey2) return message.reply("second Bey not found.");
  if(bey1.attached || bey2.attached) return message.channel.createMessage(`Please \`${prefix}detach\` the item on your Bey before attempting to trade it.`);
  let cost = 10;
  cost += 10;
 /* if(client.commonbeys.includes(bey1.name)) cost += 10;
  else if(client.specialbeys.includes(bey1.name)) cost += 25;
  else if(client.rarebeys.includes(bey1.name)) cost += 50;
  else if (client.legendarybeys.includes(bey1.name)) cost += 100
  else if(client.availablebeys.includes(bey1.name)) cost += 500;
  else if(client.shadowbeys.includes(bey1.name)) cost += 1000;
  else cost += 1000;*/
  /*if(client.commonbeys.includes(bey2.name)) cost += 10;
  else if(client.rarebeys.includes(bey2.name)) cost += 25;
  else if(client.legendarybeys.includes(bey2.name)) cost += 50;
  else if(client.availablebeys.includes(bey2.name)) cost += 500;
  else if(client.blackbeys.includes(bey2.name)) cost += 1000;
  else cost += 1000;*/
  let halved = Math.round(cost / 2);
  if(stats.coins < halved || stats2.coins < halved) return message.channel.createMessage(`Insufficient Valtz. Make sure both players have enough Valtz to pay for the trading fees. (<:valtz:863052675968925716>${halved})`)
  let jimps = [];
  let images = ["https://media.discordapp.net/attachments/859836946510643210/869706489013604442/noimage.png?width=3840&height=2160", bey1.image, bey2.image];
  for(var i = 0; i < images.length; i++){
    jimps.push(jimp.read(images[i]));
  }
  Promise.all(jimps).then(data => {
    return Promise.all(jimps);
  }).then(async data => {
    data[1].resize(700,700);
    data[2].resize(700,700);
    data[0].composite(data[1], 100, 240);
    data[0].composite(data[2], 1150, 240);
    data[0].write(`/path/to/tempimages/${message.author.id}-${tuser.id}trade.png`, () => {
      console.log("Image written!")
    });
  });
  //let wait = await client.delay(1500);
  let tradeimage = fs.readFileSync(`/path/to/tempimages/${message.author.id}-${tuser.id}trade.png`);
  let embed = new Discord.MessageEmbed()
  .setDescription(`${message.member.effectiveName} is trading a ***Level ${bey1.level} ${bey1.name}*** for ${tuser.effectiveName}'s ***Level ${bey2.level} ${bey2.name}***.\n\nThe trade will proceed once both players have confirmed the trade by reacting to this message with a ✅. React with ❌ to cancel the trade immediately when it's your turn.\nWaiting for <@${message.author.id}> to react...\n\n**Price:** <:valtz:863052675968925716>${cost} (Will be splitted)`)
  .setColor("#7f7fff")
  .setTimestamp()
  .setImage(`attachment://${message.author.id}-${tuser.id}trade.png`);
  let msg = await message.channel.createMessage({embed: embed}, {file: tradeimage, name: `${message.author.id}-${tuser.id}trade.png`});
  db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isTrading": true}});
  db.collection("users").updateOne({_id: tuser.id}, {$set: {"states.isTrading": true}});
  msg.addReaction("✅");
  msg.addReaction("❌");
  let reactions = await ReactionHandler.collectReactions(
    msg,
    id => id === message.author.id,
    { maxMatches: 1, time: 300000 }
  ).catch(err => {
    message.channel.createMessage("Prompt cancelled due to timing out.");
    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isTrading": false}});
    db.collection("users").updateOne({_id: tuser.id}, {$set: {"states.isTrading": false}});
    return;
  });
  if(reactions[0].emoji.name === "❌"){
    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isTrading": false}});
    db.collection("users").updateOne({_id: tuser.id}, {$set: {"states.isTrading": false}});
    return message.channel.createMessage(`Trade cancelled by ${message.member.effectiveName}.`);
  }
  embed.setDescription(`${message.member.effectiveName} is trading a ***Level ${bey1.level} ${bey1.name}*** for ${tuser.effectiveName}'s ***Level ${bey2.level} ${bey2.name}***.\n\nThe trade will proceed once both players have confirmed the trade by reacting to this message with a ✅. React with ❌ to cancel the trade immediately when it's your turn.\nWaiting for <@${tuser.id}> to react...`);
  msg.edit({embed: embed}, {file: tradeimage, name: `${message.author.id}-${tuser.id}trade.png`});
  let reactions2 = await ReactionHandler.collectReactions(
    msg,
    id => id === tuser.id,
    { maxMatches: 1, time: 300000 }
  ).catch(err => {
    message.channel.createMessage("Prompt cancelled due to timing out.");
    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isTrading": false}});
    db.collection("users").updateOne({_id: tuser.id}, {$set: {"states.isTrading": false}});
    return;
  });
  if(reactions2[0].emoji.name === "❌"){
    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isTrading": false}});
  db.collection("users").updateOne({_id: tuser.id}, {$set: {"states.isTrading": false}});
     return message.channel.createMessage(`Trade cancelled by ${tuser.id}.`);
  }
  bey1.starred = false;
  bey2.starred = false;
  stats.beys.push(bey2);
  stats2.beys.push(bey1);
  stats.beys.splice(index1, 1);
  stats2.beys.splice(index2, 1);
  if(stats.histories.length < stats.hslots){
    stats.histories.push(`-${bey1.name} +${bey2.name} (Traded with ${tuser.id})`);
  }
  if(stats2.histories.length < stats2.hslots){
    stats2.histories.push(`-${bey2.name} +${bey1.name} (Traded with ${message.author.id})`);
  }
  db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, histories: stats.histories, xp: stats.xp + 10, "states.isTrading": false, coins: stats.coins - halved}});
  db.collection("users").updateOne({_id: tuser.id}, {$set: {beys: stats2.beys, histories: stats2.histories, xp: stats2.xp + 10, "states.isTrading": false, coins: stats2.coins - halved}});
  message.channel.createMessage("✅Trade done!");
  let webhookembed = new Discord.MessageEmbed()
  .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) traded with ${tuser.username}#${tuser.discriminator} (${tuser.id})!`)
  .setDescription(`-${bey1.name} +${bey2.name}`)
  .setTimestamp()
  .setColor("#007fff");
  client.executeWebhook("ID", "TOKEN", {embeds: [webhookembed]}).catch(err => {console.error(err)});
}

module.exports.help = {
  name: "trade",
  aliases: ["trd"],
  desc: "Initiate a trade for Beys with someone.",
  usage: "trade <player to trade with> <your offer's index> <their offer's index> - Enjoy trading lol."
}
