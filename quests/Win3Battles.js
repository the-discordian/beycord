const Quest = require("./Quest.js");

class Win3Battles extends Quest {
    constructor(){
        super("Win 3 battles", "<:giveawayticket:863052676182966293>2");
        this.progress = 0;
    }
    award(stats, db, iindex){
        stats.quests.splice(iindex, 1);
        let pockets = stats.items.filter(item => item.name === "Pocket");
        if(pockets[0]){
            let pocketi = stats.items.indexOf(pockets[0]);
            stats.items[pocketi].tickets = stats.items[pocketi].tickets + 2;
            db.collection("users").updateOne({_id: stats._id}, {$set: {items: stats.items, quests: stats.quests}});
        }
    }
}

module.exports = Win3Battles;