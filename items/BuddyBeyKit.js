const Item = require("./Item.js");
let Discord = require("discord.js");
const ReactionHandler = require("eris-reactions");

class BuddyBeyKit extends Item {
  constructor(){
    super("BuddyBeyKit", 20000, 1);
  }
  async use(client, message, args, prefix, iindex, db){
    let stats = await db.collection("users").findOne({_id: message.author.id});
    let atk = 0;
    let stamina = 0;
    let def = 0;
    let gembed = new Discord.MessageEmbed()
    .setTitle("❓ Please select a burst subsystem that you want your Buddy Bey to be in.")
    .setDescription("🇩: Dual Layer System\n🇬: God Layer System\n🇨: Cho-Z Layer System\n🇹: Gatinko Layer System\n❌: Cancel")
    .setFooter("Beycord Buddy Bey Kit")
    .setTimestamp()
    .setColor("#7f7fff")
    .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL);
    let msg = await message.channel.createMessage({embed: gembed});
    msg.addReaction("🇩");
    msg.addReaction("🇬");
    msg.addReaction("🇨");
    msg.addReaction("🇹");
    msg.addReaction("❌");
    let reactions = await ReactionHandler.collectReactions(msg, id => id === message.author.id, { maxMatches: 1, time: 300000 })
    .catch(err => message.channel.createMessage("Prompt cancelled due to timing out."));
    if (reactions[0].emoji.name === "🇩") {
      message.channel.createMessage("Please provide the index number of the disc that you want to use.");
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
       if(collected[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let pindex = parseInt(collected[0].content)-1;
      let disc = stats.beyparts[pindex];
      if(!disc) return message.reply("no disc found. Please restart the prompt and try again.");
      if(disc.type !== "Disc") return message.reply("the part you provided is not a disc. Please restart the prompt and try again.");
      atk = atk + disc.stats.atk;
      def = def + disc.stats.def;
      stamina = stamina + disc.stats.stamina;
      
      message.channel.createMessage("Please provide the index number of the driver that you want to use.");
      let collected2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected2[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let dindex = parseInt(collected2[0].content)-1;
      let driver = stats.beyparts[dindex];
      if(!driver) return message.reply("no driver found. Please restart the prompt and try again.");
      if(driver.type !== "Driver") return message.reply("the part you provided is not a driver. Please restart the prompt and try again.");
      atk = atk + driver.stats.atk;
      def = def + driver.stats.def;
      stamina = stamina + driver.stats.stamina;
      
      message.channel.createMessage("Please provide the link or attachment to the energy layer of the Bey.");
      let collected3 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected3[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected3[0].content.includes("http") && !collected3[0].attachments[0]) return message.reply("no image or link found. Please restart the prompt and try again.");
      if(collected3[0].attachments[0] && collected3[0].attachments[0].filename.split(".")[1] !== "png") return message.reply("the image must a .PNG file. Please restart the prompt and try again.")
      message.channel.createMessage("Please name the Bey and special move like `Bey Name|Move Name`.");
      let collected4 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});      
      if(collected4[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected4[0].content.includes("|")) return message.reply("please divide the Bey name and special move name with a \"|\" and make sure there's no spaces between \"|\" and the names.");
      let latk = Math.round(Math.random() * 5);
      let ldef = Math.round(Math.random() * 5);
      let lstamina = Math.round(Math.random() * 5);
      atk = atk + latk;
      def = def + ldef;
      stamina = stamina + lstamina;
      let type = "Balance";
      if(atk > def && atk > stamina) type = "Attack";
      if(def > atk && def > stamina) type = "Defense";
      if(stamina > atk && stamina > def) type = "Stamina";
      if(Math.round((atk + def + stamina)/3) === 3) type = "Balance";
      let ss = 0;
      let hpr = 0;
      let atke = 0;
      let dmgb = 0;
      if(disc.effects.atk) atke = atke + disc.effects.atk;
      if(disc.effects.ss) ss = ss + disc.effects.ss;
      if(disc.effects.hpr) hpr = hpr + disc.effects.hpr;
      if(disc.effects.dmgb) dmgb = dmgb + disc.effects.dmgb;
      if(driver.effects.atk) atke = atke + driver.effects.atk;
      if(driver.effects.ss) ss = ss + driver.effects.ss;
      if(driver.effects.hpr) hpr = hpr + driver.effects.hpr;
      if(driver.effects.dmgb) dmgb = dmgb + driver.effects.dmgb;
      let names = collected4[0].content.split("|");
      let imaget;
      if(collected3[0].content) imaget = collected3[0].content;
      if(collected3[0].attachments[0]) imaget = collected3[0].attachments[0].url;
      let bbey = {
        name: "Buddy Bey",
        bbname: names[0] || "That Name",
        type: type,
        image: imaget,
        firstOwner: message.author.id,
        move: names[1] || "That Move",
        stats: {
          atk: atk,
          def: def,
          stamina: stamina
        },
        effects: {
          atk: atke,
          ss: ss,
          dmgb: dmgb,
          hpr: hpr
        },
        level: 1,
        xp: 0
      };
      
      let prompt = new Discord.MessageEmbed()
      .setDescription(`❓ Are you sure that you want to submit your Buddy Bey, ***${bbey.bbname}*** with **Type:** ${bbey.type} and **Special Move:** ${bbey.move}, for approval so it can be used in battles and to show off?`)
      .setColor("#7f7fff")
      .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
      .setFooter("Beycord Buddy Bey Kit")
      .setTimestamp();
      let msg2 = await message.channel.createMessage({embed: prompt});
      msg2.addReaction("✅");
      msg2.addReaction("❌");
      let reactions2 = await ReactionHandler.collectReactions(msg2, id => id === message.author.id, { maxMatches: 1, time: 300000 })
      .catch(err => message.channel.createMessage("Prompt cancelled due to timing out."));
      if(reactions2[0].emoji.name === "✅"){
        let error = null;
        let bbs = await db.collection("buddybeys").findOne({_id: "info"});
        let bid = (parseInt(bbs.latestid)+1).toString();
        let approval = new Discord.MessageEmbed()
        .setTitle(bbey.bbname + ` | (#${bid})`)
        .setThumbnail(bbey.image)
        .addField("Type", bbey.type)
        .addField("Special Move", bbey.move)
        .addField("Layer System", "Dual")
        .setFooter(`Submitted by ${message.author.username}#${message.author.discriminator} at`)
        .setTimestamp()
        .setColor("#7f7fff");
        client.executeWebhook("900348688117952522", "Pks-gG1QLxi5kWuN9xgAOjCjJaapBgZsJPKFwEVMGngXT6heeOVa9KkjqLEg1bth4GiV", {embeds: [approval], embed: approval});
        stats.beyparts.splice(stats.beyparts.indexOf(disc), 1);
        stats.beyparts.splice(stats.beyparts.indexOf(driver), 1);
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {beyparts: stats.beyparts, items: stats.items}});
        db.collection("buddybeys").insertOne({_id: bid, bey: bbey, submitter: message.author.id});
        db.collection("buddybeys").updateOne({_id: "info"}, {$set: {latestid: bid}});
        message.channel.createMessage("✅Successfully sent your Buddy Bey for approval. Please be informed that the approval process might take up to a week but trust me it's definitely worth it.");
        return true;
      }else return message.channel.createMessage("Prompt cancelled.")
    } else if(reactions[0].emoji.name === "🐶") return message.channel.createMessage("Looks like you selected the Dog Layer System.\nhttps://bit.ly/2BZSvFS");
    else if(reactions[0].emoji.name === "🇬"){
      message.channel.createMessage("Please provide the index number of the disc that you want to use.");
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
       if(collected[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let pindex = parseInt(collected[0].content)-1;
      let disc = stats.beyparts[pindex];
      if(!disc) return message.reply("no disc found. Please restart the prompt and try again.");
      if(disc.type !== "Disc") return message.reply("the part you provided is not a disc. Please restart the prompt and try again.");
      atk = atk + disc.stats.atk;
      def = def + disc.stats.def;
      stamina = stamina + disc.stats.stamina;
      
      message.channel.createMessage("Please provide the index number of the driver that you want to use.");
      let collected2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected2[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let dindex = parseInt(collected2[0].content)-1;
      let driver = stats.beyparts[dindex];
      if(!driver) return message.reply("no driver found. Please restart the prompt and try again.");
      if(driver.type !== "Driver") return message.reply("the part you provided is not a driver. Please restart the prompt and try again.");
      atk = atk + driver.stats.atk;
      def = def + driver.stats.def;
      stamina = stamina + driver.stats.stamina;

      message.channel.createMessage("Please provide the index number of the disc frame that you want to use. Reply with \"none\" if you don't want to use any.");
      let collected5 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected5[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let findex = parseInt(collected5[0].content)-1;
      let frame;
      if(collected5[0].content.toLowerCase() !== "none") frame = stats.beyparts[findex];
      else frame = null;
      if(frame && frame.type !== "Disc Frame") return message.reply("the part you provided is not a disc frame. Please restart the prompt and try again.");
      if(frame){
        atk = atk + frame.stats.atk;
        def = def + frame.stats.def;
        stamina = stamina + frame.stats.stamina;
      }
      
      message.channel.createMessage("Please provide the link or attachment to the energy layer of the Bey.");
      let collected3 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected3[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected3[0].content.includes("http") && !collected3[0].attachments[0]) return message.reply("no image or link found. Please restart the prompt and try again.");
      if(collected3[0].attachments[0] && collected3[0].attachments[0].filename.split(".")[1] !== "png") return message.reply("the image must a .PNG file. Please restart the prompt and try again.")
      message.channel.createMessage("Please name the Bey and special move like `Bey Name|Move Name`.");
      let collected4 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});      
      if(collected4[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected4[0].content.includes("|")) return message.reply("please divide the Bey name and special move name with a \"|\" and make sure there's no spaces between \"|\" and the names.");
      let latk = Math.round(Math.random() * 5);
      let ldef = Math.round(Math.random() * 5);
      let lstamina = Math.round(Math.random() * 5);
      atk = atk + latk;
      def = def + ldef;
      stamina = stamina + lstamina;
      let type = "Balance";
      if(atk > def && atk > stamina) type = "Attack";
      if(def > atk && def > stamina) type = "Defense";
      if(stamina > atk && stamina > def) type = "Stamina";
      if(Math.round((atk + def + stamina)/3) === 3) type = "Balance";
      let ss = 0;
      let hpr = 0;
      let atke = 0;
      let dmgb = 0;
      if(disc.effects.atk) atke = atke + disc.effects.atk;
      if(disc.effects.ss) ss = ss + disc.effects.ss;
      if(disc.effects.hpr) hpr = hpr + disc.effects.hpr;
      if(disc.effects.dmgb) dmgb = dmgb + disc.effects.dmgb;
      if(driver.effects.atk) atke = atke + driver.effects.atk;
      if(driver.effects.ss) ss = ss + driver.effects.ss;
      if(driver.effects.hpr) hpr = hpr + driver.effects.hpr;
      if(driver.effects.dmgb) dmgb = dmgb + driver.effects.dmgb;
      if(frame){
        if(frame.effects.ss) ss = ss + frame.effects.ss;
      if(frame.effects.hpr) hpr = hpr + frame.effects.hpr;
      if(frame.effects.dmgb) dmgb = dmgb + frame.effects.dmgb;
      }
      let names = collected4[0].content.split("|");
      let imaget;
      if(collected3[0].content) imaget = collected3[0].content;
      if(collected3[0].attachments[0]) imaget = collected3[0].attachments[0].url;
      let bbey = {
        name: "Buddy Bey",
        bbname: names[0] || "That Name",
        type: type,
        image: imaget,
        firstOwner: message.author.id,
        move: names[1] || "That Move",
        stats: {
          atk: atk,
          def: def,
          stamina: stamina
        },
        effects: {
          atk: atke,
          ss: ss,
          dmgb: dmgb,
          hpr: hpr
        },
        level: 1,
        xp: 0
      };
      
      let prompt = new Discord.MessageEmbed()
      .setDescription(`❓ Are you sure that you want to submit your Buddy Bey, ***${bbey.bbname}*** with **Type:** ${bbey.type} and **Special Move:** ${bbey.move}, for approval so it can be used in battles and to show off?`)
      .setColor("#7f7fff")
      .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
      .setFooter("Beycord Buddy Bey Kit")
      .setTimestamp();
      let msg2 = await message.channel.createMessage({embed: prompt});
      msg2.addReaction("✅");
      msg2.addReaction("❌");
      let reactions2 = await ReactionHandler.collectReactions(msg2, id => id === message.author.id, { maxMatches: 1, time: 300000 })
      .catch(err => message.channel.createMessage("Prompt cancelled due to timing out."));
      if(reactions2[0].emoji.name === "✅"){
        let error = null;
        let bbs = await db.collection("buddybeys").findOne({_id: "info"});
        let bid = (parseInt(bbs.latestid)+1).toString();
        let approval = new Discord.MessageEmbed()
        .setTitle(bbey.bbname + ` | (#${bid})`)
        .setThumbnail(bbey.image)
        .addField("Type", bbey.type)
        .addField("Special Move", bbey.move)
        .addField("Layer System", "God")
        .setFooter(`Submitted by ${message.author.username}#${message.author.discriminator} at`)
        .setTimestamp()
        .setColor("#7f7fff");
        client.executeWebhook("900348688117952522", "Pks-gG1QLxi5kWuN9xgAOjCjJaapBgZsJPKFwEVMGngXT6heeOVa9KkjqLEg1bth4GiV", {embeds: [approval], embed: approval});
        stats.beyparts.splice(stats.beyparts.indexOf(disc), 1);
        stats.beyparts.splice(stats.beyparts.indexOf(driver), 1);
        if(frame) stats.beyparts.splice(stats.beyparts.indexOf(frame), 1);
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {beyparts: stats.beyparts, items: stats.items}});
        db.collection("buddybeys").insertOne({_id: bid, bey: bbey, submitter: message.author.id});
        db.collection("buddybeys").updateOne({_id: "info"}, {$set: {latestid: bid}});
        message.channel.createMessage("✅Successfully sent your Buddy Bey for approval. Please be informed that the approval process might take up to a week but trust me it's definitely worth it.");
        return true;
      }else return message.channel.createMessage("Prompt cancelled.")
    }else if(reactions[0].emoji.name === "🇨"){
      message.channel.createMessage("Please provide the index number of the disc that you want to use.");
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
       if(collected[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let pindex = parseInt(collected[0].content)-1;
      let disc = stats.beyparts[pindex];
      if(!disc) return message.reply("no disc found. Please restart the prompt and try again.");
      if(disc.type !== "Disc") return message.reply("the part you provided is not a disc. Please restart the prompt and try again.");
      atk = atk + disc.stats.atk;
      def = def + disc.stats.def;
      stamina = stamina + disc.stats.stamina;
      
      message.channel.createMessage("Please provide the index number of the driver that you want to use.");
      let collected2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected2[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let dindex = parseInt(collected2[0].content)-1;
      let driver = stats.beyparts[dindex];
      if(!driver) return message.reply("no driver found. Please restart the prompt and try again.");
      if(driver.type !== "Driver") return message.reply("the part you provided is not a driver. Please restart the prompt and try again.");
      atk = atk + driver.stats.atk;
      def = def + driver.stats.def;
      stamina = stamina + driver.stats.stamina;

      message.channel.createMessage("Please provide the index number of the disc frame that you want to use. Reply with \"none\" if you don't want to use any.");
      let collected5 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected5[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let findex = parseInt(collected5[0].content)-1;
      let frame;
      if(collected5[0].content.toLowerCase() !== "none") frame = stats.beyparts[findex];
      else frame = null;
      if(frame && frame.type !== "Disc Frame") return message.reply("the part you provided is not a disc frame. Please restart the prompt and try again.");
      if(frame){
        atk = atk + frame.stats.atk;
        def = def + frame.stats.def;
        stamina = stamina + frame.stats.stamina;
      }
      
      message.channel.createMessage("Please provide the link or attachment to the energy layer of the Bey.");
      let collected3 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected3[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected3[0].content.includes("http") && !collected3[0].attachments[0]) return message.reply("no image or link found. Please restart the prompt and try again.");
      if(collected3[0].attachments[0] && collected3[0].attachments[0].filename.split(".")[1] !== "png") return message.reply("the image must a .PNG file. Please restart the prompt and try again.")
      message.channel.createMessage("Please name the Bey and special move like `Bey Name|Move Name`.");
      let collected4 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});      
      if(collected4[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected4[0].content.includes("|")) return message.reply("please divide the Bey name and special move name with a \"|\" and make sure there's no spaces between \"|\" and the names.");
      let latk = Math.round(Math.random() * 5);
      let ldef = Math.round(Math.random() * 5);
      let lstamina = Math.round(Math.random() * 5);
      atk = atk + latk;
      def = def + ldef;
      stamina = stamina + lstamina;
      let type = "Balance";
      if(atk > def && atk > stamina) type = "Attack";
      if(def > atk && def > stamina) type = "Defense";
      if(stamina > atk && stamina > def) type = "Stamina";
      if(Math.round((atk + def + stamina)/3) === 3) type = "Balance";
      let ss = 0;
      let hpr = 0;
      let atke = 0;
      let dmgb = 0;
      if(disc.effects.atk) atke = atke + disc.effects.atk;
      if(disc.effects.ss) ss = ss + disc.effects.ss;
      if(disc.effects.hpr) hpr = hpr + disc.effects.hpr;
      if(disc.effects.dmgb) dmgb = dmgb + disc.effects.dmgb;
      if(driver.effects.atk) atke = atke + driver.effects.atk;
      if(driver.effects.ss) ss = ss + driver.effects.ss;
      if(driver.effects.hpr) hpr = hpr + driver.effects.hpr;
      if(driver.effects.dmgb) dmgb = dmgb + driver.effects.dmgb;
      if(frame){
        if(frame.effects.ss) ss = ss + frame.effects.ss;
      if(frame.effects.hpr) hpr = hpr + frame.effects.hpr;
      if(frame.effects.dmgb) dmgb = dmgb + frame.effects.dmgb;
      }
      let names = collected4[0].content.split("|");
      let imaget;
      if(collected3[0].content) imaget = collected3[0].content;
      if(collected3[0].attachments[0]) imaget = collected3[0].attachments[0].url;
      let bbey = {
        name: "Buddy Bey",
        bbname: names[0] || "That Name",
        type: type,
        image: imaget,
        firstOwner: message.author.id,
        move: names[1] || "That Move",
        stats: {
          atk: atk,
          def: def,
          stamina: stamina
        },
        effects: {
          atk: atke,
          ss: ss,
          dmgb: dmgb,
          hpr: hpr
        },
        level: 1,
        xp: 0
      };
      
      let prompt = new Discord.MessageEmbed()
      .setDescription(`❓ Are you sure that you want to submit your Buddy Bey, ***${bbey.bbname}*** with **Type:** ${bbey.type} and **Special Move:** ${bbey.move}, for approval so it can be used in battles and to show off?`)
      .setColor("#7f7fff")
      .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
      .setFooter("Beycord Buddy Bey Kit")
      .setTimestamp();
      let msg2 = await message.channel.createMessage({embed: prompt});
      msg2.addReaction("✅");
      msg2.addReaction("❌");
      let reactions2 = await ReactionHandler.collectReactions(msg2, id => id === message.author.id, { maxMatches: 1, time: 300000 })
      .catch(err => message.channel.createMessage("Prompt cancelled due to timing out."));
      if(reactions2[0].emoji.name === "✅"){
        let error = null;
        let bbs = await db.collection("buddybeys").findOne({_id: "info"});
        let bid = (parseInt(bbs.latestid)+1).toString();
        let approval = new Discord.MessageEmbed()
        .setTitle(bbey.bbname + ` | (#${bid})`)
        .setThumbnail(bbey.image)
        .addField("Type", bbey.type)
        .addField("Special Move", bbey.move)
        .addField("Layer System", "Cho-Z")
        .setFooter(`Submitted by ${message.author.username}#${message.author.discriminator} at`)
        .setTimestamp()
        .setColor("#7f7fff");
        client.executeWebhook("900348688117952522", "Pks-gG1QLxi5kWuN9xgAOjCjJaapBgZsJPKFwEVMGngXT6heeOVa9KkjqLEg1bth4GiV", {embeds: [approval], embed: approval});
        stats.beyparts.splice(stats.beyparts.indexOf(disc), 1);
        stats.beyparts.splice(stats.beyparts.indexOf(driver), 1);
        if(frame) stats.beyparts.splice(stats.beyparts.indexOf(frame), 1);
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {beyparts: stats.beyparts, items: stats.items}});
        db.collection("buddybeys").insertOne({_id: bid, bey: bbey, submitter: message.author.id});
        db.collection("buddybeys").updateOne({_id: "info"}, {$set: {latestid: bid}});
        message.channel.createMessage("✅Successfully sent your Buddy Bey for approval. Please be informed that the approval process might take up to a week but trust me it's definitely worth it.");
        return true;
      }else return message.channel.createMessage("Prompt cancelled.")
    }else if(reactions[0].emoji.name === "🇹"){
      message.channel.createMessage("Please provide the index number of the disc that you want to use.");
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
       if(collected[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let pindex = parseInt(collected[0].content)-1;
      let disc = stats.beyparts[pindex];
      if(!disc) return message.reply("no disc found. Please restart the prompt and try again.");
      if(disc.type !== "Disc") return message.reply("the part you provided is not a disc. Please restart the prompt and try again.");
      atk = atk + disc.stats.atk;
      def = def + disc.stats.def;
      stamina = stamina + disc.stats.stamina;
      
      message.channel.createMessage("Please provide the index number of the driver that you want to use.");
      let collected2 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected2[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let dindex = parseInt(collected2[0].content)-1;
      let driver = stats.beyparts[dindex];
      if(!driver) return message.reply("no driver found. Please restart the prompt and try again.");
      if(driver.type !== "Driver") return message.reply("the part you provided is not a driver. Please restart the prompt and try again.");
      atk = atk + driver.stats.atk;
      def = def + driver.stats.def;
      stamina = stamina + driver.stats.stamina;

      message.channel.createMessage("Please provide the index number of the disc frame that you want to use. Reply with \"none\" if you don't want to use any.");
      let collected5 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected5[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let findex = parseInt(collected5[0].content)-1;
      let frame;
      if(collected5[0].content.toLowerCase() !== "none") frame = stats.beyparts[findex];
      else frame = null;
      if(frame && frame.type !== "Disc Frame") return message.reply("the part you provided is not a disc frame. Please restart the prompt and try again.");
      if(frame){
        atk = atk + frame.stats.atk;
        def = def + frame.stats.def;
        stamina = stamina + frame.stats.stamina;
      }

      message.channel.createMessage("Please provide the index number of the layer weight that you want to use. Reply with \"none\" if you don't want to use any.");
      let collected6 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected6[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      let windex = parseInt(collected6[0].content)-1;
      let weight;
      if(collected6[0].content.toLowerCase() !== "none") weight = stats.beyparts[windex];
      else weight = null;
      if(weight && weight.type !== "Layer Weight") return message.reply("the part you provided is not a layer weight. Please restart the prompt and try again.");
      if(weight){
        atk = atk + weight.stats.atk;
        def = def + weight.stats.def;
        stamina = stamina + weight.stats.stamina;
      }
      
      message.channel.createMessage("Please provide the link or attachment to the `energy layer` or `gatinko chip + layer base` of the Bey. If you are submitting a layer chip + layer base, make sure they are placed right next to each other in the same image.");
      let collected3 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});
      if(collected3[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected3[0].content.includes("http") && !collected3[0].attachments[0]) return message.reply("no image or link found. Please restart the prompt and try again.");
      if(collected3[0].attachments[0] && collected3[0].attachments[0].filename.split(".")[1] !== "png") return message.reply("the image must a .PNG file. Please restart the prompt and try again.")
      message.channel.createMessage("Please name the Bey and special move like `Bey Name|Move Name`.");
      let collected4 = await message.channel.awaitMessages(m => m.author.id === message.author.id, {maxMatches: 1, time: 300000});      
      if(collected4[0].content.toLowerCase() === "cancel") return message.channel.createMessage("Prompt cancelled.");
      if(!collected4[0].content.includes("|")) return message.reply("please divide the Bey name and special move name with a \"|\" and make sure there's no spaces between \"|\" and the names.");
      let latk = Math.round(Math.random() * 5);
      let ldef = Math.round(Math.random() * 5);
      let lstamina = Math.round(Math.random() * 5);
      atk = atk + latk;
      def = def + ldef;
      stamina = stamina + lstamina;
      let type = "Balance";
      if(atk > def && atk > stamina) type = "Attack";
      if(def > atk && def > stamina) type = "Defense";
      if(stamina > atk && stamina > def) type = "Stamina";
      if(Math.round((atk + def + stamina)/3) === 3) type = "Balance";
      let ss = 0;
      let hpr = 0;
      let atke = 0;
      let dmgb = 0;
      if(disc.effects.atk) atke = atke + disc.effects.atk;
      if(disc.effects.ss) ss = ss + disc.effects.ss;
      if(disc.effects.hpr) hpr = hpr + disc.effects.hpr;
      if(disc.effects.dmgb) dmgb = dmgb + disc.effects.dmgb;
      if(driver.effects.atk) atke = atke + driver.effects.atk;
      if(driver.effects.ss) ss = ss + driver.effects.ss;
      if(driver.effects.hpr) hpr = hpr + driver.effects.hpr;
      if(driver.effects.dmgb) dmgb = dmgb + driver.effects.dmgb;
      if(frame){
        if(frame.effects.ss) ss = ss + frame.effects.ss;
      if(frame.effects.hpr) hpr = hpr + frame.effects.hpr;
      if(frame.effects.dmgb) dmgb = dmgb + frame.effects.dmgb;
      }
      if(weight){
        if(weight.effects.ss) ss = ss + weight.effects.ss;
      if(weight.effects.hpr) hpr = hpr + weight.effects.hpr;
      if(weight.effects.dmgb) dmgb = dmgb + weight.effects.dmgb;
      }
      let names = collected4[0].content.split("|");
      let imaget;
      if(collected3[0].content) imaget = collected3[0].content;
      if(collected3[0].attachments[0]) imaget = collected3[0].attachments[0].url;
      let bbey = {
        name: "Buddy Bey",
        bbname: names[0] || "That Name",
        type: type,
        image: imaget,
        firstOwner: message.author.id,
        move: names[1] || "That Move",
        stats: {
          atk: atk,
          def: def,
          stamina: stamina
        },
        effects: {
          atk: atke,
          ss: ss,
          dmgb: dmgb,
          hpr: hpr
        },
        level: 1,
        xp: 0
      };
      
      let prompt = new Discord.MessageEmbed()
      .setDescription(`❓ Are you sure that you want to submit your Buddy Bey, ***${bbey.bbname}*** with **Type:** ${bbey.type} and **Special Move:** ${bbey.move}, for approval so it can be used in battles and to show off?`)
      .setColor("#7f7fff")
      .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL)
      .setFooter("Beycord Buddy Bey Kit")
      .setTimestamp();
      let msg2 = await message.channel.createMessage({embed: prompt});
      msg2.addReaction("✅");
      msg2.addReaction("❌");
      let reactions2 = await ReactionHandler.collectReactions(msg2, id => id === message.author.id, { maxMatches: 1, time: 300000 })
      .catch(err => message.channel.createMessage("Prompt cancelled due to timing out."));
      if(reactions2[0].emoji.name === "✅"){
        let error = null;
        let bbs = await db.collection("buddybeys").findOne({_id: "info"});
        let bid = (parseInt(bbs.latestid)+1).toString();
        let approval = new Discord.MessageEmbed()
        .setTitle(bbey.bbname + ` | (#${bid})`)
        .setImage(bbey.image)
        .addField("Type", bbey.type)
        .addField("Special Move", bbey.move)
        .addField("Layer System", "Gatinko")
        .setFooter(`Submitted by ${message.author.username}#${message.author.discriminator} at`)
        .setTimestamp()
        .setColor("#7f7fff");
        if(weight) approval.setThumbnail(weight.image || bbey.image);
        else approval.setThumbnail(bbey.image);
        client.executeWebhook("900348688117952522", "Pks-gG1QLxi5kWuN9xgAOjCjJaapBgZsJPKFwEVMGngXT6heeOVa9KkjqLEg1bth4GiV", {embeds: [approval], embed: approval});
        stats.beyparts.splice(stats.beyparts.indexOf(disc), 1);
        stats.beyparts.splice(stats.beyparts.indexOf(driver), 1);
        if(frame) stats.beyparts.splice(stats.beyparts.indexOf(frame), 1);
        if(weight) stats.beyparts.splice(stats.beyparts.indexOf(weight), 1);
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {beyparts: stats.beyparts, items: stats.items}});
        db.collection("buddybeys").insertOne({_id: bid, bey: bbey, submitter: message.author.id});
        db.collection("buddybeys").updateOne({_id: "info"}, {$set: {latestid: bid}});
        message.channel.createMessage("✅Successfully sent your Buddy Bey for approval. Please be informed that the approval process might take up to a week but trust me it's definitely worth it.");
        return true;
      }else return message.channel.createMessage("Prompt cancelled.")
    }
    else return message.channel.createMessage("Prompt cancelled.");
  }
}

module.exports = BuddyBeyKit;
