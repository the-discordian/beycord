/*const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Whitemarket')
  .setDescription("This command is temporarily turned off due to maintenance. Try again soon? \n[Check out our Discord Server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "whitemarket",
  desc: "whitemarket",
}*/

const Discord = require("discord.js");
const ReactionHandler = require("eris-reactions");
const Fuse = require("fuse.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({ _id: message.author.id });
  if (!stats)
    return message.reply(
      `you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`
    );
  let option = (args[0] || "view").toLowerCase();
  if (option === "sell") {
    if(stats.states.isListing === true) return message.reply("please continue or cancel the previous prompt before trying to sell or buy another Bey to the White Market.")
    if (!args[1])
      return message.reply(
        "please provide the index of the Bey you wish to put on the White Market and the price."
      );
    let sbey = stats.beys[parseInt(args[1]) - 1];
    let sindex = parseInt(args[1]) - 1;
    if(sindex == 0) return message.channel.createMessage("No.")
    if (!sbey) return message.reply("no Bey found to put on the White Market.");
    if (!args[2]) return message.reply("please provide the price.");
    let price = parseInt(args[2]);
    let amount = price;
    if (
      amount == NaN ||
      amount == Infinity ||
      amount == "NaN" ||
      amount == "Infinity" ||
      typeof amount != "number" ||
      typeof amount == "string" ||
      !amount ||
      isNaN(amount)
    )
      return message.reply("please try again with an actual price.");
    if (amount > 9999999)
      return message.reply(
        "prices can't exceed the limit of <:valtz:665760587845861386>9999999."
      );
    if (price < 1)
      return message.reply(
        "imagine putting something on the market for free.. please give a reasonable price, I'm begging you."
      );
    let sprompt = new Discord.MessageEmbed()
      .setDescription(
        `❓Are you sure that you want to put your Level ${sbey.level} ${sbey.name} on the White Market for <:valtz:665760587845861386>${price}?\n\n**⚠This action cannot be undone.**`
      )
      .setAuthor(
        message.author.username + "#" + message.author.discriminator,
        message.author.avatarURL
      )
      .setFooter("Beycord White Market", client.user.avatarURL)
      .setTimestamp()
      .setColor(0xffffff);
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
      let start = new Date();
      stats = await db.collection("users").findOne({ _id: message.author.id });
      let end = new Date();
      if(end-start>50) return message.channel.createMessage(`The current ping (${end-start}ms) is too high for the listing to process. Please try again later.`)
      sbey = stats.beys[parseInt(args[1]) - 1];
      if (!sbey) return message.reply("no Bey found to put on the White Market.");
      let minfo = await db.collection("market").findOne({ _id: "info"});
      let mid = parseInt(minfo.latestid) + 1;
      if (typeof mid !== "string") mid = mid.toString();
      stats.beys[sindex].starred = false;
      db.collection("market").insertOne({
        _id: mid,
        seller: message.author.id,
        bey: stats.beys[sindex],
        price: price
      });
      db.collection("market").updateOne(
        { _id: "info", latestid: 0 },
        { $set: { latestid: mid } }
      );
      stats.beys.splice(sindex, 1);
      db.collection("users").updateOne(
        { _id: message.author.id },
        { $set: { beys: stats.beys } }
      );
      let done = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.avatarURL
        )
        .setFooter("Beycord White Market", client.user.avatarURL)
        .setTimestamp()
        .setDescription(`✅Done!`);
      msg.edit({ embed: done });
      db.collection("users").updateOne({_id: message.author.id}, {$set: {"states.isListing": false}});
      let webhookembed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) listed a Bey on White Market!`)
      .setDescription(`It was a Level ${sbey.level} ${sbey.name} (OBID: ${sbey.firstOwner}) sold with a price of <:valtz:665760587845861386>${price}.`)
      .setTimestamp()
      .setColor("#ffffff");
      client.executeWebhook("ID", "TOKEN", {embeds: [webhookembed]}).catch(err => {console.error(err)});
    } else if (reactions[0].emoji.name === "❌") {
      let cancel = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.avatarURL
        )
        .setFooter("Beycord White Market", client.user.avatarURL)
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
    let msg = await message.channel.createMessage("Loading White Market...");
    let page = parseInt(args[1] || 1);
    if(isNaN(page) || page < 1) return msg.edit("What is this?");
    let allitems = await db.collection("market").countDocuments({});
    let recent = await db.collection("market").findOne({ _id: "info", latestid: 0 });
    let id = recent.latestid;
    let maxpages = Math.ceil((parseInt(allitems) - 1) / 25);
    if (page === 1) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Beycord White Market")
        .setAuthor("Results", client.user.avatarURL)
        .setTimestamp()
        .setFooter(`PAGE ${page}/${maxpages}`)
        .setColor(0xffffff);
      let mchecks = 26;
      for (var i = 1; i < mchecks; i++) {
        let mid = i.toString();
        let item = await db.collection("market").findOne({ _id: mid });
        if (item || item !== null) {
          let user = await client.getRESTUser(item.seller);
          embed.addField(
            `***Level ${item.bey.level} ${item.bey.bbname || item.bey.name}*** (#${item._id})`,
            `**Seller:** ${user.username || "Someone"}#${user.discriminator ||
              "0000"} | **Price:** <:valtz:665760587845861386>${item.price}`, true
          );
        }else if(i < (id-1)) mchecks = mchecks + 1;
      }
      msg.edit({ content: "✅Finished loading!", embed: embed });
    }
    if (page > 1 && page <= maxpages) {
      let items = await db.collection("market").find({}).toArray();
      let embed = new Discord.MessageEmbed()
        .setTitle("Beycord White Market")
        .setAuthor("Results", client.user.avatarURL)
        .setTimestamp()
        .setFooter(`PAGE ${page}/${maxpages}`)
        .setColor(0xffffff);
      let mchecks = (page - 1) * 25 + 26;
      for (var i = (page - 1) * 25 + 1; i < mchecks; i++) {
        let mid = i.toString();
        let item = items[i]
        if (item && item !== undefined) {
          let user = await client.getRESTUser(item.seller);
          embed.addField(
            `***Level ${item.bey.level} ${item.bey.bbname || item.bey.name}*** (#${item._id})`,
            `**Seller:** ${user.username || "Someone"}#${user.discriminator ||
              "0000"} | **Price:** <:valtz:665760587845861386>${item.price}`, true
          );
        }else if(i < (allitems-1)) mchecks = mchecks + 1;
      }
      msg.edit({ content: "✅Finished loading!", embed: embed });
    } else if(page > maxpages) return msg.edit({ content: "No page found." });
  } else if (option === "info") {
    if (!args[1])
      return message.reply(
        "please provide the index of the Bey you wish to view the information of."
      );
    let item = await db.collection("market").findOne({ _id: args[1] });
    if (!item) return message.reply("no Bey found.");
    let seller = await client.getRESTUser(item.seller);
    let crntbey = item.bey;
    let reqxp = crntbey.level * 300;
    let lastxp = (crntbey.level - 1) * 300;
    let xps = crntbey.xp - lastxp;
    let difference = reqxp - crntbey.xp;
    let atk = 23;
    let stamina = 3;
    let hp = 100;
    if (crntbey.type === "Attack") atk = atk + 5;
    if (crntbey.type === "Stamina") stamina = stamina + 2;
    if (crntbey.type === "Balance") {
      atk = atk + 3;
      stamina = stamina + 1;
    }
    let health1 = (crntbey.level - 1) * 2;
    let stamina1 = (crntbey.level - 1) * 0.2;
    hp = Math.floor(hp + health1);
    stamina = Math.floor(stamina + stamina1);
    if (stamina > 10) stamina = 10;
    let exps = xps + " / 300";
    if (crntbey.level == 100) exps = "**MAX LEVEL ACHIEVED**";
    let embed = new Discord.MessageEmbed()
      .setAuthor("Beycord White Market", client.user.avatarURL)
      .setColor("#ffffff")
      .setTitle(`**${crntbey.bbname || crntbey.name}**'s Information (#${item._id})`)
      .setThumbnail(crntbey.image)
      .addField(
        "Seller",
        `${seller.username || "Someone"}#${seller.discriminator || "0000"}`
      )
      .addField("Price", `<:valtz:665760587845861386>${item.price}`)
      .addField("Level", crntbey.level)
      .addField("EXPs", exps)
      .addField("Total EXPs", crntbey.xp)
      .addField("Type", crntbey.type)
      .addField(
        "Statistics",
        `\`\`\`Hitpoints: ${hp}\nAttack: 17 - ${atk}\nStamina: ${stamina}\`\`\``
      )
      .addField("Special Move", crntbey.move)
      .addField("Original Blader ID", crntbey.firstOwner)
      .setFooter(
        `${difference} more EXPs required to reach Lvl${crntbey.level + 1}.`
      );
    if (crntbey.level === 100) embed.setFooter("Level MAX");
    let generation = crntbey.gen || 1;
    switch(generation){
      case 1:
        embed.addField("Generation", "⭐");
        break;
      case 2:
        embed.addField("Generation", "⭐⭐");
        break;
      case 3:
        embed.addField("Generation", "⭐⭐⭐");
        break;
      case 4:
        embed.addField("Generation", "⭐⭐⭐⭐");
        break;
      case 5:
        embed.addField("Generation", "⭐⭐⭐⭐⭐");
        break;
    }
    message.channel.createMessage({ embed: embed });
  } else if (option === "buy") {
    if(!args[1]) return message.reply("please provide the ID of the Bey you wish to buy.");
    let bey = await db.collection("market").findOne({_id: args[1]});
    if(!bey) return message.reply("no Bey found. Maybe try again?");
    if(bey.seller === message.author.id) return message.reply("you can't buy back your own Bey from the White Market.");
    if(stats.coins < bey.price) return message.reply("you don't have enough Valtz.");
    let seller = await db.collection("users").findOne({_id: bey.seller});
    if(!seller) return message.channel.createMessage("The player you are trying to buy from no longer exists. They probably got banned or got their account removed or something.");
    let suser = await client.getRESTUser(bey.seller);
    let confirmation = new Discord.MessageEmbed()
    .setTitle(`Are you sure you want to buy the Level ${bey.bey.level} ${bey.bey.name} with a price of <:valtz:665760587845861386>${bey.price}?`)
    .setColor("#ffffff");
    let confirm = await message.channel.createMessage({embed: confirmation});
    confirm.addReaction("✅");
    confirm.addReaction("❌");
    let respond = await ReactionHandler.collectReactions(confirm, userid => userid == message.author.id, {time: 60000, maxMatches: 1});
    if(respond[0]){
      if(respond[0].emoji.name == "✅"){
        let start = new Date();
        stats = await db.collection("users").findOne({ _id: message.author.id });
        let end = new Date();
        if(end-start > 50) return message.channel.createMessage(`The current ping (${end-start}ms) is too high for the purchase to process. Please try again later.`);
        if(stats.coins < bey.price) return message.reply("you don't have enough Valtz.");
        let check = await db.collection("market").findOne({_id: args[1]});
        if(!check) return message.reply("that Bey is already bought by someone else.");
    let cost = bey.price;
    let tax = 75;
    if(stats.level == 2) tax = 80;
    if(stats.level == 3) tax = 85;
    if(stats.level == 4) tax = 90;
    if(stats.level == 5) tax = 95;
    let aftertax = Math.round((cost/100)*tax);
    let exp = 0;
    if(cost > 100) exp = 2;
    if(cost > 1000) exp = 10;
    if(cost > 5000) exp = 18;
    if(cost > 10000) exp = 30;
    db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: stats.coins - cost}, $push: {beys: bey.bey}});
    db.collection("users").updateOne({_id: bey.seller}, {$set: {coins: seller.coins + aftertax, items: seller.items, xp: seller.xp + exp}});
    db.collection("market").remove({_id: bey._id});
    let dmchannel = await client.getDMChannel(bey.seller);
    if(dmchannel) dmchannel.createMessage(`Your ${bey.bey.bbname || bey.bey.name} with the market ID of #${bey._id} was bought and you earned <:valtz:665760587845861386>${cost}!`).catch(err => console.log(err));
    message.channel.createMessage(`✅Successfully bought the Level ${bey.bey.level} ${bey.bey.bbname || bey.bey.name} from ${suser.username}#${suser.discriminator}. Enjoy!`);
    let webhookembed2 = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) bought a Bey from ${suser.username}#${suser.discriminator} (${suser.id}) on the White Market!`)
    .setDescription(`It was a Level ${bey.bey.level} ${bey.bey.name} (OBID: ${bey.bey.firstOwner}) sold with the price of <:valtz:665760587845861386>${bey.price}.`)
    .setTimestamp()
    .setColor("#ffffff");
    client.executeWebhook("ID", "TOKEN", {embeds: [webhookembed2]}).catch(err => {console.error(err)});
  }else{
        message.channel.createMessage("Prompt cancelled.");
  }
}else{
  message.channel.createMessage("Prompt timed out.");
}
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
        .collection("market")
        .find({ "bey.name": sresults[0].item });
    else if (sort === "a" || sort === "ascending")
      items = await db
        .collection("market")
        .find({ "bey.name": sresults[0].item })
        .sort({ price: 1 });
    else if (sort === "d" || sort === "descending")
      items = await db
        .collection("market")
        .find({ "bey.name": sresults[0].item })
        .sort({ price: -1 });
    else items = await db.collection("market").find({ "bey.name": sresults[0].item });
    if(level === "a" || level === "ascending") items = await items.sort({"bey.level": 1});
    else if(level === "d" || level === "descending") items = await items.sort({"bey.level": -1});
    items = await items.toArray();
    if (!items[0] || items[0] === undefined || !items)
      return msg.edit("No result found.");
    let count = items.length;
    let maxpages = Math.ceil(count / 25);
    if (page > maxpages || page === 0) return msg.edit("No page found.");
    let embed = new Discord.MessageEmbed()
      .setTitle("Beycord White Market")
      .setColor("#ffffff")
      .setTimestamp()
      .setAuthor(`Search results for ${nargs[0]}`, client.user.avatarURL)
      .setFooter(`PAGE ${page}/${maxpages}`);
    for (var i = (page - 1) * 25; i < (page - 1) * 25 + 25; i++) {
      let item = items[i];
      if (item || item !== undefined) {
        let user = await client.getRESTUser(item.seller);
        embed.addField(
          `***Level ${item.bey.level} ${item.bey.bbname || item.bey.name}*** (#${item._id})`,
          `**Seller:** ${user.username || "Someone"}#${user.discriminator ||
            "0000"} | **Price:** <:valtz:665760587845861386>${item.price}`, true
        );
      }
    }
    msg.edit({ content: "✅Finished loading!", embed: embed });
  } else
    return message.reply(
      `invalid option. Please type \`\`${prefix}help whitemarket\`\` to know the options and stuff.`
    );
};

module.exports.help = {
  name: "whitemarket",
  aliases: ["market", "wm"],
  desc: "Sell or buy Beys from the White Market.",
  usage: "whitemarket - Show the first page of the White Market.\nwhitemarket view/page <page number> - View a page of the White Market.\nwhitemarket sell <bey index number> <price> - Sell a Bey on the White Market.\nwhitemarket info <ID> - View the information of a Bey displayed on the White Market.\nwhitemarket search <Bey name>|<page number (optional)>|<price order (optional)>|<level order (optional)> - Search for a Bey in the White Market.\nwhitemarket buy <ID> - Buy a Bey from the White Market.\n\nThe IDs are the (#12345678) thing with \"(#)\" removed. Basically the numbers.\n\n**Price Orders:**\na OR ascending\nd OR descending\nr OR random\n\n**Level orders are the same as price orders.**"
};
