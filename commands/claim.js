const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Claim')
  .setDescription("There's nothing to claim, you silly goose. Due to mantainance, the RNG system is currently disabled. \n[Check out our Discord Server!](https://discord.com/invite/42vkvZMv7d)")
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "claim",
  desc: "claim",
}

/*const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let spawn = await db.collection("channels").findOne({_id: message.channel.id}) || {_id: message.channel.id, bey: "nothing", type: "nothing", answer: "number", settings: {spawn: true, dcommands: []}};
  let user = await db.collection("users").findOne({_id: message.author.id});
  if(!user) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  if(spawn.type === "nothing" && spawn.answer === "number") return message.channel.createMessage("Couldn't find any Bey on the floor. Maybe it disappeared? ¯\\_(ツ)_/¯");
  if(!args[0]) return message.reply("please provide the answer to the math question. The calculator isn't gonna work without any input... Right?");
  if(!args[1]) return message.reply("please provide the type of the Bey. A Bey couldn't exist without a type.");
  let manswer = parseInt(args[0]);
  let atype = args[1].toLowerCase();
  if(atype.toLowerCase() === "defence") atype = "defense";
  if(manswer === spawn.answer && atype.toLowerCase() === spawn.type.toLowerCase()){
    let cons = client.beys.get(spawn.bey);
    let rlevel = Math.round(Math.random() * 20);
    if(rlevel == 0) rlevel = 1;
    let bey = new cons(message.author.id);
    bey.level = rlevel;
    bey.xp = (rlevel - 1) * 300;
    if(bey.xp < 0) bey.xp = 0;
    let pchance = Math.round(Math.random() * 8);
    let cmsg = `Congratulations, you got a Level ${bey.level} ${bey.name}! It has been added into your inventory.`;
    let part = client.parts.random();
    if(pchance === 1 && part){
      let partc = new part();
      db.collection("users").updateOne({_id: message.author.id}, {$push: {beyparts: partc}});
      cmsg += ` You also found a ${partc.name} ${partc.type.toLowerCase()} glued onto it. Oh wow, very nice!`
    }
    message.reply(cmsg);
    spawn.type = "nothing";
    spawn.answer = "number";
    spawn.bey = "nothing";
    if(message.channel.gvspawned && message.channel.gvspawned === true) message.channel.gvspawned = false;
    db.collection("channels").updateOne({_id: message.channel.id}, {$set: {type: "nothing", answer: "number", bey: "nothing"}});
    db.collection("users").updateOne({_id: message.author.id}, {$push: {beys: bey}, $set: {xp: user.xp + 3}});
  }else{
    message.reply("awww, you almost got it. Try again, would'cha?");
  }
}

module.exports.help = {
  name: "claim",
  aliases: ["get"],
  desc: "Claim the most recent spawned Bey.",
  usage: "You should see something that looks like this in the spawn embed.\n```1 + 1```\nThat's the Math question applied to that spawn. It will always be a simple sum question.\n\nYou should also know all the types of Beys that exist:\n1) Attack\n2) Defense / Defence\n3) Stamina\n4) Balance\n\nSlam that Math and type knowledge together along with the `claim` command and you will be able to claim a Bey without a sweat! Here's an example:\n\n`;claim 11 attack`\n\nHope you are able to understand it!"
}*/