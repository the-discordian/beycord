class AoiValt {
    constructor(){
        this.name = "Aoi Valt";
        this.image = "https://cdn.discordapp.com/attachments/490783690323001345/770248873657499648/valtimage.png";
        this.keyword = "bald";
        this.players = [];
        this.atk = 118;
        this.hp = 1100;
        this.stamina = 8;
        this.receiving = 0;
        this.logs = "The battle started! You have 5 minutes to make Valt bald!\n";
        this.image2 = "https://static.wikia.nocookie.net/beyblade/images/6/6d/Beyblade_Burst_Sparking_Valt_Aoi.png/revision/latest/scale-to-width-down/300?cb=20200408004719";
        this.users = [];
        this.rewards = "16 EXPs and <:valtz:863052675968925716>1200.";
        this.ongoing = true;
        this.startTime = new Date();
        this.notifs = [];
    }
    async awardPlayers(db){
        this.players.forEach(async plr => {
            let stats = await db.collection("users").findOne({_id: plr});
            await db.collection("users").updateOne({_id: plr}, {$set: {xp: stats.xp + 16, coins: stats.coins + 1200, "states.inBattle": false}});
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
        let users = client.users.filter(user1 => this.players.includes(user1.id));
        users.forEach(user2 => {
            user2.hp = (user2.hp/100)*10;
        });
        this.addLogs("Valt's Brave Valkyrie used **Brave Sword**! Massive amount of damage dealt to all players.");
    }
}

module.exports = AoiValt;
