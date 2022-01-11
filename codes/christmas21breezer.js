const Code = require("./Code.js");
const Discord = require("discord.js");

class test1 extends Code {
    constructor(){
        super("christmas21breezer");
    }
    async redeem(client, message, args, prefix, player, db){
        let cons = client.beys.get("Breezing Cool Cheeto");
        let bey = new cons(message.author.id);
        db.collection("users").updateOne({_id: message.author.id}, {$push: {beys: bey}, $set: {xp: 4500}});
        message.channel.createMessage("You successfully redeemed this code and earned Breezing Cool Cheeto!")
    }
}

module.exports = test1;