const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let codeargs = args[0];
    let user = await db.collection("users").findOne({_id: message.author.id});
    if(!user) return message.reply(`you haven't started the game yet. Type \`${prefix}start\` to begin.`);
    if(!codeargs) return message.reply('please provide a code that you got somewhere.')
    if(db.collection("users").find({_id: message.author.id}, {[`redeemed.name.${args[0]}`]:{$exists:false}})) return message.reply("This code is already used")
 //   if(1 = 1) return message.reply('This code does not exist')
    let code = client.codes.get(codeargs)
    let newcode = new code();
    db.collection("users").updateOne({_id: message.author.id}, {$push: {redeemed: newcode}});
    message.reply(`hi, redeemed: ${codeargs}`)
}

module.exports.help = {
    name: "code",
    desc: "",
    aliases: [],
    usage: ""
}