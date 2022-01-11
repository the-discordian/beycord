const Item = require("./Item.js");

class PremiumTicketsChest10 extends Item {
  constructor(){
    super("PremiumTicketsChest10", null, 3);
  }
  async use(client, message, args, prefix, iindex, db){
    let stats = await db.collection("users").findOne({_id: message.author.id});
    let pockets = stats.items.filter(item => item.name === "Pocket");
    if(pockets[0]){
        let pocketi = stats.items.indexOf(pockets[0]);
        stats.items[pocketi].premium = stats.items[pocketi].premium + 10;
        stats.items.splice(iindex, 1);
        db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items}});
        message.channel.createMessage(`You acquired <:premiumgt:863052676077453372>10!`);
    }
  }
}

module.exports = PremiumTicketsChest10;