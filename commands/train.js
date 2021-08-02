const Discord = require("discord.js");
const last = [];

module.exports.run = async (client, message, args, prefix, player, db) => {
  let time = (15 * 60 * 1000);
  let questchance = Math.round(Math.random() * 2);
  const now = new Date();
  if(!last[message.author.id]) last[message.author.id] = 0;
  if(now - last[message.author.id] < time){
    let remaining = Math.round(((time) - (now - last[message.author.id]))/1000/60);
    return message.reply(`the cooldown is still active. Please try again after **${remaining} minute(s)**.`);
  }
  let stats = await db.collection("users").findOne({_id: message.author.id});
  const act = ["hit some rocks with your Bey", "discovered a new launching technique", "did some push-ups", "battled your friends", "did some sit-ups", "sliced some pizzas by launching your Bey sideways", "threw your Bey down Mt. Everest to train it's durability", "charged up your legs and ran on the wall to train your Rush Launch move", "climbed Mt. Everest", "did 100 push-ups, 100 sit-ups, 100 squats and ran 10 km", "sat around menacingly", "fought off two giant bears", "launched 100 times", "did some epic backflips", "played chess to strengthen your strategy skills"];
  const balance = [1,2,3,4,5,6,7,8,9,10,11,12];
  let rno = Math.floor(Math.random() * balance.length);
  let ract = Math.floor(Math.random() * act.length);
  let embed = new Discord.MessageEmbed()
  .setTitle(`You ${act[ract]} and got ${balance[rno]} EXPs.`)
  .setColor("#50c878");
  last[message.author.id] = now;
  if(questchance < 36 && stats.qslots > stats.quests.length){
    let quest = client.quests.random();
    let newquest = new quest();
    stats.quests.push(newquest);
    embed.setDescription(`A quest acquired! Do \`${prefix}quests\` to check it.`)
  }
  db.collection("users").updateOne({_id: message.author.id}, {$set: {xp: stats.xp + balance[rno], quests: stats.quests}});
  message.channel.createMessage({embed:embed});
}

module.exports.help = {
  name: "train",
  aliases: ["t"]
}