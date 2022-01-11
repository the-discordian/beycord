const Item = require("./Item.js");

const available = [
    "Victory Valtryek", //
    "Rising Ragnaruk", //
    "King Kerbeus", //
    "Revive Phoenix", //
    "Dead Phoenix", //
    "Winning Valkyrie", //
    "Spryzen Requiem", //
    "Buster Xcalibur", //
    "Cho-Z Spriggan", //
    "Dead Hades", //
    "Judgement Joker", //
    "Ace Dragon", //
    "Slash Valkyrie", //
    "Cho-Z Valkyrie", //
    "Storm Pegasus", //
    "Wizard Fafnir", //
    "Lost Longinus", //
    "Shelter Regulus", //
    "Hell Salamander", //
    "Xeno Xcalibur", //
    "Z Achilles", //
    "Venom Diabolos", //
    "Killer Deathscyther", //
    "Union Achilles", //
    "Spriggan", //
    "Valkyrie", //
    "Wyvern", //
    "Chaos", //
    "Acid Anubis", //
    "Arc Bahamut", //
    "Beast Behemoth", //
    "Bloody Longinus", //
    "Dark Deathscyther", //
    "Deathscyther", //
    "Diomedes D2", //
    "Drain Fafnir", //
    "Earth Aquila", // 
    "Evil-eye", //
    "Exceed Evil-eye", //
    "Fang Fenrir", //
    "Flame Sagittario", //
    "Gigant Gaia", //
    "God Valkyrie", //
    "Holy Horusood", //
    "Horusood", //
    "Hyrus H2", //
    "Inferno Ifrit", //
    "Istros I2", //
    "Jail Jormungand", //
    "Kaiser Kerbeus", //
    "Kerbeus", //
    "Kreis Satan", //
    "Lightning L-Drago", //
    "Mad Minoboros", //
    "Minoboros", //
    "Neptune", //
    "Nightmare Longinus", //
    "Nova Neptune", //
    "Obelisk Odin",
    "Odin", //
    "Orpheus O2", //
    "Psychic Phantom", //
    "Quad Quetzalcoatl", //
    "Ragnaruk", //
    "Rock Leone", //
    "Sieg Xcalibur", //
    "Strike God Valkyrie", //
    "Surtr S2", //
    "Tornado Wyvern", // 
    "Trident", //
    "Tyros T2", //
    "Unicorn", //
    "Unlock Unicorn", //
    "Wild Wyvern", //
    "Xcalibur", //
    "Yaeger Yggdrasil", //
    "Yggdrasil", //
    "Zillion Zeus", //
    "Geist Fafnir",
    "Prime Apocalypse",
    "Beat Kukulcan",
    "Blast Jinnius",
    "Blaze Ragnaruk",
    "Bushin Ashura",
    "Deep Chaos",
    "Galaxy Zeus",
    "Guardian Kerbeus",
    "Legend Spriggan",
    "Storm Spriggan",
    "Draciel Shield",
    "Dragoon Storm",
    "Dranzer Spiral",
    "Driger Slash",
    "Gaia Dragoon",
    "Maximus Garuda",
    "Screw Trident",
  ];
  const exclusives = [
    "Amaterios", 
    "Baldur"
  ];
  let black = [
    "Black Slash Valkyrie",
    "Black Spriggan Requiem",
    "Black Beat Kukulcan",
    "Black God Valkyrie",
    "Black Killer Deathscyther",
    "Black Legend Spriggan",
    "Black Nightmare Longinus",
    "Black Sieg Xcalibur",
  ];

class VoidMeat extends Item {
    constructor(){
      super("VoidMeat", 1000);
    }
    async use(client, message, args, prefix, iindex, db){
        let msg = await message.channel.createMessage("Rolling prizes...");
        let stats = await db.collection("users").findOne({_id: message.author.id});
        let prizechance = Math.floor(Math.random() * 3);
        setTimeout(() => {
            switch(prizechance){
               case 0:
                   msg.edit("Rolled on a random Bey! Rolling Bey...")
                   let bundle = available;
                   let rarity = Math.floor(Math.random() * 100);
                   if(rarity === 1){
                       bundle = exclusives;
                   }
                   let checkbs = Math.floor(Math.random()*1000);
                   if(checkbs === 1) bundle = ["Brave Solomon"];
                   let blackchance = Math.floor(Math.random() * 460);
                   if(blackchance === 1) bundle = black;
                   let choose = Math.floor(Math.random() * bundle.length);
                   let bey = new (client.beys.get(bundle[choose]))(message.author.id);
                   setTimeout(() => {
                       db.collection("users").updateOne({_id: message.author.id}, {$push: {beys: bey}});
                       msg.edit(`Rolled on ${bey.name}! Enjoy!`);
                   }, 5000);
                   break;
                case 1:
                    let amount = Math.round(Math.random() * 50);
                    setTimeout(() => {
                        db.collection("users").updateOne({_id: message.author.id}, {$set: {xp: stats.xp + amount}});
                        msg.edit(`Rolled on ${amount} EXPs! Enjoy!`);
                    }, 5000);
                    break;
                case 2:
                    let valtz = Math.round(Math.random() * 1000);
                    setTimeout(() => {
                        db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: stats.coins + valtz}});
                        msg.edit(`Rolled on ${valtz} Valtz! Enjoy!`);
                    }, 5000);
                    break;
            }
    }, 5000);
    stats.items.splice(iindex, 1);
    db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items}});
    }
  }
  
  module.exports = VoidMeat;
