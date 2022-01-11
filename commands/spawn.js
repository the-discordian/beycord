module.exports.run = async (client, message, args, prefix, player, db) => {
    if(message.author.id !== process.env.ownerID) return;
    if(!args[0]){
        const available = ["Ace Dragon", "Acid Anubis", "Air Knight", "Alter Chronos", "Arc Bahamut", "Archer Hercules", "Beast Behemoth", "Beat Kukulcan", "Blast Jinnius", "Blaze Ragnaruk", "Bloody Longinus", "Brave Solomon", "Bushin Ashura", "Buster Xcalibur", "Chaos", "Crash Ragnaruk", "Dark Deathscyther", "Dead Hades", "Dead Phoenix", "Deathscyther", "Deep Chaos", "Demon Destroyer", "Diomedes D2", "Draciel Shield", "Dragoon Storm", "Drain Fafnir", "Dranzer Spiral", "Driger Slash", "Earth Aquilla", "Erase Diabolos", "Evileye", "Fang Fenrir", "Flame Sagittario", "Gaia Dragoon", "Galazy Zeus", "Geist Fafnir", "Gigant Gaia", "God Valkyrie", "Guardian Kerbeus", "Guardian Kerbeus Red Ver.", "Hallow Xcalibur", "Hell Salamander", "Holy Horusood", "Horusood", "Hyrus H2", "Inferno Ifrit", "Istros I2", "Jail Jormungand", "Judgement Joker", "Kaiser Kerbeus", "Kerbeus", "King Kerbeus", "Legend Spriggan", "Lightning L-Drago", "Lost Longinus", "Mad Minoboros", "Maximum Garuda", "Maximus Garuda", "Minoboros", "Neptune", "Nightmare Longinus", "Nova Neptune", "Obelisk Odin", "Odin", "Orpheus O2", "Prime Apocalypse", "Psychic Phantom", "Quad Quetzalcoatl", "Ragnaruk", "Rock Leone", "Screw Trident", "Seig Xcalibur", "Shelter Regulus", "Sieg Xcalibur", "Slash Valkyrie", "Spriggan", "Spryzen Requiem", "Storm Pegasus", "Storm Spriggan", "Strike God Valkyrie", "Surtr S2", "Tornado Wyvern", "Trident", "Twin Nemesis", "Tyros T2", "Unicorn", "Union Achilles", "Unlock Unicorn", "Union Achilles", "Valkyrie", "Variant Lucifer", "Venom Diabolos", "Victory Valkyrie", "Wild Wyvern", "Winning Valkyrie", "Winning Valkyrie", "Wizard Fafnir", "World Spriggan", "Wyvern", "Xeno Xcalibur", "Yaeger Yggdrasil", "Z Achilles", "Zillion Zeus"];
        client.spawns.get('spawnsystem').run(message, prefix, db, available, client)
    } else {
        const spawnArgs = args.join(" ");
        let available = [`${spawnArgs}`]
        client.spawns.get('spawnsystem').run(message, prefix, db, available, client);
    }
}


module.exports.help = {
    name: "spawn",
    aliases: ["spwn"]
}