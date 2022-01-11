const Discord = require("discord.js");
const jimp = require("jimp");
const fs = require("fs");
//const gifencoder = require("gifencoder");
//const {createCanvas, loadImage} = require("canvas");

module.exports.run = async (client, message, args, prefix, player, db) => {
    message.channel.sendTyping();
    let stats = await db.collection("users").findOne({_id: message.author.id});
    if(!stats) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
    let main = stats.beys[stats.main];
    let gen = main.gen || 1;
    switch(gen){
        case 1:
            if(main.level < 20) return message.channel.createMessage("*Upgrade failed!*. Please reach the current level cap (Level 20) before attempting an upgrade.")
            if(stats.stars < 25) return message.channel.createMessage("*Upgrade failed!* You don't have enough stars.");
            let images = [main.image, "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498", "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498"];
            let jimps = [];
            for(var i = 0; i < images.length; i++){
                jimps.push(jimp.read(images[i]));
            }
            Promise.all(jimps).then(data => {
                return Promise.all(jimps);
            }).then(async data => {
                data[0].resize(400, 390);
                data[2].composite(data[0], 55, 65);
                data[2].composite(data[1], 0, 0);
                let written = await data[2].writeAsync(`/path/to/tempimages/${message.author.id}gen2.png`);
            });

            //HERE IT IS OFFICER RIGHT BELOW THIS >:(

        //    let wait = await client.delay(5000);
            let gen2image;
            try{gen2image = fs.readFileSync(`/path/to/tempimages/${message.author.id}gen2.png`)}catch(err){message.channel.createMessage(`*Upgrade failed!* Please try again.`);db.collection("users").updateOne({_id: message.author.id}, {$set: {stars: stats.stars - 1}});gen2image = null;};
            if(gen2image){
            let embed = new Discord.MessageEmbed()
            .setTitle(`${main.bbname || main.name} is now upgraded to Generation 2!`)
            .setColor("#7f7fff")
            .setImage(`attachment://${message.author.id}gen2.png`)
            .setTimestamp();
            let msg = await message.channel.createMessage({embed: embed}, {file: gen2image, name: `${message.author.id}gen2.png`});
            fs.unlink(`/path/to/tempimages/${message.author.id}gen2.png`, (err) => {
                if(err) console.log(err);
              });
            stats.beys[stats.main].image = msg.embeds[0].image.url;
            stats.beys[stats.main].gen = 2;
            db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, stars: stats.stars - 25}});
            }
        break;
        case 2:
            if(main.level < 40) return message.channel.createMessage("*Upgrade failed!*. Please reach the current level cap (Level 40) before attempting an upgrade.")
            if(stats.stars < 25) return message.channel.createMessage("*Upgrade failed!* You don't have enough stars.");
            let backup;
            let isBB = stats.beys[stats.main].name === "Buddy Bey";
            if(isBB) backup = stats.beys[stats.main];
            else backup = new (client.beys.get(stats.beys[stats.main].name))("1", "123");
            let images2 = [backup.image, "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498", "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498"];
            let jimps2 = [];
            for(var i = 0; i < images2.length; i++){
                jimps2.push(jimp.read(images2[i]));
            }
            Promise.all(jimps2).then(data => {
                return Promise.all(jimps2);
            }).then(async data => {
                if(isBB){
                    data[2].composite(data[0], 0, 0);
                }else{
                    data[0].resize(400, 390);
                    data[2].composite(data[0], 55, 65);
                }
                data[2].composite(data[1], 0, 0);
                let written = await data[2].writeAsync(`/path/to/tempimages/${message.author.id}gen3.png`);
            });
        //    let wait2 = await client.delay(5000);
            let gen3image;
            try{gen3image = fs.readFileSync(`/path/to/tempimages/${message.author.id}gen3.png`)}catch(err){message.channel.createMessage(`*Upgrade failed!* Please try again.`);db.collection("users").updateOne({_id: message.author.id}, {$set: {stars: stats.stars - 1}});gen3image = null;};
            if(gen3image){
            let embed2 = new Discord.MessageEmbed()
            .setTitle(`${main.bbname || main.name} is now upgraded to Generation 3!`)
            .setColor("#7f7fff")
            .setImage(`attachment://${message.author.id}gen3.png`)
            .setTimestamp();
            let msg2 = await message.channel.createMessage({embed: embed2}, {file: gen3image, name: `${message.author.id}gen3.png`});
            fs.unlink(`/path/to/tempimages/${message.author.id}gen3.png`, (err) => {
                if(err) console.log(err);
              });
            stats.beys[stats.main].image = msg2.embeds[0].image.url;
            stats.beys[stats.main].gen = 3;
            db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, stars: stats.stars - 25}});
            }
        break;
        case 3:
            if(main.level < 60) return message.channel.createMessage("*Upgrade failed!*. Please reach the current level cap (Level 60) before attempting an upgrade.")
            if(stats.stars < 25) return message.channel.createMessage("*Upgrade failed!* You don't have enough stars.");
            let backup2;
            let isBB2 = stats.beys[stats.main].name === "Buddy Bey";
            if(isBB2) backup2 = stats.beys[stats.main];
            else backup2 = new (client.beys.get(stats.beys[stats.main].name))("1", "123");
            let images3 = [backup2.image, "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498", "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498"];
            let jimps3 = [];
            for(var i = 0; i < images3.length; i++){
                jimps3.push(jimp.read(images3[i]));
            }
            Promise.all(jimps3).then(data => {
                return Promise.all(jimps3);
            }).then(async data => {
                if(isBB2){
                    data[2].composite(data[0], 0, 0);
                }else{
                    data[0].resize(400, 390);
                    data[2].composite(data[0], 55, 65);
                    data[2].composite(data[1], 0, 0);
                }
                let written = await data[2].writeAsync(`/path/to/tempimages/${message.author.id}gen4.png`);
            });
        //    let wait3 = await client.delay(5000);
            let gen4image;
            try{gen4image = fs.readFileSync(`/path/to/tempimages/${message.author.id}gen4.png`)}catch(err){message.channel.createMessage(`*Upgrade failed!* Please try again.`);db.collection("users").updateOne({_id: message.author.id}, {$set: {stars: stats.stars - 1}});gen4image = null;};
            if(gen4image){
            let embed3 = new Discord.MessageEmbed()
            .setTitle(`${main.bbname || main.name} is now upgraded to Generation 4!`)
            .setColor("#7f7fff")
            .setImage(`attachment://${message.author.id}gen4.png`)
            .setTimestamp();
            let msg3 = await message.channel.createMessage({embed: embed3}, {file: gen4image, name: `${message.author.id}gen4.png`});
            fs.unlink(`/path/to/tempimages/${message.author.id}gen4.png`, (err) => {
                if(err) console.log(err);
              });
            stats.beys[stats.main].image = msg3.embeds[0].image.url;
            stats.beys[stats.main].gen = 4;
            db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, stars: stats.stars - 25}});
            }
        break;
        case 4:
            if(main.level < 80) return message.channel.createMessage("*Upgrade failed!*. Please reach the current level cap (Level 80) before attempting an upgrade.")
            if(stats.stars < 25) return message.channel.createMessage("*Upgrade failed!* You don't have enough stars.");
            let backup3;
            let isBB3 = stats.beys[stats.main].name === "Buddy Bey";
            if(isBB3) backup3 = stats.beys[stats.main];
            else backup3 = new (client.beys.get(stats.beys[stats.main].name))("1", "123");
            let images4 = [backup3.image, "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498", "https://media.discordapp.net/attachments/863630426411892766/865079465717792778/null.png?width=498&height=498"];
            let jimps4 = [];
            for(var i = 0; i < images4.length; i++){
                jimps4.push(jimp.read(images4[i]));
            }
            Promise.all(jimps4).then(data => {
                return Promise.all(jimps4);
            }).then(async data => {
                if(isBB3){
                    data[2].composite(data[0], 0, 0);
                }else{
                    data[0].resize(400, 390);
                    data[2].composite(data[0], 55, 65);
                    data[2].composite(data[1], 0, 0);
                }
                let written = await data[2].writeAsync(`/path/to/tempimages/${message.author.id}gen5.png`);
            });
        //    let wait4 = await client.delay(5000);

            /*//
            let encoder = new gifencoder(524, 524);
            encoder.createReadStream().pipe(fs.createWriteStream(`/path/to/tempimages/${message.author.id}gen5.gif`));
            encoder.start()
            encoder.setRepeat(0);
            encoder.setDelay(83);
            encoder.setQuality(10);

            let canvas = createCanvas(524, 524);
            let ctx = canvas.getContext("2d");
            let count = 0;

            loadImage(`/path/to/tempimages/${message.author.id}gen5.png`).then((loadedImage) => {
                for(var i = 0; i < 6; i++){
                    ctx.drawImage(loadedImage, 5, (5 - (count * 5)));
                    encoder.addFrame(ctx);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    count++;
                }
                count = 0;
                for(var i = 0; i < 23; i++){
                    ctx.drawImage(loadedImage, 5, (-25 + (count * 5)));
                    encoder.addFrame(ctx);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    count++;
                }
                count = 0;
                for(var i = 0; i < 5; i++){
                    ctx.drawImage(loadedImage, 5, (90 - (count * 5)));
                    encoder.addFrame(ctx);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    count++;
                }
            });
            encoder.finish();

            let wait5 = await client.delay(1500);
            *///

            //ABOVE IS THE FAILED GEN 5 GIF CODE!! Fix it if you somehow figure it out lol.

            let gen5image;
            try{gen5image = fs.readFileSync(`/path/to/tempimages/${message.author.id}gen5.png`)}catch(err){message.channel.createMessage(`*Upgrade failed!* Please try again.`);db.collection("users").updateOne({_id: message.author.id}, {$set: {stars: stats.stars - 1}});gen5image = null;};
            if(gen5image){
            let embed4 = new Discord.MessageEmbed()
            .setTitle(`${main.bbname || main.name} is now upgraded to Generation 5!`)
            .setColor("#7f7fff")
            .setImage(`attachment://${message.author.id}gen5.png`)
            .setTimestamp();
            let msg4 = await message.channel.createMessage({embed: embed4}, {file: gen5image, name: `${message.author.id}gen5.png`});
            fs.unlink(`/path/to/tempimages/${message.author.id}gen5.gif`, (err) => {
                if(err) console.log(err);
              });
              fs.unlink(`/path/to/tempimages/${message.author.id}gen5.png`, (err) => {
                if(err) console.log(err);
              });
            stats.beys[stats.main].image = msg4.embeds[0].image.url;
            stats.beys[stats.main].gen = 5;
            db.collection("users").updateOne({_id: message.author.id}, {$set: {beys: stats.beys, stars: stats.stars - 25}});
            }

        break;
        default:
            message.channel.createMessage("It looks like your equipped Bey does not need another upgrade.");
    }
}

module.exports.help = {
    name: "upgrade",
    desc: "Upgrades your equipped Bey to it's next generation.",
    usage: "upgrade <bey index>",
    aliases: ["genup", "generationup"],
    cooldown: 10
} 