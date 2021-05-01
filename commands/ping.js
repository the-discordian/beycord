const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db, cmdt) => {
  let now = new Date();
  client.createMessage(message.channel.id, ':ping_pong: **PONG!**')
  .then(async msg => {
    let dbnow = new Date();
    let stats = await db.collection("users").findOne({_id: message.author.id});
    let newnow = new Date();
    let dbping = newnow - dbnow;
    let cmdt = new Date();
    let pembed = new Discord.MessageEmbed()
    .setTitle("Pings")
    .setColor("#7f7fff")
    .setDescription(`**Process:** ${Math.round(now - message.timestamp)}ms\n**Discord Gateway:** ${Math.round(message.guild.shard.latency)}ms\n**Database**: ${dbping}ms\n**Command handler:** ${now-cmdt}ms`)
    .setTimestamp();
    if(!args[0] || (args[0] !== "--adv" && args[0] !== "—adv")){
      let average = Math.round(((Math.round(now - message.timestamp)) + (Math.round(message.guild.shard.latency)) + (dbping) + (now-cmdt)) / 4);
      pembed = new Discord.MessageEmbed()
      .setTitle(`***${average}ms***`)
      .setTimestamp()
      .setColor("#7f7fff");
    }
    msg.edit({content: ":ping_pong: ***PONG!***", embed: pembed});
  });
}

module.exports.help = {
  name: "ping",
  desc: "Shows how fast the bot is working.",
  usage: "ping - Shows the ping.\nping --adv - A more advanced and more detailed version of the ping command for the nerds."
}