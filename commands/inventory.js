const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, ok, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  if(!stats) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  let suser;
  if(args[0]){
    if(message.mentions[0])  suser = await message.guild.getRESTMember(message.mentions[0].id);
    else if(args[0] !== "page" && args[0] !== "pg" && args[0] !== "p") suser = await message.guild.getRESTMember(args[0]);
  }
  if(suser){
    stats = await db.collection("users").findOne({_id: suser.id});
  }else{
    suser = message.member;
  }
    if(stats.settings.inv === false && stats._id !== message.author.id) return message.reply("that player locked their inventories from others to view.")
    let main = stats.beys[stats.main];
    let user = suser.user;
    let pages = Math.ceil(stats.beys.length / 25); if(pages === 0) pages = 1;
  if(args[1] && args[1] === "page" && parseInt(args[2]) > pages) return message.reply("no page found.")
  let page = parseInt(args[2]) || parseInt(args[1]);
  if(!page || isNaN(page)) page = 1;
  let amtshift;
  let amtslice;
  if(page === 1){
    amtshift = 0;
    amtslice = 0;
  }else{
    amtshift = (page-1)* 25;
    amtslice = (page-1) * 25;
  }
  let invb = stats.beys;
    if(page < 1 || page > pages) return message.reply("no page found.");
     for(var i in invb){
      if(invb[i] == null || invb[i] == undefined || !invb[i]){
        stats.beys.splice(parseInt(i)+amtshift,1);
        db.collection("users").updateOne({_id: suser.user.id}, {$set: {beys:stats.beys}});
        return message.reply("it seems like your inventory is broken. Hmmmmmmm? Fixed!")
      }
      invb[i].index = parseInt(i)+1;
    }
    let sorted = stats.beys;
    if(stats.invsort === "index") sorted = stats.beys;
    if(stats.invsort === "level") sorted = stats.beys.sort((a,b) => {
      if(a.level > b.level) return -1; if(a.level < b.level) return 1; return 0;
    });
    if(stats.invsort === "abc") sorted = stats.beys.sort((a,b) => {
      if(a.name < b.name) return -1; if(a.name > b.name) return 1; return 0;
    });
    let inv = sorted.slice((page-1) * 25, (page-1) * 25 + 25);
  if(page === 1) inv = sorted.slice(0,25);
  let embed = new Discord.MessageEmbed()
  .setAuthor(user.username + "#" + user.discriminator, user.avatarURL)
  .setTitle("Bey Inventory")
  .setColor("#7f7fff")
  .setDescription(`Currently equipping:\n**[${stats.main + 1}]: ${main.bbname || main.name} (Level ${main.level})**`)
  .setFooter(`PAGE ${page}/${pages} | Sorting: ${stats.invsort}`)
  .setTimestamp();
    for(var i in inv){
      let iinfo = "";
      if(inv[i].broken && inv[i].broken === true) iinfo += "<a:alert:724198069226438686> | ";
      if(inv[i].starred && inv[i].starred === true) iinfo += "⭐ | ";
      if(inv[i].level === 0) iinfo += "<:level0:722078650190528583> | ";
//      if(client.blackbeys.includes(inv[i].name) || inv[i].name === "Black Perfect Phoenix" || inv[i].name === "Dark Perfect Phoenix") iinfo += "<:black:721678218859511829> | ";
      let type = "<:Balance:760560740750458901>";
      switch(inv[i].type){
        case "Attack":
          type = "<:Attack:863052677357109258>";
        break;
        case "Defense":
          type = "<:Defense:863052677209915412>";
        break;
        case "Stamina":
          type = "<:Stamina:863052677213716530>";
        break;
        default:
          type = "<:Balance:863052677193269249>";
      }
      iinfo += `${type} | **EXPs:** ${inv[i].xp} | **OBID:** ${inv[i].firstOwner}`;
    embed.addField(`__***[${inv[i].index}]:** Level ${inv[i].level} ${inv[i].bbname || inv[i].name} ${inv[i].gen || 1}⭐*__`, iinfo)
    }
  return message.channel.createMessage({embed:embed});
}

module.exports.help = {
  name: "inventory",
  aliases: ["inv", "beyinv", "beyinventory", "binv", "beys"],
  desc: "Show someone's inventory.",
  usage: "inventory - Show the first page of your Bey inventory.\ninventory page/pg/p <page number> - Show a page of your Bey inventory.\ninventory <player mention or ID> - Show the first page of the player's inventory. \ninventory <player mention or ID> page/pg/p <page number> - Show a page of the player's inventory."
}
