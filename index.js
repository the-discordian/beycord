const Discord = require('discord.js');
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api(process.env.topggApi)
const Eris = require("eris-additions")(require("eris"));
const fs = require('fs');
require('dotenv').config();
const { MongoClient } = require("mongodb");
const { spawn } = require('child_process');
const { TIMEOUT } = require('dns');
const mongo = new MongoClient(process.env.MONGOURL, {useUnifiedTopology: true});

//Mongo on Connect
mongo.connect((err) => {
    if(err) throw err;
    console.log("Connection to MongoDB database established successfully!");
});

//HANDLERS ####################################################################################

//Discord.Collection Clients Adder
const client = new Eris(process.env.TOKEN, {restMode:true, maxShards: "auto", intents: ['guilds','guildsMembers','guildBans','guildEmojis','guildIntegrations','guildWebhooks','guildInvites','guildVoiceStates','guildPresenses','guildIntegrations','guildMessages','guildMessageReactions','guildMessageTyping','directMessages','directMessageReactions','directMessageTyping']});
client.commands = new (Discord.Collection || Map)();
client.beys = new (Discord.Collection || Map)();
client.parts = new (Discord.Collection || Map)();
client.items = new (Discord.Collection || Map)();
client.spawns = new (Discord.Collection || Map)();
client.bosssystems = new (Discord.Collection || Map)();
client.bosses = new (Discord.Collection || Map)();
client.aliases = new (Discord.Collection || Map)();
client.quests = new (Discord.Collection || Map)();
client.expboost = new (Discord.Collection || Map)();
client.valtzboost = new (Discord.Collection || Map)();
client.availablebeys = new (Discord.Collection || Map)();
client.commonbeys = new (Discord.Collection || Map)();
client.specialbeys = new (Discord.Collection || Map)();
client.rarebeys = new (Discord.Collection || Map)();
client.legendarybeys = new (Discord.Collection || Map)();
client.shadowbeys = new (Discord.Collection || Map)();
client.codes = new (Discord.Collection || Map)();
client.restarttime = new (Discord.Collection || Map)();

//Spawn Client
const spawner = require(`./systems/spawnsystem.js`);
client.spawns.set(spawner.name || spawner.help.name, spawner);

//Boss Client
const bosssystem = require(`./systems/bosssystem.js`);
client.bosssystems.set(bosssystem.name || bosssystem.help.name, bosssystem);

//Command Handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name || command.help.name, command);
    command.help.aliases.forEach(aliases => {
        client.aliases.set(aliases, command.help.name);
    });
}

//Boss Handler
const bossFiles = fs.readdirSync('./bosses').filter(file => file.endsWith(".js"));
for(const file of bossFiles){
    const boss = require(`./bosses/${file}`);
    const bossc = new boss("1","1");
    client.bosses.set(bossc.name, boss);
}

const codeFiles = fs.readdirSync('./codes').filter(file => file.endsWith(".js"));
for(const file of codeFiles){
    const code = require(`./codes/${file}`);
    client.codes.set(code.name, code);
}

//Bey Handler
const beyFiles = fs.readdirSync('./beys').filter(file => file.endsWith(".js") && file !== ".gitignore" && file !== "Beyblade.js");
for (const file of beyFiles) {
    const bey = require(`./beys/${file}`);
    const beyc = new bey("1","1");
    client.beys.set(beyc.name, bey);
    //client.availablebeys.set(beyc.name, bey);
}

//Items Handler
const itemFiles = fs.readdirSync('./items').filter(file => file.endsWith(".js") && file !== "Part.js" && file !== "Beyblade.js" && file !== "Quest.js");
for (const file of itemFiles) {
    const item = require(`./items/${file}`);
    client.items.set(item.name, item);
}

//Quest Handler
const questFiles = fs.readdirSync('./quests').filter(file => file.endsWith(".js"));
for (const file of questFiles) {
    const quest = require(`./quests/${file}`);
    client.quests.set(quest.name, quest);
}

//Part Handler
const partFiles = fs.readdirSync('./parts').filter(file => file.endsWith(".js"));
for (const file of partFiles) {
    const part = require(`./parts/${file}`);
    client.parts.set(part.name, part);
}

//Rarities System
["WildWyvern","AceDragon","ArcBahamut","UnionAchilles","DrigerSlash","Odin","Neptune","BlazeRagnaruk","SurtrS2","StormSpriggan","KaiserKerbeus","XenoXcalibur","BeastBehemoth","WizardFafnir","OrpheusO2","BushinAshura","GeistFafnir","ZillionZeus","Yggdrasil","InfernoIfrit"].forEach(file =>{
    const bey1 = require(`./beys/${file}`);
    const beyc1 = new bey1("1","1");
    client.commonbeys.set(beyc1.name, bey1);
    ["JudgementJoker","ScrewTrident","Wyvern","BusterXcalibur","HyrusH2","Kerbeus","KillerDeathscyther","Evileye","ChoZValkyrie","NightmareLonginus","Spriggan","RevivePhoenix","SiegXcalibur","RockLeone","DracielShield","Xcalibur","DeadPhoenix", "LostLonginus"].forEach(file =>{
        const bey2 = require(`./beys/${file}`);
        const beyc2 = new bey2("1","1");
        client.specialbeys.set(beyc2.name, bey2);
        ["UnlockUnicorn","MaximusGaruda","KreisSatan","GalaxyZeus","DeadHades","VenomDiabolos","IstrosI2","DeepChaos","ExceedEvileye","AcidAnubis","LegendSpriggan","DarkDeathscyther","HellSalamander","GaiaDragoon","ZAchilles","TornadoWyvern","StormPegasus","GodValkyrie","Ragnaruk"].forEach(file =>{
            const bey3 = require(`./beys/${file}`);
            const beyc3 = new bey3("1","1");
            client.rarebeys.set(beyc3.name, bey3);
            ["VictoryValkyrie","DragoonStorm","NovaNeptune","ShelterRegulus","LightningLDrago","GuardianKerbeus","BloodyLonginus","EarthAquila","YaegerYggdrasil","Trident","TyrosT2","MadMinoboros","KingKerbeus","Unicorn","DranzerSpiral","ObeliskOdin","Deathscyther","ChoZSpriggan","PsychicPhantom"].forEach(file =>{
                const bey4 = require(`./beys/${file}`);
                const beyc4 = new bey4("1","1");
                client.legendarybeys.set(beyc4.name, bey4);
                ["GigantGaia","DrainFafnir","JailJormungand","SpryzenRequiem","HolyHorusood","SlashValkyrie","RisingRagnaruk","BeatKukulcan","FlameSagittario","Valkyrie","DiomedesD2","BlastJinnius","Minoboros","PrimeApocalypse","Horusood","WinningValkyrie","Chaos","FangFenrir","StrikeGodValkyrie"].forEach(file =>{
                    const bey5 = require(`./beys/${file}`);
                    const beyc5 = new bey5("1","1");
                    client.shadowbeys.set(beyc5.name, bey5);
                })
            })
        })
    })
})

//MESSAGE ####################################################################################

//On Message Create
client.on('messageCreate', async (message) => {
    const db = mongo.db("main");
    const testForNumber = Math.floor(Math.random() * 30);
    const testForNumber2 = Math.floor(Math.random()*1000);
    const raritytest = Math.floor(Math.random() * 30)
    
    //Configuration
    let channel = await db.collection("channels").findOne({_id: message.channel.id});
    if (!channel){
        db.collection("channels").insertOne({_id: message.channel.id, bey: "nothing", type: "nothing", answer: "number"})
    }
    let guild = await db.collection("guilds").findOne({_id: message.guild.id});
    if(!guild){
        db.collection("guilds").insertOne({_id: message.guild.id,redirect: "nothing",prefix: ";",bey: "nothing",type: "nothing",answer: "number",disabled: []});
    }
    let prefix = guild.prefix;
    
    //Prefix and help
    if(message.content.toLowerCase() === ";prefix"){
        client.createMessage(message.channel.id, `The prefix for this server is \`${prefix}\`. Have fun blading!`);
    }
    
    //Spawn Beys & Bosses
    if(testForNumber === 0){
        let available;
        if(raritytest >= 20){
            available = ["Wild Wyvern","Ace Dragon","Arc Bahamut","Union Achilles","Driger Slash","Odin","Neptune","Blaze Ragnaruk","Surtr S2","Storm Spriggan","Kaiser Kerbeus","Xeno Xcalibur","Beast Behemoth","Wizard Fafnir","Orpheus O2","Bushin Ashura","Geist Fafnir","Zillion Zeus","Yggdrasil","Inferno Ifrit"];
        } else if(raritytest >= 10){
            available = ["Judgement Joker","Screw Trident","Wyvern","Buster Xcalibur","Hyrus H2","Kerbeus","Killer Deathscyther","Evileye","ChoZ Valkyrie","Nightmare Longinus","Spriggan","Revive Phoenix","Sieg Xcalibur","Rock Leone","Draciel Shield","Xcalibur","Dead Phoenix", "Lost Longinus"];
        } else if(raritytest >= 5){
            available = ["Unlock Unicorn","Maximus Garuda","Kreis Satan","Galaxy Zeus","Dead Hades","Venom Diabolos","Istros I2","Deep Chaos","Exceed Evileye","Acid Anubis","Legend Spriggan","Dark Deathscyther","Hell Salamander","Gaia Dragoon","Z Achilles","Tornado Wyvern","Storm Pegasus","God Valkyrie","Ragnaruk"];
        } else if(raritytest >= 3){
            available = ["Victory Valkyrie","Dragoon Storm","Nova Neptune","Shelter Regulus","Lightning L Drago","Guardian Kerbeus","Bloody Longinus","Earth Aquila","Yaeger Yggdrasil","Trident","Tyros T2","Mad Minoboros","King Kerbeus","Unicorn","Dranzer Spiral","Obelisk Odin","Deathscyther","ChoZ Spriggan","Psychic Phantom"];
        } else if(raritytest >= 0){
            available = ["Gigant Gaia","Drain Fafnir","Jail Jormungand","Spryzen Requiem","HolyHorusood","Slash Valkyrie","Rising Ragnaruk","Beat Kukulcan","Flame Sagittario","Valkyrie","Diomedes D2","Blast Jinnius","Minoboros","Prime Apocalypse","Horusood","Winning Valkyrie","Chaos","Fang Fenrir","Strike God Valkyrie"];
    }
    client.spawns.get('spawnsystem').run(message, prefix, db, available, client);
    }

    if(testForNumber2 === 0){
        client.bosssystems.get('bosssystem').run(message, prefix, db, client)
    }
    
    let info = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, beys: 1, main: 1});
    if (info){
        if(info.banned === true) return;

        //Check current bey
        if((info.main+1) > info.beys.length){
            db.collection("users").updateOne({_id: message.author.id}, {$set: {main: 0}});
        }

        //Random Function
        function random(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        //EXP System
        let crntbey = info.beys[info.main];
        let booster1 = client.expboost.get(message.author.id);
        let exp;
        if(booster1){
            exp = crntbey.xp+(Math.floor((random(1,20))*1.5))
        } else {
            exp = crntbey.xp+random(1,20)
        }
        let levelNew = Math.floor(exp/300);
        let staramount = random(0,2);
        function updateLevel(){
            if(levelNew>crntbey.level){
                let lvlupquest = info.quests.filter(quest => quest.name === "LevelUpABeyOnce");
                if(lvlupquest[0]){
                    lvlupquest.forEach(que => {
                        let foundindex = info.quests.indexOf(que);
                        if(info.quests[foundindex.completed] != true){
                            info.quests[foundindex].completed = true;
                            let embed = new Discord.MessageEmbed()
                            .setTitle(`**${crntbey.name}** just got to level **${levelNew}**!`)
                            .setColor("#50c878")
                            .setDescription("You completed your quest!")
                            db.collection("users").updateOne({ _id: message.author.id },{ $set:{[`beys.${info.main}.level`]:levelNew,[`beys.${info.main}.xp`]:exp,stars:info.stars+staramount, coins: info.coins+100, quests: info.quests}});
                            message.channel.createMessage({embed:embed}).then(message => {
                                setTimeout(() => message.delete(), 5000)
                            })
                        }
                      });
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle(`**${crntbey.name}** just got to level **${levelNew}**!`)
                            .setColor("#50c878")
                            db.collection("users").updateOne({ _id: message.author.id },{ $set:{[`beys.${info.main}.level`]:levelNew,[`beys.${info.main}.xp`]:exp,stars:info.stars+staramount, coins: info.coins+100, quests: info.quests}});
                            message.channel.createMessage({embed:embed}).then(message => {
                                setTimeout(() => message.delete(), 5000)
                            })
                    }

                
            } else {
                db.collection("users").updateOne({ _id: message.author.id },{ $set:{[`beys.${info.main}.xp`]:exp,stars:info.stars+staramount}});
            }
        }
        if(crntbey.level<20){
            updateLevel();
        } else if(((crntbey.level>=20) && (crntbey.level<40)) && (crntbey.gen===2)){
            updateLevel();
        } else if(((crntbey.level>=40) && (crntbey.level<60)) && (crntbey.gen===3)){
            updateLevel();
        } else if(((crntbey.level>=60) && (crntbey.level<80)) && (crntbey.gen===4)){
            updateLevel();
        } else if(((crntbey.level>=80) && (crntbey.level<100)) && (crntbey.gen===5)){
            updateLevel();
        }
        
        //Blader Level
        let levelpf;
        let xpPf = info.xp;
        if(xpPf<200){
            levelpf=1;
        }
        if(xpPf>=200){
            levelpf=2;
        }
        if(xpPf>=900){
            levelpf=3;
        }
        if(xpPf>=1500){
            levelpf=4;
        }
        if(xpPf>=2200){
            levelpf=5;
        }
        if(levelpf>info.level){
            db.collection("users").updateOne({ _id: message.author.id },{ $set:{level:levelpf,coins:info.coins+1000}});
        }
        
        //Vote
        const now = new Date();
      //  let voted = await topgg.hasVoted(message.author.id);
        if(now-info.lastVoted>(720*60*100)*2){
            db.collection("users").updateOne({ _id: message.author.id },{ $set:{streaks:0}});
        }

    //Total Wins
        db.collection("users").updateOne({ _id: message.author.id },{ $set:{totalwins:info.wins+(info.rank*100)}});
    }

    //Command Handler Part. 2
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    message.reply = content => {
        message.channel.createMessage({content:content, messageReferenceID: message.id, everyone:true});
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(client.commands.has(command)) {
        let cmd = client.commands.get(command);
        try {
            cmd.run(client, message, args, prefix, {}, db);
        } catch (error) {
            console.error(error);
            message.reply(`something happened while trying to run this command. Try again later?`);
        }
    } else {
        try{
        let cmd = client.commands.get(client.aliases.get(command));
        cmd.run(client, message, args, prefix, {}, db);
        } catch(e){
        }
    }
});

//Client
client.on('ready', () => {
    console.log('Beycord is online.');
    client.editStatus({name: `with Beyblades in ${client.guilds.size} servers! | ;prefix`});
});

client.connect();