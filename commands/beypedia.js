const Discord = require("discord.js");
const Fuse = require("fuse.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  if(!stats) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  let beys = Array.from(client.beys.values())
  let maxpage = Math.ceil(beys.length / 25);
  let page = args[0] || 1;
  let results = null;
  if(args[0]){
      const beys = [];
	    Array.from(client.beys.values()).forEach(b => {
	      if(b !== (client.beys.get("Buddy Bey")) && b !== (client.beys.get("Demonic Armageddon"))){
	      let be = new b("1",1); 
	      if(be.name && !beys.includes(be.name)) beys.push(be.name);
	    }
    });
    beys.push("Buddy Bey");
    const fuse = new Fuse(beys, {threshold: 0.4});
    let result = fuse.search(args.join(" "));
    if(result[0]) results = result[0].item;
  }
  if(args[0] && client.beys.get(args.join(" ")) && isNaN(parseInt(args[0]))){
    if(args.join(" ") === "Buddy Bey"){
      let bbembed = new Discord.MessageEmbed()
      .setAuthor("Beypedia", client.user.avatarURL)
      .setTimestamp()
      .setThumbnail("https://images.discordapp.net/avatars/827343111234519040/e3ff8924f1d5d41c975907008f0059f2.png?size=512")
      .setDescription("This is a Buddy Bey,\nA Buddy Bey can be anything.\nLike legit anything.\nFrom a reskinned God Valkyrie and blue Cho-Z Achilles, to DIO's face on a Bey and an original Bey,\nThey can exist peacefully as a Buddy Bey,\nBuddy Beys are truly interesting.\nA :tools: beside a Bey means it's a Buddy Bey.")
      .setColor(0x7f7fff);
      return message.channel.createMessage({embed: bbembed});
    }
    let beyc = client.beys.get(args.join(" "));
    let bey = new beyc("1",1);
    let atk = 23;
    let stamina = 3;
    if(bey.type === "Attack") atk = atk + 5;
    if(bey.type === "Stamina") stamina = stamina + 2;
    if(bey.type === "Balance"){
      atk = atk + 3;
      stamina = stamina + 1;
    }
    let rarity;
    if(client.commonbeys.has(bey.name)) rarity = "Common";
    else if(client.specialbeys.has(bey.name)) rarity = "Special";
    else if(client.rarebeys.has(bey.name)) rarity = "Rare";
    else if(client.legendarybeys.has(bey.name)) rarity = "Legendary";
    else if(client.availablebeys.has(bey.name)) rarity = "Unknown";
    else if(client.shadowbeys.has(bey.name)) rarity = "Shadow";
    else rarity = "Exclusive/Event";
    let embed = new Discord.MessageEmbed()
    .setTitle(`${bey.name}'s Base Information`)
    .addField("Type", bey.type)
    .addField("Rarity", rarity)
    .addField("Special Move", `${bey.specials[0].name || "None"}`)
    .addField("Statistics", `\`\`\`\nHitpoints: 100\nAttack: ${atk}\nStamina: ${stamina}\n\`\`\``)
    .setColor(0x7f7fff)
    .setAuthor("Beypedia", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(bey.image);
    if(stats.perks.includes("Beypedia++")){
      let desc;
      let title;
      async function fakesend(content){
        if(typeof content === "object"){
          if(content.embed && content.embed.title) title = content.embed.title;
          if(content.embed && content.embed.description) desc = content.embed.description;
        }else if(content.content) title = content.content;
        else if(content instanceof Discord.MessageEmbed){
          if(content.title) title = content.title;
          if(content.description) desc = content.
          description;
        }
        else title = content;
        let thing = "";
        if(title) thing += title;
        if(desc) thing += `\n${desc}`;
        embed.addField("Special Move Simulation", thing || "Unknown");
      };
      let fakemsg = {
        channel: {
          createMessage: fakesend,
          sendMessage: fakesend,
          send: fakesend
        }
      }
      let facted = {
        id: message.author.id,
        hp: 100,
        stamina: 3,
        atk: 23,
        username: message.member.effectiveName,
        energy: 0,
        bey: bey
      }
      let fvictim = {
        id: message.author.id,
        hp: 100,
        stamina: 3,
        atk: 23,
        username: message.member.effectiveName,
        energy: 0,
        bey: bey
      }
      let player = {};
      try{
bey.special(facted, fvictim, fakemsg, player)
      } catch(err) {
   title = "***It looks like this Bey's special is broken! Please report the erroe below to the [support server](https://discord.gg/8FJKAMDSv9).***";
        desc = err.stack;
      }
    }
    message.channel.createMessage({embed: embed});
    return;
  }else if(args[0] && client.beys.get(results) && isNaN(parseInt(args[0]))){
    if(results === "Buddy Bey"){
      let bbembed = new Discord.MessageEmbed()
      .setAuthor("Beypedia", client.user.avatarURL)
      .setTimestamp()
      .setThumbnail("")
      .setDescription("This is a Buddy Bey,\nA Buddy Bey can be anything.\nLike legit anything.\nFrom a reskinned God Valkyrie and blue Cho-Z Achilles, to DIO's face on a Bey and an original Bey,\nThey can exist peacefully as a Buddy Bey,\nBuddy Beys are truly interesting.")
      .setColor(0x7f7fff);
      return message.channel.createMessage({embed: bbembed});
    }
    let beyc = client.beys.get(results);
    let bey = new beyc("1",1);
    let atk = 23;
    let stamina = 3;
    if(bey.type === "Attack") atk = atk + 5;
    if(bey.type === "Stamina") stamina = stamina + 2;
    if(bey.type === "Balance"){
      atk = atk + 3;
      stamina = stamina + 1;
    }
    let rarity;
    if(client.commonbeys.has(bey.name)) rarity = "Common";
    else if(client.specialbeys.has(bey.name)) rarity = "Special";
    else if(client.rarebeys.has(bey.name)) rarity = "Rare";
    else if(client.legendarybeys.has(bey.name)) rarity = "Legendary";
    else if(client.availablebeys.has(bey.name)) rarity = "Unknown";
    else if(client.shadowbeys.has(bey.name)) rarity = "Shadow";
    else rarity = "Exclusive/Event";
    let embed = new Discord.MessageEmbed()
    .setTitle(`${bey.name}'s Base Information`)
    .addField("Type", bey.type)
    .addField("Rarity", rarity)
    .addField("Special Move", `${bey.specials[0].name || "None"}`)
    .addField("Statistics", `\`\`\`\nHitpoints: 100\nAttack: ${atk}\nStamina: ${stamina}\n\`\`\``)
    .setColor(0x7f7fff)
    .setAuthor("Beypedia", client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(bey.image);
    if(stats.perks.includes("Beypedia++")){
      let desc;
      let title;
      async function fakesend(content){
        if(typeof content === "object"){
          if(content.embed && content.embed.title) title = content.embed.title;
          if(content.embed && content.embed.description) desc = content.embed.description;
        }else if(content.content) title = content.content;
        else if(content instanceof Discord.MessageEmbed){
          if(content.title) title = content.title;
          if(content.description) desc = content.
          description;
        }
        else title = content;
        let thing = "";
        if(title) thing += title;
        if(desc) thing += `\n${desc}`;
        embed.addField("Special Move Simulation", thing || "Unknown");
      };
      let fakemsg = {
        channel: {
          createMessage: fakesend,
          sendMessage: fakesend,
          send: fakesend
        }
      }
      let facted = {
        id: message.author.id,
        hp: 100,
        stamina: 3,
        atk: 23,
        username: message.member.effectiveName,
        energy: 0,
        bey: bey
      }
      let fvictim = {
        id: message.author.id,
        hp: 100,
        stamina: 3,
        atk: 23,
        username: message.member.effectiveName,
        energy: 0,
        bey: bey
      }
      let player = {};
      try{
bey.special(facted, fvictim, fakemsg, player)
      } catch(err) {
   title = "***It looks like this Bey's special is broken! Please report the erroe below to the [support server](https://discord.gg/8FJKAMDSv9).***";
        desc = err.stack;
      }
    }
    message.channel.createMessage({embed: embed});
    return;
  }
  if(page === 1){
    let added = [];
    let list = beys.slice(0,24);
    let embed = new Discord.MessageEmbed()
    .setTitle("Beypedia - The only encyclopedia you need for Beycord!")
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setColor(0x7f7fff)
    .setFooter(`PAGE 1/${maxpage}`, client.user.avatarURL);
    list.forEach(beyc => {
      let exampleb = {
        name: "Buddy Bey",
        bbname: "Buddy Bey",
        type: "Depends",
        image: "https://www.kindpng.com/picc/m/138-1386981_anime-face-png-kono-dio-da-png-transparent.png",
        firstOwner: "1",
        move: "That Move",
        sd: "Right",
        stats: {
          atk: 1,
          def: 1,
          stamina: 1
        },
        effects: {
          atk: 1,
          ss: 1,
          dmgb: 1,
          hpr: 1
        },
        level: 1,
        xp: 0
      };
      let bey = new beyc("1", "1", exampleb);
      let checke = stats.beys.filter(beye => {return beye.name === bey.name});
      let yon;
      if(checke[0]) yon = "✅";
      else yon = "❌";
      if(checke.length > 0 && stats.perks.includes("Beypedia+")) yon += `(x${checke.length}) `;
      if(!added.includes(bey.name)){
        embed.addField(yon+bey.name, `${bey.type} Type`, true);
        added.push(bey.name);
      }
    });
    message.channel.createMessage({embed:embed});
  }
  if(page > 1 && page <= maxpage){
    let added = [];
    let list = beys.slice((page-1) * 25, (page-1) * 25 + 25);
    let embed = new Discord.MessageEmbed()
    .setTitle("Beypedia - The only encyclopedia you need for Beycord!")
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .setColor(0x7f7fff)
    .setFooter(`PAGE ${page}/${maxpage}`, client.user.avatarURL);
    list.forEach(beyc => {
      let exampleb = {
        name: "Buddy Bey",
        bbname: "Buddy Bey",
        type: "Depends",
        image: "https://www.kindpng.com/picc/m/138-1386981_anime-face-png-kono-dio-da-png-transparent.png",
        firstOwner: "1",
        move: "That Move",
        sd: "Right",
        stats: {
          atk: 1,
          def: 1,
          stamina: 1
        },
        effects: {
          atk: 1,
          ss: 1,
          dmgb: 1,
          hpr: 1
        },
        level: 1,
        xp: 0
      };
      let bey = new beyc("1", "1", exampleb);
      let checke = stats.beys.filter(beye => {return beye.name === bey.name});
      let yon;
      if(checke[0]) yon = "✅";
      else yon = "❌";
      if(checke.length > 0 && stats.perks.includes("Beypedia+")) yon += `(x${checke.length}) `;
      if(bey.name !== "Lost 288548939156684811" && bey.name !== "Demonic Armageddon" && bey.name !== "Demonic Armageddon" && bey.name !== "Demon Destroying Bey" && bey.name !== "Heavenly Slayer" && bey.name !== "Breezing Cool Cheeto" && bey.name !== "Flaming Hot Cheeto" && bey.name !== "Hallow Xcalibur" && bey.name !== "Lunar Minoboros" && bey.name !== "Firework Pegasus" && bey.name !== "Shamrock Pegasus" && !added.includes(bey.name)){
        embed.addField(yon+bey.name, `${bey.type} Type`, true);
        added.push(bey.name);
      }
    });
    message.channel.createMessage({embed:embed});
  }
  if(page > maxpage) return message.reply("no page found.")
}

module.exports.help = {
  name: "beypedia",
  aliases: ["pedia", "beydex", "dex"],
  desc: "Flip the legendary Beypedia and get information about Beys.",
  usage: "beypedia - Show the first page of Beypedia.\nbeypedia <page number> - Show a page of Beypedia.\nbeypedia <bey name> - Check a Bey's base information."
}