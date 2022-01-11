const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`you haven't started the game yet. Please type \`${prefix}start\` to begin.`);
    let msg = await message.channel.createMessage("Processing your inventory...");
    let price = 0;
    console.log("1")
    for(var i = 1; i < stats.beys.length; i++){
        if(stats.beys[i]){
        let filtered = stats.beys.filter(bey => bey.name === stats.beys[i].name);
        let sorted = filtered.sort((a,b) => {
            if(a.level < b.level) return 1;
            if(a.level > b.level) return -1;
            return 0;
        });
        console.log("2")
        for(var o = 1; o < sorted.length; o++){
            if(sorted[o].starred !== true && sorted[o].name !== "Buddy Bey" && stats.beys.indexOf(sorted[o]) !== 0 && sorted[o].level !== 0 && sorted[o].level !== 100 ){//&& (client.commonbeys.includes(sorted[o].name) || client.specialbeys.includes(sorted[o].name) || client.rarebeys.includes(sorted[o].name))){
                stats.beys.splice(stats.beys.indexOf(sorted[o]), 1);
                price = price + 25;
            }
        }
    }
    }
    await db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, coins: stats.coins + price, main: 0}});
    msg.edit(`Your inventory is cleared! You earned <:valtz:899373217255407646>${price} from the removed Beys. Please re\`${prefix}equip\` the Bey you want to use.`)
    console.log("3")
}

module.exports.help = {
    name: "clear",
    aliases: [],
    description: "Clear your duplicated Beys. Leaving the highest leveled, starreds, Buddy Beys and your starter, level 100s, blacks and exclusives behind.",
    usage: "clear"
}
