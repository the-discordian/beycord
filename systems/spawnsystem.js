const Discord = require("discord.js");

module.exports.run = async (message, prefix, db, available, client) => {
  return new Promise(async (resolve, reject) => {
  let spawn;

  let server = await db.collection("guilds").findOne({_id: message.guild.id});
  if(server.redirect !== "nothing") spawn = await db.collection("channels").findOne({_id: server.redirect}) || {_id: message.channel.id, bey: "nothing", type: "nothing", answer: "number", settings: {spawn: true, dcommands: []}};
  else spawn = await db.collection("channels").findOne({_id: message.channel.id}) || {_id: message.channel.id, bey: "nothing", type: "nothing", answer: "number", settings: {spawn: true, dcommands: []}};
  let result = Math.floor(Math.random() * available.length);
  let selected = available[result];
  let cons = client.beys.get(selected);
  let prebey = new cons("1", "1");
  let ok1 = Math.floor(Math.random() * 20);
  let ok2 = Math.floor(Math.random() * 20);
  let answer = ok1 + ok2;
  let sembed = new Discord.MessageEmbed()
  .setTitle("A Bey spawned!")
  .setThumbnail(prebey.image)
  .setDescription(`\`\`\`${ok1} + ${ok2}\`\`\``)
  .setColor("#f90b06")
  .setFooter(`Do ${prefix}help claim for a claiming guide.`)
//  if(client.blackbeys.includes(prebey.name)) sembed.setColor("#000000");
//  if(client.legendarybeys.includes(prebey.name)) sembed.setColor("#cb0faf");
//  if(client.rarebeys.includes(prebey.name)) sembed.setColor("#2a83d5");
//  if(client.commonbeys.includes(prebey.name)) sembed.setColor("#1bf40b");
  spawn.bey = selected;
  spawn.type = prebey.type;
  spawn.answer = answer;
  if(server.redirect !== "nothing"){
    let restchannel = await message.guild.getRESTChannels();
    let rchannel = restchannel.filter(channel => channel.id === server.redirect && channel.type === 0)[0];
    db.collection("channels").updateOne({_id: server.redirect}, {$set:{bey: selected, type: prebey.type, answer: answer}});
    if(rchannel && rchannel.type === 0) rchannel.createMessage({embed:sembed});
  }else{
    db.collection("channels").updateOne({_id: message.channel.id}, {$set:{bey: selected, type: prebey.type, answer: answer}});
    message.channel.createMessage({embed:sembed});
  }
 resolve(true);
});
}

module.exports.help = {
  name: "spawnsystem",
  }