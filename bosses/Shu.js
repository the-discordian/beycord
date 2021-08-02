class KurenaiShu {
    constructor(){
        this.name = "Kurenai Shu";
        this.image = "https://cdn.discordapp.com/attachments/692234599350140961/766540105677668362/shu_boss.png";
        this.keyword = "shoe";
        this.players = [];
        this.atk = 100;
        this.hp = 900;
        this.stamina = 6;
        this.receiving = 0;
        this.logs = "The battle started! You have 5 minutes to kil- I mean beat Shu!\n";
        this.image2 = "https://static.wikia.nocookie.net/beyblade/images/9/9e/Beyblade_Burst_Shu_Kurenai.png/revision/latest/scale-to-width-down/552?cb=20191102221531";
        this.users = [];
        this.rewards = "15 EXPs and <:valtz:863052675968925716>800.";
        this.ongoing = true;
        this.startTime = new Date();
        this.notifs = [];
    }
    async awardPlayers(db){
        this.players.forEach(async plr => {
            let stats = await db.collection("users").findOne({_id: plr});
            await db.collection("users").updateOne({_id: plr}, {$set: {xp: stats.xp + 15, coins: stats.coins + 800, "states.inBattle": false}});
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
        let atk = Math.round(((this.atk/100)*125));
        this.atk = atk;
        this.stamina = this.stamina + 5;
        this.hp = this.hp + 100;
        this.addLogs("Shu's Spriggan Requiem used **Requiem Spin**! Health and stamina regained while also gaining a 25% damage boost.");
    }
}

module.exports = KurenaiShu;
