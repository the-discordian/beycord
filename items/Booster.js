const Item = require("./Item.js");

class Booster extends Item {
  constructor(boost, name, costinvaltz, costingv){
    super(name, costinvaltz, costingv);
    this.boost = boost;
    this.startTime = new Date();
  }
  async use(client, message, args, prefix, iindex, db){
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(this.boost.valtz) client.valtzboost.set(message.author.id, {amt: this.boost.valtz, time: this.boost.time, start: this.startTime});
    if(this.boost.exp) client.expboost.set(message.author.id, {amt: this.boost.exp, time: this.boost.time, start: this.startTime});
    stats.items.splice(iindex, 1);
    db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items}});
    message.channel.createMessage(`Boost applied!`);
    setTimeout(() => {
      if(client.valtzboost.get(message.author.id)) client.valtzboost.delete(message.author.id);
      if(client.expboost.get(message.author.id)) client.expboost.delete(message.author.id);
    }, this.boost.time);
  }
}

module.exports = Booster;