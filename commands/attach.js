module.exports.run = async (client, message, args, prefix, player, db) => {
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`You haven't started the game yet. Type \`${prefix}start\` to begin.`);
    if(!args[0] || !args[1]) return message.reply(`Please type \`${prefix}help attach\` to know how to use this command.`);
    let bindex = parseInt(args[0])-1;
    let iindex = parseInt(args[1])-1;
    if(isNaN(bindex) || isNaN(iindex)) return message.reply("Indexes must be a number that can be found in your inventory.");
    let bey = stats.beys[bindex];
    let item = stats.items[iindex];
    if(!bey) return message.reply("No Bey found.");
    if(!item) return message.reply("No item found.");
    if(item.name == "Pocket" || item.name.includes("Profile")) return message.reply("That item cannot be attached.");
    if(bey.level < 50) return message.reply("You can only attach items to Level 50+ Beys.");
    if(bey.attached) return message.reply(`That Bey already has an item attached. Please \`${prefix}detach\` the item from the Bey before trying to attach something else.`)
    stats.beys[bindex].attached = item;
    stats.items.splice(iindex, 1);
    db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, items: stats.items}});
    message.channel.createMessage(`Successfully attached ${item.name} to ${bey.name}!`);
}

module.exports.help = {
    name: "attach",
    desc: "Attach an item to a Bey.",
    aliases: ["a", "atch"],
    usage: "attach <bey index> <item index>"
}