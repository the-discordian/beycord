const Code = require("./Code.js");

class test extends Code {
    constructor(){
        super("test");
    }
    award(stats, db, iindex){
        stats.quests.splice(iindex, 1);
        db.collection("users").updateOne({_id: stats._id}, {$set: {coins: stats.coins + 25, quests: stats.quests}});
    }
}

module.exports = test;