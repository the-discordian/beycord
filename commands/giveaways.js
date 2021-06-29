const Discord = require("discord.js");
const ReactionHandler = require("eris-reactions");
const Fuse = require("fuse.js");

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({ _id: message.author.id });
  if (!stats)
    return message.reply(
      `you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`
    );
  let option = (args[0] || "view").toLowerCase();
  if (option === "list") {
    if(stats.states.isListing === true) return message.reply("please continue or cancel the previous prompt before trying to giveaway another item.")
    if (!args[1])
      return message.reply(
        "please provide the index of the Bey you wish to giveaway."
      );
    let sbey = stats.beys[parseInt(args[1]) - 1];
    let sindex = parseInt(args[1]) - 1;
    if(sindex <= 0) return message.channel.createMessage("No.")
    if (!sbey) return message.reply("no Bey found to giveaway.");
    let sprompt = new Discord.MessageEmbed()
      .setDescription(
        `❓Are you sure that you want to giveaway your Level ${sbey.level} ${sbey.name}?\n\n**⚠This action cannot be undone.**`
      )
      .setAuthor(
        message.author.username + "#" + message.author.discriminator,
        message.author.avatarURL
      )
      .setFooter("Beycord Giveaways", client.user.avatarURL)
      .setTimestamp()
      .setColor("RANDOM");
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": true}});
    let msg = await message.channel.createMessage({ embed: sprompt });
    msg.addReaction("✅");
    msg.addReaction("❌");
    let reactions = await ReactionHandler.collectReactions(
      msg,
      id => id === message.author.id,
      { maxMatches: 1, time: 300000 }
    ).catch(err => {
      message.channel.createMessage("Prompt cancelled due to timing out.");
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": false}});
    });
    if(reactions[0]){
    if (reactions[0].emoji.name === "✅") {
      let minfo = await db.collection("giveaways").findOne({ _id: "info" });
      let mid = parseInt(minfo.latestid) + 1;
      if (typeof mid !== "string") mid = mid.toString();
      stats.beys[sindex].starred = false;
      db.collection("giveaways").insertOne({
        _id: mid,
        host: message.author.id,
        bey: stats.beys[sindex],
        entries: [],
        premium: [],
        startTime: new Date()
      });
      db.collection("giveaways").updateOne(
        { _id: "info" },
        { $set: { latestid: mid } }
      );
      stats.beys.splice(sindex, 1);
      db.collection("users").updateOne(
        { _id: message.author.id },
        { $set: { beys: stats.beys } }
      );
      let done = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.avatarURL
        )
        .setFooter("Beycord Giveaways", client.user.avatarURL)
        .setTimestamp()
        .setDescription(`✅Done!`);
      msg.edit({ embed: done });
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": false}});
    } else if (reactions[0].emoji.name === "❌") {
      let cancel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.avatarURL
        )
        .setFooter("Beycord Giveaways", client.user.avatarURL)
        .setTimestamp()
        .setDescription(`❌Cancelled!`);
      msg.edit({ embed: cancel });
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": false}});
    } else {
      message.channel.createMessage(
        "Prompt cancelled due to invalid reaction received."
      );
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": false}});
      return;
    }
  }else{
    message.channel.createMessage("Prompt cancelled due to timing out.");
    db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": false}});
    return;
  }
  } else if (option === "view" || option === "page") {
    let msg = await message.channel.createMessage("Loading Giveaways...");
    let page = parseInt(args[1] || 1);
    if(isNaN(page) || page < 1) return msg.edit("What is this?");
    let allitems = await db.collection("giveaways").countDocuments({});
    let recent = await db.collection("giveaways").findOne({_id: "info"});
    let id = recent.latestid;
    let maxpages = Math.ceil((parseInt(allitems) - 1) / 25);
    if (page === 1) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Beycord Giveaways")
        .setAuthor("Results", client.user.avatarURL)
        .setTimestamp()
        .setFooter(`PAGE ${page}/${maxpages}`)
        .setColor("RANDOM");
      let mchecks = 26;
      for (var i = 1; i < mchecks; i++) {
        let mid = i.toString();
        let item = await db.collection("giveaways").findOne({ _id: mid });
        if (item || item !== null) {
          let user = await client.getRESTUser(item.host);
          embed.addField(
            `***Level ${item.bey.level} ${item.bey.bbname || item.bey.name}*** (#${item._id})`,
            `**Host:** ${user.username || "Someone"}#${user.discriminator ||
              "0000"} | **Entries:** ${item.entries.length + item.premium.length}`, true
          );
        }else if(i < (id-1)) mchecks = mchecks + 1;
      }
      msg.edit({ content: "✅Finished loading!", embed: embed });
    }
    if (page > 1 && page <= maxpages) {
      let items = await db.collection("giveaways").find({}).toArray();
      let embed = new Discord.MessageEmbed()
        .setTitle("Beycord Giveaways")
        .setAuthor("Results", client.user.avatarURL)
        .setTimestamp()
        .setFooter(`PAGE ${page}/${maxpages}`)
        .setColor(0xffffff);
      let mchecks = (page - 1) * 25 + 26;
      for (var i = (page - 1) * 25 + 1; i < mchecks; i++) {
        let mid = i.toString();
        let item = items[i]
        if (item && item !== undefined) {
          let user = await client.getRESTUser(item.host);
          embed.addField(
            `***Level ${item.bey.level} ${item.bey.bbname || item.bey.name}*** (#${item._id})`,
            `**Host:** ${user.username || "Someone"}#${user.discriminator ||
              "0000"} | Entries: ${item.entries.length + item.premium.length}`, true
          );
        }else if(i < (allitems-1)) mchecks = mchecks + 1;
      }
      msg.edit({ content: "✅Finished loading!", embed: embed });
    } else if(page > maxpages) return msg.edit({ content: "No page found." });
  } else if (option === "info") {
    if (!args[1])
      return message.reply(
        "please provide the index of the giveaway you wish to view the information of."
      );
    let item = await db.collection("giveaways").findOne({ _id: args[1] });
    if (!item) return message.reply("no giveaway found.");
    let seller = await client.getRESTUser(item.host);
    let crntbey = item.bey;
    let embed = new Discord.MessageEmbed()
      .setAuthor("Beycord Giveaways", client.user.avatarURL)
      .setColor("RANDOM")
      .setTitle(`***Giveaway #${item._id}***`)
      .setDescription(`**Item:** Level ${item.bey.level} ${item.bey.bbname || item.bey.name} #${item.bey.id || "???"}\n**Host:** ${seller.username || "Someone"}#${seller.discriminator || "0000"}\n**Normal Entries:** ${item.entries.length}\n**Premium Entries:** ${item.premium.length}\n**Started at:** ${item.startTime || "Unknown"}\n**Ends at:** Host decides`)
      .setThumbnail(item.bey.image)
    message.channel.createMessage({ embed: embed });
  } else if (option === "enter") {
    if(!args[1]) return message.reply("please provide the ID of the giveaway you wish to enter.");
    if(!args[2]) return message.reply("please provide the amount of giveaway tickets you wish to use.");
    let amt = Math.floor(parseInt(args[2]) || 0);
    let pamt = Math.floor(parseInt(args[3]) || 0);
    if(isNaN(amt) || (isNaN(pamt) && pamt !== null)) return message.reply("please use numbers to specify the ticket amount lol.");
    if(amt < 0 || pamt < 0) return message.reply("oh well, that's not an acceptable number.")
    let bey = await db.collection("giveaways").findOne({_id: args[1]});
    if(!bey) return message.reply("no giveaway found. Maybe try again?");
    if(bey.host === message.author.id) return message.reply("you can't join your own giveaway. (Obviously)");
    let host = await db.collection("users").findOne({_id: bey.host});
    if(!host) return message.channel.createMessage("The host of the giveaway is banned or deleted.");
    let findpocket = stats.items.filter(item => item.name === "Pocket");
    if(!findpocket[0]) return message.reply("please get a pocket first.");
    let pocketi = stats.items.indexOf(findpocket[0]);
    let pocket = stats.items[pocketi];
    if(pocket.tickets < amt) return message.reply("you don't have that many Giveaway Tickets.");
    if(pocket.premium < pamt) return message.reply("you don't have that many premium Giveaway tickets.");
    let eentries = bey.entries.filter(entry => entry === message.author.id).length;
    let epremium = bey.premium.filter(entry => entry === message.author.id).length;
    let ree = 5 - eentries;
    let rep = 5 - epremium;
    if(stats.level == 1) ree = ree - 3;
    if(stats.level == 2) ree = ree - 2;
    if(stats.level == 3) ree = ree - 1;
    if(stats.level == 4) ree = ree - 1;
    if(ree < 0) ree = 0;
    if(rep < 0) rep = 0;
    if(amt > ree) return message.reply(`you can only add ${ree} more Giveaway Tickets.`);
    if(pamt > rep) return message.reply(`you can only add ${rep} more Premium Tickets.`)
    for(var i = 0; i < amt; i++){
      stats.items[pocketi].tickets = stats.items[pocketi].tickets - 1;
      bey.entries.push(message.author.id);
    }
    for(var i = 0; i < pamt; i++){
      stats.items[pocketi].premium = stats.items[pocketi].premium - 1;
      bey.premium.push(message.author.id);
    }
    db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items, xp: stats.xp + ((amt*5)+(pamt*10))}});
    db.collection("giveaways").updateOne({_id: args[1]}, {$set: {entries: bey.entries, premium: bey.premium}});
    message.channel.createMessage("Entries added!");
  } else if (option === "find" || option === "search") {
    if (!args[1])
      return message.reply(
        "please provide a Bey name to search."
      );
    let beyn = args.slice(1).join(" ");
    let nargs = beyn.split("|");
    let sort = (nargs[2] || "random").toLowerCase();
    let page = parseInt(nargs[1] || 1);
    if(isNaN(page) || page < 1) return msg.edit("What is this?");
    let level = (nargs[3] || "random").toLowerCase();
    let msg = await message.channel.createMessage(
      `Searching for ${nargs[0]}...`
    );
    const beys = [];
	  client.beys.array().forEach(b => {
	    if(b !== (client.beys.get("Buddy Bey"))){
	    let be = new b(); 
	    if(be.name) beys.push(be.name);
	  }
  });
  beys.push("Buddy Bey");
  const fuse = new Fuse(beys, {threshold: 0.4});
  let sresults = fuse.search(nargs[0]);
  if(!sresults[0]) return msg.edit("No result found.");
    let items;
    if (sort === "r" || sort === "random")
      items = await db
        .collection("giveaways")
        .find({ "bey.name": sresults[0].item });
    else if (sort === "a" || sort === "ascending")
      items = await db
        .collection("giveaways")
        .find({ "bey.name": sresults[0].item })
        .sort({ entries: 1 });
    else if (sort === "d" || sort === "descending")
      items = await db
        .collection("giveaways")
        .find({ "bey.name": sresults[0].item })
        .sort({ entries: -1 });
    else items = await db.collection("giveaways").find({ "bey.name": sresults[0].item });
    if(level === "a" || level === "ascending") items = await items.sort({"bey.level": 1});
    else if(level === "d" || level === "descending") items = await items.sort({"bey.level": -1});
    items = await items.toArray();
    if (!items[0] || items[0] === undefined || !items)
      return msg.edit("No result found.");
    let count = items.length;
    let maxpages = Math.ceil(count / 25);
    if (page > maxpages || page === 0) return msg.edit("No page found.");
    let embed = new Discord.MessageEmbed()
      .setTitle("Beycord Giveaways")
      .setColor("RANDOM")
      .setTimestamp()
      .setAuthor(`Search results for ${nargs[0]}`, client.user.avatarURL)
      .setFooter(`PAGE ${page}/${maxpages}`);
    for (var i = (page - 1) * 25; i < (page - 1) * 25 + 25; i++) {
      let item = items[i];
      if (item || item !== undefined) {
        let user = await client.getRESTUser(item.host);
        embed.addField(
          `***Level ${item.bey.level} ${item.bey.bbname || item.bey.name}*** (#${item._id})`,
          `**Host:** ${user.username || "Someone"}#${user.discriminator ||
            "0000"} | **Entries:** ${item.entries.length + item.premium.length}`, true
        );
      }
    }
    msg.edit({ content: "✅Finished loading!", embed: embed });
  } else if(option === "end"){
    if(!args[1]) return message.reply("please provide the ID of the giveaway you wish to end.");
    let ga = await db.collection("giveaways").findOne({_id: args[1]});
    if(!ga) return message.reply("no giveaway found. Are you sure you typed it correctly?");
    if(ga.host !== message.author.id) return message.reply("you are not the host of that giveaway.")
    let entries = ga.entries.concat(ga.premium);
    if(entries.length < 5) return message.channel.createMessage("5 Giveaway Tickets (normal + premium) is required for a giveaway to end.")
    shuffle(entries);
    let random = Math.floor(Math.random() * entries.length);
    let winner = entries[random];
    let user = await client.getRESTUser(winner);
    if(!user) message.channel.createMessage("Rolled on an unexisting player. Please try again.");
    let dmchannel = await client.getDMChannel(winner);
    let player = await db.collection("users").findOne({_id: winner});
    if(!player) return message.channel.createMessage("Rolled on a banned or deleted player. Please try again.");
    if(ga.bey.type !== "Non Beycord Item"){
      db.collection("users").updateOne({_id: winner}, {$push: {beys: ga.bey}});
    }
    db.collection("giveaways").remove({_id: ga._id});
    db.collection("users").updateOne({_id: message.author.id}, {$set: {xp: stats.xp + 25}});
    dmchannel.createMessage(`:tada: Congratulations! One of your Giveaway Tickets got picked among ${entries.length} tickets and you won the giveaway of a Level ${ga.bey.level} ${ga.bey.bbname || ga.bey.name}! :tada:\n\nIt has been sent to your inventory with the index of ${player.beys.length + 1}.`);
    message.channel.createMessage(`The winner is ${user.username}#${user.discriminator}! You earned 50 EXPs for hosting a successful giveaway.`);
  }else
    return message.reply(
      `invalid option. Please type \`\`${prefix}help giveaways\`\` to know the options and stuff.`
    );
};

module.exports.help = {
  name: "giveaways",
  aliases: ["ga", "giveaway"],
  desc: "Host, enter and view giveaways!",
  usage: "giveaways - Shows the first page of the giveaway list.\ngiveaways list <bey index> - List a Bey to giveaway.\ngiveaways enter <giveaway id> <normal ticket amount> <premium ticket amount (optional)> - Enter a giveaway using Giveaway Tickets stored in your pocket.\ngiveaways end <giveaway id> - End a giveaway and earn EXPs. You must be the host of the giveaway and the giveaway must have at least 5 entries.\ngiveaways view/page <page number> - View a page of the giveaway list.\ngiveaways search/find <name|<page number (optional)>|<entries order (optional)>|<level order (optional)> - Search for a giveaway of a specific Bey or item.\ngiveaways info - View the information of an existing giveaway.\n\n__Entries and Level Orders__\nd OR descending\na OR ascending\nr OR random\n\nIDs are the numbers in something like (#123293)."
};