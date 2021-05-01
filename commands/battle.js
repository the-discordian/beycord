const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Battle')
  .setDescription("This command is temporarily turned off due to maintenance. Try again soon? \n[Check out our Discord Server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "battle",
  desc: "battle",
}

/*const Discord = require("discord.js");
const ReactionHandler = require("eris-reactions");

module.exports.run = async (client, message, args, prefix, player, db) => {
	let stats = await db.collection("users").findOne({ _id: message.author.id });
  if(stats.states.inBattle == true) return message.reply("you are already in a battle. Please end that one before doing another one.");
  if (!stats)
    return message.reply(
      `you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`
    );
  let challenged;
  if(message.mentions[0]) challenged = await message.guild.getRESTMember(message.mentions[0].id);
  else if(args[0]) challenged = await message.guild.getRESTMember(args[0]);
  if (!challenged) return message.reply("unknown user. Please try again.");
  if(challenged.bot) return message.reply("why are you trying to battle a bot?");
  if(challenged.id === message.author.id) return message.channel.createMessage("Why are you trying to battle yourself?");
  let stats2 = await db
    .collection("users")
    .findOne({ _id: challenged.user.id });
  if (!stats2 && challenged.user.id !== client.user.id)
    return message.reply("The challenged user has not started the game yet.");
    if(stats2.settings.breqs === false) return message.reply("that player has blocked battle requests from others.")
    if((stats.beys[stats.main].broken && stats.beys[stats.main].broken === true) || (stats2.beys[stats2.main].broken && stats2.beys[stats2.main].broken === true)) return message.channel.createMessage("One of the players needs to equip a non-broken Bey before trying to battle because you can't even launch it without it dropping off the launcher like every time.");
    if(stats.beys[stats.main].name == "Buddy Bey" || stats2.beys[stats2.main].name == "Buddy Bey") return message.channel.createMessage("Buddy Beys are currently disabled for battles.");
    let agreed1 = null;
    let agreed2 = null;
    let reacted = [];
  let request = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}#${message.author.discriminator} Waiting...`, message.author.avatarURL)
  .setFooter(`${challenged.user.username}#${challenged.user.discriminator} Waiting...`, challenged.user.avatarURL)
  .setColor("#ffcf00");
  let req = await message.channel.createMessage({content:`<@${challenged.id}>, <@${message.author.id}>, please approve the battle request below.`,embed:request});
  req.addReaction("✅");
  req.addReaction("❌");
  let reactions = await ReactionHandler.collectReactions(req, userID => (userID == message.author.id || userID == challenged.user.id) && (!reacted.includes(userID)), {maxMatches: 1, time: 60000}).catch(err => message.channel.createMessage("Prompt timed out."))
  if(!reactions[0]) return message.channel.createMessage("Prompt timed out.");
  reacted.push(reactions[0].userID);
  if(reactions[0].userID == message.author.id){
    if(reactions[0].emoji.name == "✅") agreed1 = true;
    else agreed1 = false;
  }
  if(reactions[0].userID == challenged.user.id){
    if(reactions[0].emoji.name == "✅") agreed2 = true;
    else agreed2 = false;
  }
  let emoji1 = "❌";
  let emoji2 = "❌";
  if(agreed1 == null) emoji1 = "Waiting...";
  else if(agreed1 == true) emoji1 = "✅";
  if(agreed2 == null) emoji2 = "Waiting...";
  else if(agreed2 == true) emoji2 = "✅"; 
  let request2 = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}#${message.author.discriminator} ${emoji1}`, message.author.avatarURL)
  .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ${emoji2}`, challenged.user.avatarURL)
  .setColor("#ffcf00");
  req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, please approve the battle request below.`, embed: request2});
  let reactions2 = await ReactionHandler.collectReactions(req, userID => (userID == message.author.id || userID == challenged.user.id) && (!reacted.includes(userID)), {maxMatches: 1, time: 60000}).catch(err => message.channel.createMessage("Prompt timed out."));
  if(!reactions2[0]) return message.channel.createMessage("Prompt timed out.");
  reacted.push(reactions2[0].userID);
  if(reactions2[0].userID == message.author.id){
    if(reactions2[0].emoji.name == "✅") agreed1 = true;
    else agreed1 = false;
  }
  if(reactions2[0].userID == challenged.user.id){
    if(reactions2[0].emoji.name == "✅") agreed2 = true;
    else agreed2 = false;
  }
  emoji1 = "❌";
  emoji2 = "❌";
  if(agreed1 == null) emoji1 = "Waiting...";
  else if(agreed1 == true) emoji1 = "✅";
  if(agreed2 == null) emoji2 = "Waiting...";
  else if(agreed2 == true) emoji2 = "✅"; 
  let request3 = new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}#${message.author.discriminator} ${emoji1}`, message.author.avatarURL)
  .setFooter(`${challenged.user.username}#${challenged.user.discriminator} ${emoji2}`, challenged.user.avatarURL)
  .setColor("#ffcf00");
  req.edit({content:`<@${challenged.id}>, <@${message.author.id}>, please approve the battle request below.`, embed: request3});
  if (agreed1 == true && agreed2 == true) {
    let bs = require("./battlesystem.js");
    client.createMessage(message.channel.id, "Waiting for battle...").then(msg => {
      if(stats2.states.inBattle == true) return message.channel.createMessage(`<@${challenged.user.id}>, you are already in a battle. Please end that one before doing another one.`)
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.inBattle": true}});
      db.collection("users").updateOne({_id: challenged.user.id}, {$set: {"states.inBattle": true}});
      bs.run(
        client,
        message,
        args,
        db,
        prefix,
        message.author,
        challenged.user,
        msg
      );
      if(challenged.user.id !== "BOT ID"){
        db.collection("users").updateOne({_id: message.author.id}, {$set: {xp: stats.xp + 5}});
        db.collection("users").updateOne({_id: challenged.user.id}, {$set: {xp: stats2.xp + 5}})
      }
    });
  } else {
    client.createMessage(message.channel.id,"The battle was cancelled.");
  }
};

module.exports.help = {
  name: "battle",
  aliases: ["duel", "b"]
};
*/