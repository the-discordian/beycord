class StarFatinum {
    constructor(){
        this.name = "Star Fatinum";
        this.image = "https://cdn.discordapp.com/attachments/570128363700617218/749435542264873100/unknown.png";
        this.keyword = "ora";
        this.players = [];
        this.atk = 138;
        this.hp = 1500;
        this.stamina = Infinity;
        this.receiving = 0;
        this.logs = "The battle started! You have 5 minutes to destroy Star Fatinum! WRYYYYY!!\n";
        this.image2 = "https://cdn.discordapp.com/attachments/744397864813330473/749416329529917511/1598745130639.png";
        this.users = [];
        this.rewards = "a Star Platinum avatar item, 25 EXPs and <:valtz:863052675968925716>2000.";
        this.ongoing = true;
        this.startTime = new Date();
        this.notifs = [];
    }
    async awardPlayers(db){
        const spc = require("../items/StarPlatinum.js");
        let sp = new spc();
        this.players.forEach(async plr => {
            let stats = await db.collection("users").findOne({_id: plr});
            await db.collection("users").updateOne({_id: plr}, {$push: {items: sp}, $set: {xp: stats.xp + 25, coins: stats.coins + 2000, "states.inBattle": false}});
        });
    }
    async addLogs(content){
        this.logs += `${content}\n`;
        let lines = this.logs.split("\n");
        if(lines.length > 10){
            let sliced = lines.slice(1);
            let joined = sliced.join("\n");
            this.logs = joined;
        }
    }
    async removePlayer(id, client, db){
        this.players.splice(this.players.indexOf(id), 1);
        let users = client.users.filter(user1 => user1.id === id);
            users.forEach(async user3 => {
                db.collection("users").updateOne({_id: user3.id}, {$set: {"states.inBattle": false}});
            });
        this.addLogs(`<@${id}> got ringed-out!`);
    }
    async special(client){
        let now = new Date();
        this.receiving = now;
        setTimeout(() => {
            this.addLogs("Time shall move again.")
        }, 5000);
        this.addLogs("STAR FATINUM: ZA WARUDO! Time is now stopped for 5 seconds.");
        let users = client.users.filter(user1 => this.players.includes(user1.id));
        users.forEach(user2 => {
            user2.hp = user2.hp - (this.atk * 2);
        });
    }
}

module.exports = StarFatinum;
