module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
    if(stats.wins < 100) return message.reply("you must have 100 wins to rank up.");
    let rank = stats.rank || 0;
    let totalwins = stats.totalwins || 0;
    let toremove = Math.floor(stats.wins/100);
    let amt = 30000 + ((rank+toremove-1)*5000);
    db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: stats.coins + amt, wins: stats.wins - (toremove*100), won: [], rank: rank + toremove, totalwins: totalwins+(toremove*100)}});
    message.channel.createMessage(`:tada:__**Ranked Up!**__:tada:\nYou are now Rank ${rank+toremove} and you received <:valtz:899373217255407646>${amt}.`)
}

module.exports.help = {
    name: "rankup",
    desc: "Rank up and receive rewards. You need 100 wins to rank up.",
    aliases: ["ru"],
    usage: "rankup"
}