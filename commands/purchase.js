const forsale = ["Buddy Bey Kit", "x1.5 EXP Booster 1 Hour", "Toolbox", "Perfect Constructor", "3 Premium Tickets Chest", "10 Premium Tickets Chest", "35 Premium Tickets Chest", "Void Meat", "Gift Box", "Avatar Embryo", "BeyLauncher LR"];
module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  if(!stats) return message.reply(`it looks like you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  if(!args[0] < forsale.length+1 && !args[0] > 0) return message.reply(`please make sure the item index is between 1 to ${forsale.length}.`);
  let item = parseInt(args[0])-1;
  if(!forsale[item]) return message.reply("invalid index number. Please try again.");
  let itemc = client.items.get(forsale[item]);
  let iteme = new itemc();
  if(iteme.civ && iteme.cigv && stats.coins < iteme.civ && stats.gv < iteme.cigv) return message.reply("you don't have enough Valtz nor Golden Valtz.");
  if(iteme.civ && stats.coins < iteme.civ && !iteme.cigv) return message.reply("you don't have enough Valtz.");
  if(iteme.cigv && stats.gv < iteme.cigv && !iteme.civ) return message.reply("you don't have enough Golden Valtz.");
  if(iteme.civ && stats.coins >= iteme.civ){
    db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: stats.coins - iteme.civ}, $push: {items: iteme}});
    message.channel.createMessage(`✅Successfully paid <:valtz:863052675968925716>${iteme.civ} and bought a ${iteme.name}!`);
    return;
  }else if(iteme.cigv && stats.gv >= iteme.cigv){
    db.collection("users").updateOne({_id: message.author.id}, {$set: {gv: stats.gv - iteme.cigv}, $push: {items: iteme}});
    message.channel.createMessage(`✅Successfully paid <:goldenvaltz:711477657824526418>${iteme.cigv} and bought a ${iteme.name}!`);
    return;
  }else throw "An error ocurred while purchasing, please try again. If the problem persists, please kindly report it in the support server.";
}

module.exports.help = {
  name: "purchase",
  aliases: ["prchs", "p", "buy"]
}