const Discord = require("discord.js");
const ReactionHandler = require("eris-reactions");
const jimp = require("jimp");
const fs = require("fs");
const Logger = require("./Logger.js");

async function countdown(message, opponent1, opponent2, player, prefix, client, msg, logger){
  setTimeout(() => {
    msg.edit("3");
    setTimeout(() => {
      msg.edit("2");
      setTimeout(() => {
        msg.edit("1");
        setTimeout(() => {
          let motto = ["**Let it rip!**", "**Go shoot!**"];
          let mt =  Math.floor(Math.random() * 2);
          msg.edit(motto[mt]);
          awaitMoves(message, opponent1, opponent2, player, prefix, client, logger);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

async function awaitMoves(message, opponent1, opponent2, player, prefix, client, logger){
    let member1 = await message.guild.getRESTMember(opponent1.id);
    let member2 = await message.guild.getRESTMember(opponent2.id);

    let paused = false;
    let state = "Began";

    let embed = new Discord.MessageEmbed()
    .setAuthor(member1.effectiveName, opponent1.avatarURL)
    .setFooter(member2.effectiveName, opponent2.avatarURL)
    .setColor("#7f7fff")
    .setDescription(`Status: **${state}** [Battle Instructions](https://workshop.overcold.xyz/game-guides/battling)\n__**Logs**__\n${logger.logs.join("\n")}`)
    .addField(`__**${member1.effectiveName}**__`, `***${opponent1.bey.bbname || opponent1.bey.name}***\nLevel ${opponent1.lvl}\n**HP:** ${Math.round(opponent1.hp)}\n**Stamina:** ${opponent1.stamina.toFixed(1)}\n**Stability:** ${opponent1.stability}%\n**Energy:** ${opponent1.sp}\n**Type:** ${opponent1.bey.type}\n**SD:** ${opponent1.sd}`, true)
    .addField(`__**${member2.effectiveName}**__`, `***${opponent2.bey.bbname || opponent2.bey.name}***\nLevel ${opponent2.lvl}\n**HP:** ${Math.round(opponent2.hp)}\n**Stamina:** ${opponent2.stamina.toFixed(1)}\n**Stability:** ${opponent2.stability}%\n**Energy:** ${opponent2.sp}\n**Type:** ${opponent2.bey.type}\n**SD:** ${opponent2.sd}`, true)
    .setImage(`attachment://${opponent1.id}-${opponent2.id}.png`);

    let battleimage = fs.readFileSync(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`);

    let be = await client.createMessage(message.channel.id, {embed:embed}, {file: battleimage, name: `${opponent1.id}-${opponent2.id}.png`}).catch(err => {
        player.collection("users").updateOne({_id: opponent1.id}, {$set: {"states.inBattle": false}});
        player.collection("users").updateOne({_id: opponent2.id}, {$set: {"states.inBattle": false}});
        message.channel.createMessage("I failed to send the battle message! Please make sure I have the permissions to send embedded links and attach files to my messages. Inform a moderator of this server about this if you can't fix it.")
        return;
    });

    be.addReaction("🗡️");
    be.addReaction("🛡️");
    be.addReaction("🔄");
    be.addReaction("✨");
    be.addReaction("❌");

    if(opponent1.item && opponent1.item.avatarStart){
      opponent1.item.avatarStart(opponent1, opponent2, logger);
    }
    if(opponent2.item && opponent2.item.avatarStart){
      opponent2.item.avatarStart(opponent2, opponent1, logger);
    }
    
    let reset = setInterval(() => {
        let embed2 = new Discord.MessageEmbed()
        .setAuthor(member1.effectiveName, opponent1.avatarURL)
        .setFooter(member2.effectiveName, opponent2.avatarURL)
        .setColor("#7f7fff")
        .setDescription(`Status: **${state}** [Battle Instructions](https://workshop.overcold.xyz/game-guides/battling)\n__**Logs**__\n${logger.logs.join("\n")}`)
        .addField(`__**${member1.effectiveName}**__`, `***${opponent1.bey.bbname || opponent1.bey.name}***\nLevel ${opponent1.lvl}\n**HP:** ${Math.round(opponent1.hp)}\n**Stamina:** ${opponent1.stamina.toFixed(1)}\n**Stability:** ${opponent1.stability}%\n**Energy:** ${opponent1.sp}\n**Type:** ${opponent1.bey.type}\n**SD:** ${opponent1.sd}`, true)
        .addField(`__**${member2.effectiveName}**__`, `***${opponent2.bey.bbname || opponent2.bey.name}***\nLevel ${opponent2.lvl}\n**HP:** ${Math.round(opponent2.hp)}\n**Stamina:** ${opponent2.stamina.toFixed(1)}\n**Stability:** ${opponent2.stability}%\n**Energy:** ${opponent2.sp}\n**Type:** ${opponent2.bey.type}\n**SD:** ${opponent2.sd}`, true)
        .setImage(`attachment://${opponent1.id}-${opponent2.id}.png`);
        be.edit({embed:embed2}, {file: battleimage, name: `${opponent1.id}-${opponent2.id}.png`});
    }, 2000);

    let resetstats = setInterval(() => {
        opponent1.atk = 20;
        opponent2.atk = 20;
        if(opponent1.sd === "Right") opponent1.atk = opponent1.atk + 2;
        if(opponent2.sd === "Right") opponent2.atk = opponent2.atk + 2;
        let ratk1 = Math.floor(Math.random() * 2);
        let ratk2 = Math.floor(Math.random() * 2);
        opponent1.atk = opponent1.atk + ratk1;
        opponent2.atk = opponent2.atk + ratk2;
        opponent1.atk = Math.round(opponent1.atk + ((opponent1.lvl-1) * 0.4));
        opponent2.atk = Math.round(opponent2.atk + ((opponent2.lvl-1) * 0.4));
        if(opponent1.bey.type === "Defense") opponent2.atk = Math.round((opponent2.atk/100)*80);
        if(opponent2.bey.type === "Defense") opponent1.atk = Math.round((opponent1.atk/100)*80);
        if(opponent1.bey.type === "Attack") opponent1.atk = Math.round((opponent1.atk/100)*120);
        if(opponent2.bey.type === "Attack") opponent2.atk = Math.round((opponent2.atk/100)*120);
        if(opponent1.bey.type === "Balance"){
            opponent2.atk = Math.round((opponent2.atk/100)*90);
            opponent1.atk = Math.round((opponent1.atk/100)*110);
        }
        if(opponent2.bey.type === "Balance"){
            opponent2.atk = Math.round((opponent2.atk/100)*110);
            opponent1.atk = Math.round((opponent1.atk/100)*90);
        }
    }, 5000);

    let passive = setInterval(async () => {
      if(opponent1.stability > 100) opponent1.stability = 100;
      if(opponent2.stability > 100) opponent2.stability = 100;
      if(opponent1.item && opponent1.item.avatarPassive){
        opponent1.item.avatarPassive(opponent1, opponent2, logger);
      }
      if(opponent2.item && opponent2.item.avatarPassive){
        opponent2.item.avatarPassive(opponent2, opponent1, logger);
      }
      if(opponent1.launcher && opponent1.launcher.boost){
        opponent1.launcher.boost(opponent1, opponent2, logger);
      }
      if(opponent2.launcher && opponent2.launcher.boost){
        opponent2.launcher.boost(opponent2, opponent1, logger);
      }
      if((paused || (!opponent1.chosen || !opponent2.chosen)) && !be.ended) return;
        opponent1.bey.passives.forEach(async a => {
          let met = false;
          try{
            met = await a.requires(opponent1, opponent2, logger);
          }catch(err){
            console.error(err);
            met = false;
          }
          if(met && !a.onCD){
            try{
              a.execute(opponent1, opponent2, logger);
            }catch(err){
              console.error(err);
            }
            opponent1.bey.passives[opponent1.bey.passives.indexOf(a)].onCD = true;
            setTimeout(() => {
              opponent1.bey.passives[opponent1.bey.passives.indexOf(a)].onCD = false;
            }, a.cd);
          }
        });
        opponent2.bey.passives.forEach(async b => {
          let met2 = false;
          try{
            met2 = await b.requires(opponent2, opponent1, logger);
          }catch(err){
            console.error(err);
            met2 = false;
          }
          if(met2 && !b.onCD){
            b.execute(opponent2, opponent2, logger);
            opponent2.bey.passives[opponent2.bey.passives.indexOf(b)].onCD = true;
            setTimeout(() => {
              opponent2.bey.passives[opponent2.bey.passives.indexOf(b)].onCD = false;
            }, b.cd);
          }
      });
      opponent1.bey.modes.forEach(async cn => {
        let c = opponent1.bey[cn];
        let met3 = false;
        try {
          met3 = await c.requires(opponent1, opponent2, logger);
        }catch(err){
          console.error(err);
          met3 = false;
        }
        if(met3 && !c.active){
          c.boost(opponent1, opponent2, logger);
        }
      });
      opponent2.bey.modes.forEach(async dn => {
        let d = opponent2.bey[dn];
        let met4 = false;
        try {
          met4 = await d.requires(opponent2, opponent1, logger);
        }catch(err){
          console.error(err);
          met4 = false;
        }
        if(met4 && !d.active){
          d.boost(opponent2, opponent1, logger);
        }
      });
      opponent1.stamina -= 1.2;
      opponent2.stamina -= 1.2;
      opponent1.stability -= 8;
      opponent2.stability -= 8;
      switch(opponent1.bey.type){
        case "Attack":
          opponent1.stamina -= 0.3;
          opponent1.stability -= 2;
        break;
        case "Balance":
          opponent1.stamina -= 0.2;
          opponent1.stability -= 1;
        break;
      }
      switch(opponent2.bey.type){
        case "Attack":
          opponent2.stamina -= 0.3;
          opponent2.stability -= 2;
        break;
        case "Balance":
          opponent2.stamina -= 0.2;
          opponent2.stability -= 1;
        break;
      }
    }, 3000);

    let checkdeath = setInterval(() => {
      if(opponent1.stability <= 0){
        fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
          if(err) console.log(err);
        });
        return end(opponent2, opponent1, "ring-out", player);
      }
      if(opponent1.stamina <= 0){
        fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
          if(err) console.log(err);
        });
        return end(opponent2, opponent1, "survivor", player);
      }
      if(opponent1.hp <= 0){
        fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
          if(err) console.log(err);
        });
        return end(opponent2, opponent1, "burst", player);
      }
      if(opponent2.stability <= 0){
        fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
          if(err) console.log(err);
        });
        return end(opponent1, opponent2, "ring-out", player);
      }
      if(opponent2.stamina <= 0){
        fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
          if(err) console.log(err);
        });
        return end(opponent1, opponent2, "survivor", player);
      }
      if(opponent2.hp <= 0){
        fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
          if(err) console.log(err);
        });
        return end(opponent1, opponent2, "burst", player);
      }
    }, 1000);

    let specialChoose = setTimeout(() => {
      if(!be.ended) chooseSpecial(logger, client, message);
    }, 8000);

    async function chooseMove(){
      if((paused || (!opponent1.chosen || !opponent2.chosen)) && !be.ended) return setTimeout(() => chooseMove(), 1000);
      let maxtimeouts = 0;
      let respond = await ReactionHandler.collectReactions(be, userid => userid == opponent1.id || userid == opponent2.id, {time: 60000, maxMatches: 1});
      if(respond[0]){
        maxtimeouts = 0;
        let player1 = opponent1;
        let player2 = opponent2;
        if(opponent2.id == respond[0].userID){
          player1 = opponent2;
          player2 = opponent1;
        }
        let emoji = respond[0].emoji.name;
        if(!player1.moveChosen){
        if(emoji === "🗡️") fight(player1, player2, logger, message);
        if(emoji === "🛡️") defend(player1, player2, logger, message);
        if(emoji === "🔄") spin(player1, player2, logger, message);
        if(emoji === "✨") charge(player1, player2, logger, message);
        if(emoji === "❌"){
          fs.unlink(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, (err) => {
            if(err) console.log(err);
          });
          end(player2, player1, "cancel", player);
        }
        player1.moveChosen = true;
        setTimeout(() => {
          player1.moveChosen = false;
        }, 1000);
      }
    }
    if(!be.ended){
      maxtimeouts++;
      if(maxtimeouts >= 3) return end(opponent1, opponent2, "time-out", player);
      chooseMove();
    }
  }

  function chooseSpecial(logger, client, message){
    paused = true;
    opponent1.chosen = false;
    opponent2.chosen = false;
    state = "Optional rest / Choose a special move";
    special(opponent1, opponent2, logger, client, message, chooseSpecial);
    special(opponent2, opponent1, logger, client, message, chooseSpecial);
    setTimeout(() => {
      paused = false;
      if(state !== "Continuing" && !be.ended){
        opponent1.stamina += 2;
        opponent2.stamina += 2;
        state = "Continuing";
        setTimeout(() => {
          if(!be.ended) chooseSpecial(logger, client, message);
        }, 8000);
      }
    }, 15000);
  }

  function end(winner, loser, finish, player){
    be.ended = true;
    if(finish !== "time-out" && finish !== "cancel"){
    let bchance = Math.floor(Math.random() * 100);

    let lvlupquest = winner.stats.quests.filter(quest => quest.name === "Win 3 battles");
    if(lvlupquest[0]){
      lvlupquest.forEach(que => {
        let foundindex = winner.stats.quests.indexOf(que);
        winner.stats.quests[foundindex].progress = winner.stats.quests[foundindex].progress + 1;
        if(winner.stats.quests[foundindex].progress === 3) winner.stats.quests[foundindex].completed = true;
      });
    }

    let lvlupquest2 = winner.stats.quests.filter(quest => quest.name === "Win 5 battles");
    if(lvlupquest2[0]){
      lvlupquest2.forEach(que => {
        let foundindex = winner.stats.quests.indexOf(que);
        winner.stats.quests[foundindex].progress = winner.stats.quests[foundindex].progress + 1;
        if(winner.stats.quests[foundindex].progress === 5) winner.stats.quests[foundindex].completed = true;
      });
    }

    if(!winner.stats.won.includes(loser.id)){
      winner.wins = winner.wins + 1;
      winner.stats.won.push(loser.id);
    }

    if(bchance <= 5){
      if(loser.id !== "BOT ID") loser.stats.beys[loser.stats.main].broken = true;
      player.collection("users").updateOne({_id: winner.id}, {$set: {"states.inBattle": false, wins: winner.wins, coins: winner.valtz + 80, xp: winner.xp + 20, quests: winner.stats.quests, won: winner.stats.won}});
      player.collection("users").updateOne({_id: loser.id}, {$set: {beys: loser.stats.beys, "states.inBattle": false}});
    }else{
      player.collection("users").updateOne({_id: winner.id}, {$set: {"states.inBattle": false, coins: winner.valtz + 80, xp: winner.xp + 20, wins: winner.wins, quests: winner.stats.quests, won: winner.stats.won}});
      player.collection("users").updateOne({_id: loser.id}, {$set: {"states.inBattle": false, xp: loser.xp + 8}});
    }
  }else{
    player.collection("users").updateOne({_id: winner.id}, {$set: {"states.inBattle": false}});
    player.collection("users").updateOne({_id: loser.id}, {$set: {"states.inBattle": false}});
  }

    clearInterval(reset);
    clearInterval(resetstats);
    clearInterval(passive);
    clearInterval(checkdeath);
    clearTimeout(specialChoose);

    message.channel.createMessage(`<@${winner.id}> won the battle with a ${finish} finish!`);
    let webhookembed = new Discord.MessageEmbed()
    .setTitle(`${winner.username}#${winner.discriminator} (${winner.id}) won a battle with ${loser.username}#${loser.discriminator} (${loser.id})!`)
    .setDescription(`It was a ${finish} finish.`)
    .setTimestamp()
    .setColor("#ff7600");
    client.executeWebhook("ID", "TOKEN", {embeds: [webhookembed]}).catch(err => {console.error(err)});
    return;
  }
  chooseMove();
}

async function fight(acted, victim, logger, message){
    return new Promise(async (resolve, reject) => {
    let bchance = Math.round(Math.random() * 100);
    let member1 = await message.guild.getRESTMember(acted.id);
    let member2 = await message.guild.getRESTMember(victim.id);
    if(acted.atk < 0) acted.atk = 1;
    let dmg = acted.atk;
    if(acted.bey.ZaWarudo && acted.bey.ZaWarudo.active == true) dmg *= 2;
    victim.hp -= dmg;
    logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} dealt ${dmg} damage.`);
    if(bchance < 26 && acted.bey.type === "Attack" && acted.effectAllowed === true){
      let bleeddmg = setInterval(() => {
        victim.hp -= Math.round(((acted.lvl-1)*0.09)+1);
        victim.stability -= 1;
      }, 2000)
      setTimeout(() => {
        clearInterval(bleeddmg);
      }, 15000)
      logger.add("The hit was fatal! The opponent might need some time to regain stability.")
      acted.effectAllowed = false;
      setTimeout(() => {
        acted.effectAllowed = true;
      }, 180000);
    }
    resolve(true);
    });
  }
  
  async function defend(acted, victim, logger, message){
    return new Promise(async (resolve, reject) => {
      let rchance = Math.round(Math.random() * 100);
      let member1 = await message.guild.getRESTMember(acted.id);
      let member2 = await message.guild.getRESTMember(victim.id);
      victim.atk = Math.round((victim.atk/100)*40);
      acted.stability += 10;
      if(acted.stability > 100) acted.stability = 100;
      logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} blocked!`);
      if(rchance < 51 && acted.bey.type === "Defense" && victim.move === "fight" && acted.effectAllowed === true){
      acted.hp = acted.hp + victim.atk;
      victim.hp = victim.hp - victim.atk;
      logger.add("Damage reflected!");
      acted.effectAllowed = false;
      setTimeout(() => {
        acted.effectAllowed = true;
      }, 180000);
    }
    resolve(true);
    });
  }
  
  async function spin(acted, victim, logger, message){
    return new Promise(async (resolve, reject) => {
      let hchance = Math.round(Math.random() * 100);
    let member1 = await message.guild.getRESTMember(acted.id);
    if(acted.bey.type === "Attack") acted.stamina = acted.stamina + 3
    else if(acted.bey.type === "Balance") acted.stamina = acted.stamina + 2.6
    else acted.stamina = acted.stamina + 2;
    if(acted.bey.ZaWarudo && acted.bey.ZaWarudo.active == true) acted.stamina += 1;
    logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} spun more. Stamina is increased by 1 and will retain for 1 round.`)
    if(hchance < 26 && acted.bey.type === "Stamina" && acted.effectAllowed === true){
      acted.hp = acted.hp + victim.atk;
      logger.add(`${victim.atk} hitpoints healed from spinning.`);
      acted.effectAllowed = false;
      setTimeout(() => {
        acted.effectAllowed = true;
      }, 180000);
    }
    resolve(true);
    });
  }

  async function charge(acted, victim, logger, message){
    return new Promise(async (resolve, reject) => {
      let member1 = await message.guild.getRESTMember(acted.id);
      acted.sp++;
      if(acted.bey.ZaWarudo && acted.bey.ZaWarudo.active == true) acted.sp++;
      logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} charged its energy.`);
      resolve(true);
    })
  }
  
  async function special(acted, victim, logger, client, message, chooseSpecial){
    return new Promise(async (resolve, reject) => {
      let member1 = await message.guild.getRESTMember(acted.id);
      let member2 = await message.guild.getRESTMember(victim.id);
      let dmchannel = await client.getDMChannel(acted.id);
      let reqmet = [1];
      let tochoose = "**[1]** Charge ✅\n";
      acted.bey.specials.forEach(move => {
        let usable = false;
        try{
          usable = move.requires(acted, victim, logger);
        }catch(err){
          console.error(err);
          usable = false;
        }
        let emj = "❌";
        if(usable){
          emj = "✅";
          reqmet.push(acted.bey.specials.indexOf(move)+2);
        }
        tochoose += `**[${acted.bey.specials.indexOf(move)+2}]** ${move.name} ${emj}\n`;
      });
      let menu = new Discord.MessageEmbed()
      .setColor("#cb00ff")
      .setDescription(tochoose)
      .setAuthor(`${acted.username}#${acted.discriminator}`, acted.avatarURL)
      let menumsg = await message.channel.createMessage({embed: menu})
      .then(msg => {
        message.channel.awaitMessages(test => test.author.id == acted.id && reqmet.includes(parseInt(test.content.trim())), {maxMatches: 1, time: 15000}).then(spmove => {
          acted.chosen = true;
          if(acted.chosen && victim.chosen && !be.ended){
            paused = false;
            state = "Continuing";
            acted.stamina += 2;
            victim.stamina += 2;
            setTimeout(() => {
              if(!be.ended) chooseSpecial(logger, client, message);
            }, 8000);
          }
          if(spmove[0].content.trim() == 1){
            acted.sp += 1;
            logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} charged its energy.`);
          }else{
            try{
              acted.bey.specials[parseInt(spmove[0].content.trim())-2].execute(acted, victim, logger);
            }catch(error){
              console.error(error);
            }
          }
          menumsg.delete().catch(err => console.log(err));
          spmove[0].delete().catch(err => console.log(err));
        }).catch(err => {
  
        });
      });
      resolve(true);
  });
}

module.exports.run = async (client, message, args, player, prefix, opponent1, opponent2, msg) => {
    let stats1 = await player.collection("users").findOne({_id: opponent1.id});
    let stats2 = await player.collection("users").findOne({_id: opponent2.id});
    opponent1.hp = 100;
    opponent2.hp = 100;
    opponent1.move = "";
    opponent2.move = "";
    opponent1.atk = 20;
    opponent2.atk = 20;
    opponent1.stamina = 3;
    opponent2.stamina = 3;
    opponent1.stability = 100;
    opponent2.stability = 100;
    opponent1.sp = 0;
    opponent2.sp = 0;
    opponent1.sd = stats1.beys[stats1.main].sd || "Right";
    opponent2.sd = stats2.beys[stats2.main].sd || "Right";
    if(stats1.beys[stats1.main].name === "Guardian Kerbeus Red Ver. <:haoyunshu:669481031400816650>") stats1.beys[stats1.main].name = "Guardian Kerbeus Red Ver. HYS";
    if(stats2.beys[stats2.main].name === "Guardian Kerbeus Red Ver. <:haoyunshu:669481031400816650>") stats2.beys[stats2.main].name = "Guardian Kerbeus Red Ver. HYS";
    opponent1.bey = new (client.beys.get(stats1.beys[stats1.main].name))(opponent1.id, stats1.beys[stats1.main].id,stats1.beys[stats1.main]);
    opponent2.bey = new (client.beys.get(stats2.beys[stats2.main].name))(opponent2.id, stats2.beys[stats2.main].id,stats2.beys[stats2.main]);
    opponent1.lvl = stats1.beys[stats1.main].level;
    opponent2.lvl = stats2.beys[stats2.main].level;
    if(opponent2.id === "BOT ID"){
      opponent2.lvl = opponent1.lvl;
      stats2.beys[stats2.main].level = opponent1.lvl;
      opponent2.bey = opponent1.bey;
    }

    let jimps = [];
    let versus = "https://media.discordapp.net/attachments/859836946510643210/860584653463617566/versus.png?width=487&height=498";
    let chance = Math.round(Math.random() * 100);
    if(chance < 11) versus = "https://media.discordapp.net/attachments/859836946510643210/860584641245347901/menacing2.png";
    let images = ["https://media.discordapp.net/attachments/859836946510643210/863037673915416617/battle-background_1.png?width=1920&height=1080",versus,opponent1.bey.image,opponent2.bey.image]; 
    for(var i = 0; i < images.length; i++){
      jimps.push(jimp.read(images[i]));
    }
    Promise.all(jimps).then(data => {
      return Promise.all(jimps);
    }).then(async data => {
      data[2].resize(700,700);
      data[3].resize(700,700);
      data[1].resize(300,300);
      data[0].composite(data[2], 100, 240);
      data[0].composite(data[3], 1150, 240);
      data[0].composite(data[1], 830, 415);
      data[0].write(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`, () => {
        console.log("Image written!")
      });
    });
    let health1 = (stats1.beys[stats1.main].level-1) * 9.1;
    let stamina1 = (stats1.beys[stats1.main].level-1) * 0.051;
    let health2 = (stats2.beys[stats2.main].level-1) * 9.1;
    let stamina2 = (stats2.beys[stats2.main].level-1) * 0.051;
    opponent1.hp = Math.floor(opponent1.hp + health1);
    opponent1.stamina = Math.floor(opponent1.stamina + stamina1);
    opponent2.hp = Math.floor(opponent2.hp + health2);
    opponent2.stamina = Math.floor(opponent2.stamina + stamina2);
    if(opponent1.stamina > 10) opponent1.stamina = 10;
    if(opponent2.stamina > 10) opponent2.stamina = 10;
    if(opponent1.hp > 1000) opponent1.hp = 1000;
    if(opponent2.hp > 1000) opponent2.hp = 1000;
    if(opponent1.bey.type === "Stamina") opponent1.stamina = opponent1.stamina + 2;
    if(opponent2.bey.type === "Stamina") opponent2.stamina = opponent2.stamina + 2;
    if(opponent1.bey.type === "Balance"){
      opponent1.stamina = opponent1.stamina + 1;
    }
    if(opponent2.bey.type === "Balance"){
      opponent2.stamina = opponent2.stamina + 1;
    }
    if(opponent1.sd === "Right") opponent1.atk = opponent1.atk + 2;
    if(opponent1.sd === "Left") opponent1.stamina = opponent1.stamina + 1;
    if(opponent2.sd === "Right") opponent2.atk = opponent2.atk + 2;
    if(opponent2.sd === "Left") opponent2.stamina = opponent2.stamina + 1;
    opponent1.maxstamina = opponent1.stamina;
    opponent2.maxstamina = opponent2.stamina;
    opponent1.maxhp = opponent1.hp;
    opponent2.maxhp = opponent2.hp;
    opponent1.wins = stats1.wins;
    opponent2.wins = stats2.wins;
    opponent1.xp = stats1.xp;
    opponent2.xp = stats2.xp;
    opponent1.valtz = stats1.coins;
    opponent2.valtz = stats2.coins;
    opponent1.stats = stats1;
    opponent2.stats = stats2;
    opponent1.effectAllowed = true;
    opponent2.effectAllowed = true;
    opponent1.atk = Math.round(opponent1.atk + ((opponent1.lvl-1) * 0.4));
    opponent2.atk = Math.round(opponent2.atk + ((opponent2.lvl-1) * 0.4));
    opponent1.pmessage = message;
    opponent2.pmessage = message;
    opponent1.moveChosen = false;
    opponent2.moveChosen = false;
    opponent1.chosen = true;
    opponent2.chosen = true;
    if(stats1.beys[stats1.main].attached){
      opponent1.item = new (client.items.get(stats1.beys[stats1.main].attached.name))(stats1.beys[stats1.main].attached);
    }
    if(stats2.beys[stats2.main].attached){
      opponent2.item = new (client.items.get(stats2.beys[stats2.main].attached.name))(stats2.beys[stats2.main].attached);
    }
    if(stats1.launcher !== "default"){
      opponent1.launcher = new (client.items.get(stats1.launcher.name))(stats1.launcher);
    }
    if(stats2.launcher !== "default"){
      opponent2.launcher = new (client.items.get(stats2.launcher.name))(stats2.launcher);
    }
    let logger = new Logger();
    countdown(message, opponent1, opponent2, player, prefix, client, msg, logger);
  }
  module.exports.help = {
    name: "battlesystem"
     }  