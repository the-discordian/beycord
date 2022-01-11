const Quest = require("./Quest.js");

class LevelUpABeyOnce extends Quest {
    constructor(){
        super("Level up a Bey once", "<:valtz:899373217255407646>25");
    }
    award(stats, db, iindex){
        stats.quests.splice(iindex, 1);
        db.collection("users").updateOne({_id: stats._id}, {$set: {coins: stats.coins + 25, quests: stats.quests}});
    }
}

module.exports = LevelUpABeyOnce;