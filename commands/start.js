const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let statss = await db.collection("users").findOne({_id: message.author.id});
  let pocketc = client.items.get("Pocket");
  let pocket = new pocketc();
  if(statss !== null) return message.reply("you already started the game.");
  let referrer;
  if(args[0]){
    referrer = await db.collection("users").findOne({_id: args[0]});
  }
  let referrerid = null;
  if(referrer) referrerid = referrer._id
  let startembed = new Discord.MessageEmbed()
  .setTitle('**Welcome to Beycord!** Where we bring Beyblades into Discord.')
  .setDescription('Please choose a starter Bey to begin your journey in the world of Beyblades. Click on their name to see how they look like. Type their name correctly to choose. Example: ``Victory Valkyrie``')
  .setColor("#7f7fff")
  .addField("Attack type", "[Victory Valkyrie](https://cdn.glitch.com/246ebe39-76c4-4f23-9058-86ccadf85d3b%2FABABB5E9-B2A6-4982-A2DC-DB6EA5489546.jpeg?1556016620150)")
  .addField("Stamina type", "[Rising Ragnaruk](https://cdn.glitch.com/246ebe39-76c4-4f23-9058-86ccadf85d3b%2F0386FB12-85BF-4C07-94A8-9B085F1E4D6E.jpeg?1556016862399)")
  .addField("Defense type", "[King Kerbeus](https://cdn.glitch.com/246ebe39-76c4-4f23-9058-86ccadf85d3b%2F87D66958-279A-4A2C-A6C0-A77FB9A61221.jpeg?1556017544388)")
  .addField("Balance type", "[Storm Spriggan](https://images-ext-2.discordapp.net/external/tahaZ3JxQevW7byikH8hic3UPwJJLrpXzMwvlJg2mKw/%3Fcb%3D20181218235223/https/vignette.wikia.nocookie.net/beyblade/images/a/a7/Beyblade_Spriggan.png/revision/latest)")
  .setTimestamp();
  
  message.channel.createMessage({embed:startembed});
  const filter = m => m.author.id === message.author.id;
  let collected = await message.channel.awaitMessages(filter, {maxMatches: 1, time: 300000})
  .catch(err => console.error(err));
    if(collected[0].content.toLowerCase() !== "victory valkyrie" && collected[0].content.toLowerCase() !== "rising ragnaruk" && collected[0].content.toLowerCase() !== "king kerbeus" && collected[0].content.toLowerCase() !== "storm spriggan") message.channel.createMessage("Invalid arguments. Please check your spelling and try again.");
    if(collected[0].content.toLowerCase() === "victory valkyrie"){
      let starter = new (client.beys.get("Victory Valkyrie"))(message.author.id);
      db.collection("users").insertOne({_id: message.author.id, beys: [starter], coins: 100, main: 0, xp: 0, level: 1, faction: "nothing", premium: false, redeemed: [], beyparts: [], launcher: "default", items: [pocket], streak: 0, gv: 0, wins: 0, reminder: false, lastVoted: 0, favs: [], perks: [], invsort: "index", settings: {breqs: true, treqs: true, inv: true}, stars: 1, quests: [], qslots: 1, cooldowns: {vote: 0}, won: [], histories: [], hslots: 10, states: {inBattle: false, isTrading: false, isListing: false}, rank: 0, referrer: referrerid});
      if(!!referrer) db.collection("users").updateOne({_id: referrer._id}, {$set: {xp: referrer.xp + 15, coins: referrer.coins + 25}});
      return message.channel.createMessage(`✅Success! You've chosen Victory Valkyrie as your starter Bey.`);
    }
    if(collected[0].content.toLowerCase() === "rising ragnaruk"){
      let starter = new (client.beys.get("Rising Ragnaruk"))(message.author.id);
      db.collection("users").insertOne({_id: message.author.id, beys: [starter], coins: 100, main: 0, xp: 0, level: 1, faction: "nothing", premium: false, redeemed: [], beyparts: [], launcher: "default", items: [pocket], streak: 0, gv: 0, wins: 0, reminder: false, lastVoted: 0, favs: [], perks: [], invsort: "index", settings: {breqs: true, treqs: true, inv: true}, stars: 1, quests: [], qslots: 1, cooldowns: {vote: 0}, won: [], histories: [], hslots: 10, states: {inBattle: false, isTrading: false, isListing: false}, rank: 0, referrer: referrerid});
      if(!!referrer) db.collection("users").updateOne({_id: referrer._id}, {$set: {xp: referrer.xp + 15, coins: referrer.coins + 25}});
      return message.channel.createMessage(`✅Success! You've chosen Rising Ragnaruk as your starter Bey.`);
    }
    if(collected[0].content.toLowerCase() === "king kerbeus"){
      let starter = new (client.beys.get("King Kerbeus"))(message.author.id);
      db.collection("users").insertOne({_id: message.author.id, beys: [starter], coins: 100, main: 0, xp: 0, level: 1, faction: "nothing", premium: false, redeemed: [], beyparts: [], launcher: "default", items: [pocket], streak: 0, gv: 0, wins: 0, reminder: false, lastVoted: 0, favs: [], perks: [], invsort: "index", settings: {breqs: true, treqs: true, inv: true}, stars: 1, quests: [], qslots: 1, cooldowns: {vote: 0}, won: [], histories: [], hslots: 10, states: {inBattle: false, isTrading: false, isListing: false}, rank: 0, referrer: referrerid});
      if(!!referrer) db.collection("users").updateOne({_id: referrer._id}, {$set: {xp: referrer.xp + 15, coins: referrer.coins + 25}});
      return message.channel.createMessage(`✅Success! You've chosen King Kerbeus as your starter Bey.`);
    }
    if(collected[0].content.toLowerCase() === "storm spriggan"){
      let starter = new (client.beys.get("Storm Spriggan"))(message.author.id);
      db.collection("users").insertOne({_id: message.author.id, beys: [starter], coins: 100, main: 0, xp: 0, level: 1, faction: "nothing", premium: false, redeemed: [], beyparts: [], launcher: "default", items: [pocket], streak: 0, gv: 0, wins: 0, reminder: false, lastVoted: 0, favs: [], perks: [], invsort: "index", settings: {breqs: true, treqs: true, inv: true}, stars: 1, quests: [], qslots: 1, cooldowns: {vote: 0}, won: [], histories: [], hslots: 10, states: {inBattle: false, isTrading: false, isListing: false}, rank: 0, referrer: referrerid});
      if(!!referrer) db.collection("users").updateOne({_id: referrer._id}, {$set: {xp: referrer.xp + 15, coins: referrer.coins + 25}});
      return message.channel.createMessage(`✅Success! You've chosen Storm Spriggan as your starter Bey.`);
    }
}

module.exports.help = {
  name: "start",
  aliases: ["begin"],
  desc: "Start the game.",
  usage: "start <referrer's user ID (optional)> - Begin the game."
}