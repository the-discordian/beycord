const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    function check(doc) {
        let exists = false;
        const array = doc?.redeemed;
        for (let i = 0; i < array.length; i++) {
            const doc = array[i];
            if (doc.name == args[0]) exists = true;
            break;
        }
        return exists;
    }
    let doc = await db.collection("users").findOne({ _id: message.author.id });
    if(!doc) return message.reply(`You haven't started the game yet. Type \`${prefix}start\` to begin.`);
    if (!args[0]) return message.reply("Please provide a code that you got somewhere.");
    let codec = new (client.codes.get(args[0]))();
    let validate = check(doc, codec);
    console.log(doc.redeemed, codec, validate);
    if (doc && validate) return message.reply("You already redeemed the code.");
    let res = await codec.redeem(client, message, args, prefix, player, db);
    db.collection("users").updateOne({ _id:message.author.id },{$push:{redeemed:codec}}
);
}
module.exports.help = {
    name: "code",
    desc: "",
    aliases: [],
    usage: ""
}