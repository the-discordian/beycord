const Code = require("./Code.js");
const Discord = require("discord.js");

class test1 extends Code {
    constructor(){
        super("iMissMyStuff");
    }
    async redeem(client, message, args, prefix, player, db){
        let stats = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, coins: 1})
        db.collection("users").findOneAndUpdate({ _id: message.author.id }, { $set: {coins: stats.coins + 1000}})
        let cons = client.beys.get("Cho-Z Valkyrie");
        let bey = new cons(message.author.id);
        db.collection("users").updateOne({_id: message.author.id}, {$push: {beys: bey}, $set: {xp: 4500}});
        cons = client.beys.get("Flaming Hot Cheeto");
        bey = new cons(message.author.id);
        db.collection("users").updateOne({_id: message.author.id}, {$push: {beys: bey}, $set: {xp: 4500}});
        message.channel.createMessage("You miss your stuff? Oh wow, you probably lost a lot of beys and valtz. Dang, well here's some stuff to compensate for that!\n- 1,000 valtz\n- Flaming Hot Cheeto\n- Cho-Z Valkyrie")
    }
}

module.exports = test1;