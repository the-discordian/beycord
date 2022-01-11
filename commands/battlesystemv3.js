const Discord = require("discord.js");
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
          let mt =  Math.floor(Math.random() * motto.length);
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
  let row = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageSelectMenu()
    .setCustomId('actionselect')
    .setPlaceholder('Select a move')
    .addOptions([
      {label: "Attack", description: "Decreases the opponent's HP, and decreases your stability.", value: 'attack'},
      {label: "Spin", description: "Increases your stamina.", value: 'spin'},
      {label: "Defend", description: "Increases your stability.", value: 'defend'},
      {label: "Charge", description: "Charges your special move.", value: 'charge'}
    ]).setMaxValues(1))
  let embed = new Discord.MessageEmbed()
  .setTitle(`${member1.effectiveName} <:versus:898767596940308530> ${member2.effectiveName}`)
  .setColor("#7f7fff")
  .setDescription(`Status: **${state}**`)
  .addField(`__**${member1.effectiveName}**__`, `*Level ${opponent1.lvl} ${opponent1.bey.bbname || opponent1.bey.name} | ${opponent1.sd}*\n**HP:** ${Math.round(opponent1.hp)}\n**Stamina:** ${opponent1.stamina.toFixed(1)}\n**Stability:** ${opponent1.stability}%\n**Energy:** ${opponent1.sp}`, true)
  .addField(`__**${member2.effectiveName}**__`, `*Level ${opponent2.lvl} ${opponent2.bey.bbname || opponent2.bey.name} | ${opponent2.sd}*\n**HP:** ${Math.round(opponent2.hp)}\n**Stamina:** ${opponent2.stamina.toFixed(1)}\n**Stability:** ${opponent2.stability}%\n**Energy:** ${opponent2.sp}`, true)
  .setImage(`attachment://${opponent1.id}-${opponent2.id}.png`);

  let battleimage = fs.readFileSync(`/path/to/tempimages/${opponent1.id}-${opponent2.id}.png`);

  let be = await client.createMessage(message.channel.id, {embed:embed, components: [row]}, {file: battleimage, name: `${opponent1.id}-${opponent2.id}.png`}).catch(err => {
    player.collection("users").updateOne({_id: opponent1.id}, {$set: {"states.inBattle": false}});
    player.collection("users").updateOne({_id: opponent2.id}, {$set: {"states.inBattle": false}});
    message.channel.createMessage("I failed to send the battle message! Please make sure I have the permissions to send embedded links and attach files to my messages. Inform a moderator of this server about this if you can't fix it.")
    return;
  });

  if(opponent1.item && opponent1.item.avatarStart) opponent1.item.avatarStart(opponent1, opponent2, logger);
  if(opponent2.item && opponent2.item.avatarStart) opponent2.item.avatarStart(opponent2, opponent1, logger);
  
  let moveChosen1 = false;
  let moveChosen2 = false;
  
  client.on('interactionCreate', interaction => {
    maxtimeouts = 0;
    let player1 = opponent1;
    let player2 = opponent2;
    if(opponent2.id == interaction.member.id){
      player1 = opponent2;
      player2 = opponent1;
    }
    if(interaction.member.id != message.author.id && interaction.member.id != player2.id) return;
    if(((interaction.member.id === message.author.id) && (moveChosen1 === true)) || ((interaction.member.id === player2.id) && moveChosen2 === true)) return;
    // Attack
    if((interaction.data.values[0] === 'attack') && interaction.member.id === message.author.id){
      if(moveChosen1 = false){
      moveChosen1 = true;
      attack(player1, player2, logger, message);
      }
    } else if(interaction.data.values[0] === 'attack' && interaction.member.id === player2.id){
      if(moveChosen2 = false){
      moveChosen2 = true;
      attack(player1, player2, logger, message);
      }
    }
    // Spin
    if(interaction.data.values[1] === 'spin' && interaction.member.id === player2.id){
      if(moveChosen1 = false){
      moveChosen1 = true;
      spin(player1, player2, logger, message);
      }
    } else if(interaction.data.values[1] === 'spin' && interaction.member.id === player2.id){
      if(moveChosen2 = false){
      moveChosen2 = true;
      spin(player1, player2, logger, message);
    }
    }
    // Defend
    if(interaction.data.values[2] === 'defend' && interaction.member.id === player2.id){
      if(moveChosen1 = false){
      moveChosen1 = true;
      defend(player1, player2, logger, message);
      }
    } else if(interaction.data.values[2] === 'defend' && interaction.member.id === player2.id){
      if(moveChosen2 = false){
      moveChosen2 = true;
      defend(player1, player2, logger, message);
      }
    }
    // Charge
    if(interaction.data.values[3] === 'charge' && interaction.member.id === player2.id){
      if(moveChosen1 = false){
      moveChosen1 = true;
      charge(acted, victim, logger, message);
      }
    } else if(interaction.data.values[3] === 'charge' && interaction.member.id === player2.id){
      if(moveChosen1 = false){
      moveChosen2 = true;
      charge(acted, victim, logger, message);
      }
    }
    if(moveChosen1 === true && moveChosen2 === true){
      moveChosen1 = false;
      moveChosen2 = false;
    }
    let embed2 = new Discord.MessageEmbed()
    .setTitle(`${member1.effectiveName} <:versus:898767596940308530> ${member2.effectiveName}`)
    .setColor("#7f7fff")
    .setDescription(`Status: **${state}**`)
    .addField(`__**${member1.effectiveName}**__`, `*Level ${opponent1.lvl} ${opponent1.bey.bbname || opponent1.bey.name} | ${opponent1.sd}*\n**HP:** ${Math.round(opponent1.hp)}\n**Stamina:** ${opponent1.stamina.toFixed(1)}\n**Stability:** ${opponent1.stability}%\n**Energy:** ${opponent1.sp}`, true)
    .addField(`__**${member2.effectiveName}**__`, `*Level ${opponent2.lvl} ${opponent2.bey.bbname || opponent2.bey.name} | ${opponent2.sd}*\n**HP:** ${Math.round(opponent2.hp)}\n**Stamina:** ${opponent2.stamina.toFixed(1)}\n**Stability:** ${opponent2.stability}%\n**Energy:** ${opponent2.sp}`, true)
    .setImage(`attachment://${opponent1.id}-${opponent2.id}.png`);
    be.edit({embed:embed2, components: [row]}, {file: battleimage, name: `${opponent1.id}-${opponent2.id}.png`});
  // IDK????!!!!
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
          //a.execute(opponent1, opponent2, logger);
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
        //b.execute(opponent2, opponent2, logger);
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
  //if(!be.ended) chooseSpecial(logger, client, message);
  function end(winner, loser, finish, player){
    be.ended = true;
    if(finish !== "time-out" && finish !== "cancel"){
    let bchance = Math.floor(Math.random() * 100);

    let lvlupquest = winner.stats.quests.filter(quest => quest.name === "Win3Battles");
    if(lvlupquest[0]){
      lvlupquest.forEach(que => {
        let foundindex = winner.stats.quests.indexOf(que);
        winner.stats.quests[foundindex].progress = winner.stats.quests[foundindex].progress + 1;
        if(winner.stats.quests[foundindex].progress === 3) winner.stats.quests[foundindex].completed = true;
      });
    }

    let lvlupquest2 = winner.stats.quests.filter(quest => quest.name === "Win5battles");
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
      if(loser.id !== "827343111234519040") loser.stats.beys[loser.stats.main].broken = true;
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

    message.channel.createMessage(`<@${winner.id}> won the battle with a ${finish} finish!`);
    let webhookembed = new Discord.MessageEmbed()
    .setTitle(`${winner.username}#${winner.discriminator} (${winner.id}) won a battle with ${loser.username}#${loser.discriminator} (${loser.id})!`)
    .setDescription(`It was a ${finish} finish.`)
    .setTimestamp()
    .setColor("#ff7600");
    client.executeWebhook("900347913417400320", "5FSgUhDZ1e6FwF3oUaTNMfQmiDESkUiTV1__Jp9_53xAVxTulXlxuE1Y0h1p2AFPn9GS", {embeds: [webhookembed]}).catch(err => {console.error(err)});
    return;
  }
  if(moveChosen1 === true && moveChosen2 === false) state = `Waiting on **<@${opponent2.id}>**...`;
  if(moveChosen1 === false && moveChosen2 === true) state = `Waiting on **<@${message.author.id}>**...`;
  if(moveChosen1 === false && moveChosen2 === false) state = "Select a move!";
  if(moveChosen1 === true && moveChosen2 === true) state = "Loading...";
    // IDK????!!!
  })
}

async function attack(acted, victim, logger, message){
  return new Promise(async (resolve, reject) => {
  let bchance = Math.round(Math.random() * 100);
  let member1 = await message.guild.getRESTMember(acted.id);
  let member2 = await message.guild.getRESTMember(victim.id);
  if(acted.atk < 0) acted.atk = 1;
  let dmg = acted.atk;
  victim.hp -= dmg;
  //logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} dealt ${dmg} damage.`);
  if(bchance < 26 && acted.bey.type === "Attack" && acted.effectAllowed === true){
    let bleeddmg = setInterval(() => {
      victim.hp -= Math.round(((acted.lvl-1)*0.09)+1);
      victim.stability -= 1;
    }, 2000)
    setTimeout(() => {
      clearInterval(bleeddmg);
    }, 15000)
    //logger.add("The hit was fatal! The opponent might need some time to regain stability.")
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
    //logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} blocked!`);
    if(rchance < 51 && acted.bey.type === "Defense" && victim.move === "attack" && acted.effectAllowed === true){
    acted.hp = acted.hp + victim.atk;
    victim.hp = victim.hp - victim.atk;
    //logger.add("Damage reflected!");
    acted.effectAllowed = false;
    setTimeout(() => {
      acted.effectAllowed = true;
    }, 180000);
  }
  resolve(true);
  });
}

async function spin(acted, victim, logger, message){
  if(acted.bey.type === "Attack") acted.stamina = acted.stamina + 3
  else if(acted.bey.type === "Balance") acted.stamina = acted.stamina + 2.6
  else acted.stamina = acted.stamina + 2;
}

async function charge(acted, victim, logger, message){
  return new Promise(async (resolve, reject) => {
    let member1 = await message.guild.getRESTMember(acted.id);
    acted.sp++;
    //logger.add(`[${member1.effectiveName}] ${acted.bey.bbname || acted.bey.name} charged its energy.`);
    resolve(true);
  })
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
  opponent1.bey = new (client.beys.get(stats1.beys[stats1.main].name))(opponent1.id, stats1.beys[stats1.main].id,stats1.beys[stats1.main]);
  opponent2.bey = new (client.beys.get(stats2.beys[stats2.main].name))(opponent2.id, stats2.beys[stats2.main].id,stats2.beys[stats2.main]);
  opponent1.lvl = stats1.beys[stats1.main].level;
  opponent2.lvl = stats2.beys[stats2.main].level;
  if(opponent2.id === "827343111234519040"){
    opponent2.lvl = opponent1.lvl;
    stats2.beys[stats2.main].level = opponent1.lvl;
    opponent2.bey = opponent1.bey;
  }
  let jimps = [];
  let versus = "https://media.discordapp.net/attachments/859836946510643210/860584653463617566/versus.png?width=487&height=498";
  let chance = Math.round(Math.random() * 100);
  if(chance < 11) versus = "https://media.discordapp.net/attachments/859836946510643210/860584641245347901/menacing2.png";
  let images = ["https://cdn.discordapp.com/attachments/859836946510643210/898329244290142288/PicsArt_10-14-04.59.27.png",versus,opponent1.bey.image,opponent2.bey.image]; 
  for(var i = 0; i < images.length; i++) jimps.push(jimp.read(images[i]));
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
  if(opponent1.bey.type === "Balance") opponent1.stamina = opponent1.stamina + 1;
  if(opponent2.bey.type === "Balance") opponent2.stamina = opponent2.stamina + 1;
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
  if(stats1.beys[stats1.main].attached) opponent1.item = new (client.items.get(stats1.beys[stats1.main].attached.name))(stats1.beys[stats1.main].attached);
  if(stats2.beys[stats2.main].attached) opponent2.item = new (client.items.get(stats2.beys[stats2.main].attached.name))(stats2.beys[stats2.main].attached);
  if(stats1.launcher !== "default") opponent1.launcher = new (client.items.get(stats1.launcher.name))(stats1.launcher);
  if(stats2.launcher !== "default") opponent2.launcher = new (client.items.get(stats2.launcher.name))(stats2.launcher);
  let logger = new Logger();
  countdown(message, opponent1, opponent2, player, prefix, client, msg);
}

module.exports.help = {
    name: "battlesystemv3",
    aliases: []
}  