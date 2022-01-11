const Discord = require('discord.js');
const { diff } = require('jimp');

module.exports.run = async (client, message, args, prefix, player, db) => {
    let info = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, coins: 1, wins:1, xp: 1, level: 1, beys: 1, main: 1})
    let crntbey = info.beys[info.main];
    let rank;
    if(info.wins===0){
      rank = "Unranked";
    } else if((info.wins>=1) && (info.wins<=4)){
      rank = "Valkyrie III";
    } else if((info.wins>=5) && (info.wins<=9)){
      rank = "Valkyrie II";
    } else if((info.wins>=10) && (info.wins<=14)){
      rank = "Valkyrie I";
    } else if((info.wins>=15) && (info.wins<=19)){
      rank = "Spriggan III";
    } else if((info.wins>=20) && (info.wins<=24)){
      rank = "Spriggan II";
    } else if((info.wins>=25) && (info.wins<=29)){
      rank = "Spriggan I";
    } else if((info.wins>=30) && (info.wins<=34)){
      rank = "Deathscyther III";
    } else if((info.wins>=35) && (info.wins<=39)){
      rank = "Deathscyther II";
    } else if((info.wins>=40) && (info.wins<=44)){
      rank = "Deathscyther I";
    } else if((info.wins>=45) && (info.wins<=49)){
      rank = "Achilles III";
    } else if((info.wins>=50) && (info.wins<=54)){
      rank = "Achilles II";
    } else if((info.wins>=55) && (info.wins<=59)){
      rank = "Achilles I";
    } else if((info.wins>=60) && (info.wins<=74)){
      rank = "Luinor III";
    } else if((info.wins>=75) && (info.wins<=79)){
      rank = "Luinor II";
    } else if((info.wins>=80) && (info.wins<=84)){
      rank = "Luinor I";
    } else if((info.wins>=85) && (info.wins<=89)){
      rank = "Excalibur III";
    } else if((info.wins>=90) && (info.wins<=94)){
      rank = "Excalibur II";
    } else if((info.wins>=95) && (info.wins<=99)){
      rank = "Excalibur I";
    } else if(info.wins>=100){
      rank = "100+ Drink";
    }
    
    let levelpf;
    let xpPf = info.xp;
    let difference;
    if(xpPf<200){
      levelpf=1;
      difference=200-xpPf;
    }
    if(xpPf>=200){
      levelpf=2;
      difference=900-xpPf;
    }
    if(xpPf>=600){
      levelpf=3;
      difference=1500-xpPf;
    }
    if(xpPf>=900){
      levelpf=4;
      difference=2200-xpPf;
    }
    if(xpPf>=1200){
      levelpf=5;
      difference=0
    }
    let footer;
    if(difference===0){
      footer = "MAX BLADER LEVEL ACHIEVED"
    } else {
      footer = `${difference} more EXPs required to reach Lvl${levelpf+1}`
    }
    db.collection("users").updateOne({ _id: message.author.id },{ $set:{level:levelpf}});

    if(info.premium === true){
      let startembed = new Discord.MessageEmbed()
      .setTitle(`${message.member.effectiveName}'s Profile <:premiumbadge:870768171592872007>`)
      .setThumbnail(message.author.avatarURL)
      .addFields(
        { name: 'Blader Level', value: `${info.level}`, inline:true},
        { name: 'EXPs', value: `${info.xp}`, inline:true},
        { name: 'Balance', value: `<:valtz:899373217255407646> ${info.coins}`},
        { name: 'League', value: `${rank}`, inline:true},
        { name: 'Victories', value: `${info.wins} (Rank ${info.rank}) \nTotal: ${info.totalwins}`, inline:true},
        { name: 'Bey Count', value: `${info.beys.length}`},
        { name: 'Equipped bey', value: `${crntbey.bbname || crntbey.name}`},
        )
        .setColor("#FF69B4")
        .setFooter(footer)
        .setTimestamp()
        message.channel.createMessage({embed:startembed});
    } else {
      let startembed = new Discord.MessageEmbed()
      .setTitle(`${message.member.effectiveName}'s Profile`)
      .setThumbnail(message.author.avatarURL)
      .addFields(
        { name: 'Blader Level', value: `${info.level}`, inline:true},
        { name: 'EXPs', value: `${info.xp}`, inline:true},
        { name: 'Balance', value: `<:valtz:899373217255407646> ${info.coins}`},
        { name: 'League', value: `${rank}`,inline:true},
        { name: 'Victories', value: `${info.wins} (Rank ${info.rank}) \nTotal: ${info.wins}`,inline:true},
        { name: 'Bey Count', value: `${info.beys.length}`},
        { name: 'Equipped bey', value: `${crntbey.bbname || crntbey.name}`},
        )
        .setColor("#7f7fff")
        .setFooter(footer)
        .setTimestamp()
        message.channel.createMessage({embed:startembed});
    }
}

module.exports.help = {
  name: "profile",
  aliases: ["pf"]
}