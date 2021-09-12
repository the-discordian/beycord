const Discord = require("discord.js");
const Item = require("./Item.js");
const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGOURL, {useUnifiedTopology: true})
mongo.connect()

class GiftBox extends Item {
    constructor(){
        super("GiftBox", 1);
        this.beys = [];
        this.items = [];
        this.parts = [];
    }
    async use(client, message, args, prefix, iindex){
        const db = mongo.db("main");
        let stats = await db.collection("users").findOne({_id: message.author.id});
        if(!args[1]) return message.channel.createMessage(`Here's how you use the Gift Box correctly:\n\n\`${prefix}use ${iindex + 1} gift <player> - Gift all of the contents inside the gift box to a player.\n${prefix}use ${iindex + 1} view - View all of the contents inside the Gift box.\n${prefix}use ${iindex + 1} bey <bey index> - Add a Bey into the box.\n${prefix}use ${iindex + 1} part <part index> - Add a part into the box.\n${prefix}use ${iindex + 1} item <item index> - Add an item into the box.\`\n\n**⚠️Stuff added into the gift box cannot be retrieved!!⚠️**`)
        switch(args[1].toLowerCase()){
            case "gift":
                let box = stats.items[iindex];
                if(!args[2]) return message.reply("please mention who you want to gift.");
                let user;
                if(message.mentions[0]) user = await message.guild.getRESTMember(message.mentions[0].id);
                else user = await message.guild.getRESTMember(args[2]);
                if(!user) return message.reply("no player found. Please try again.");
                if(user.id == message.author.id) return message.reply("please at least tell a friend to pay <:valtz:665760587845861386>10000 to gift you nothingness instead of trying to gift yourself nothing. *Wait what.*");
                let stats2 = await db.collection("users").findOne({_id: user.id});
                if(!stats2) return message.reply("that player has not started the game yet.");
                let cost = 10;
                let exp = 5;
                for(var i = 0; i < box.beys.length; i++){
                    let bey = box.beys[i]
                    let rarity;
                /*    if(client.commonbeys.includes(bey.name)) rarity = "Common";
                    else if(client.specialbeys.includes(bey.name)) rarity = "Special";
                    else if(client.rarebeys.includes(bey.name)) rarity = "Rare";
                    else if(client.legendarybeys.includes(bey.name)) rarity = "Legendary";
                    else if(client.availablebeys.includes(bey.name)) rarity = "Unknown";
                    else if(client.blackbeys.includes(bey.name)) rarity = "Black";
                    else rarity = "Exclusive";
                    switch(rarity){
                        case "Common":
                            cost = cost + 10;
                            exp = exp + 2;
                        break;
                        case "Rare":
                            cost = cost + 25;
                            exp = exp + 3
                        break;
                        case "Legendary":
                            cost = cost + 50;
                            exp = exp + 5;
                        break;
                        case "Unknown":
                            cost = cost + 500;
                            exp = exp + 8;
                        break;
                        case "Black":
                            cost = cost + 1000;
                            exp = exp + 12;
                        break;
                        case "Exclusive":
                            cost = cost + 1000;
                            exp = exp + 12;
                        break;
                    }*/
                    if(box.beys[i].attached){
                        cost += 15;
                        exp += 3;
                    }
                    stats2.beys.push(box.beys[i]);
                }
                for(var i = 0; i < box.items.length; i++){
                    cost = cost + 15;
                    exp = exp + 3;
                    stats2.items.push(box.items[i]);
                }
                for(var i = 0; i < box.parts.length; i++){
                    cost = cost + 50;
                    exp = exp + 3;
                    stats2.beyparts.push(box.parts[i]);
                }
                if(box.beys.length == 0 && box.parts.length == 0 && box.items.length == 0) cost = 10000;
                if(stats.coins < cost) return message.reply("you don't have enough Valtz to pay for the shipping fees.");
                stats.items.splice(iindex, 1)
                db.collection("users").updateOne({_id: message.author.id}, {$set: {coins: stats.coins - cost, items: stats.items, xp: stats.xp + exp}});
                db.collection("users").updateOne({_id: user.id}, {$set: {beys: stats2.beys, items: stats2.items, beyparts: stats2.beyparts}});
                let stuff = "";
                if(box.beys[0]){
                    if(stuff !== "") stuff += ", ";
                    stuff += `${box.beys[0].bbname || box.beys[0].name}`;
                    for(var i = 1; i < box.beys.length; i++){
                        stuff += `, ${box.beys[i].bbname || box.beys[i].name}`
                    }
                }
                if(box.parts[0]){
                    if(stuff !== "") stuff += ", ";
                    stuff += `${box.parts[0].name}`;
                    for(var i = 1; i < box.parts.length; i++){
                        stuff += `, ${box.parts[i].name}`
                    }
                }
                if(box.items[0]){
                    if(stuff !== "") stuff += ", ";
                    stuff += `${box.items[0].name}`;
                    for(var i = 1; i < box.items.length; i++){
                        stuff += `, ${box.items[i].name}`
                    }
                }
                let dmchannel = await client.getDMChannel(user.id);
                dmchannel.createMessage(`You received a gift from ${message.author.username}#${message.author.discriminator}!\nYou received ${stuff || "nothingness, you did realize that he / she literally just sent you nothing with the shipping fee of exactly ***10000*** Valtz right?"}.`)
                message.channel.createMessage("Gift sent!")
                let webhookembed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) gifted ${user.username}#${user.discriminator} (${user.id})!`)
                .setDescription(`It contains ${stuff || "nothing"}.`)
                .setTimestamp()
                .setColor("#ff0090");
                client.executeWebhook("ID", "TOKEN", {embeds: [webhookembed]}).catch(err => {console.error(err)});
            break;
            case "view":
                let box2 = stats.items[iindex];
                let cost2 = 10;
                for(var i = 0; i < box2.beys.length; i++){
                    let bey = box2.beys[i]
                    let rarity;
                    if(client.commonbeys.includes(bey.name)) rarity = "Common";
                    else if(client.rarebeys.includes(bey.name)) rarity = "Rare";
                    else if(client.legendarybeys.includes(bey.name)) rarity = "Legendary";
                    else if(client.availablebeys.includes(bey.name)) rarity = "Unknown";
                    else if(client.blackbeys.includes(bey.name)) rarity = "Black";
                    else rarity = "Exclusive";
                    switch(rarity){
                        case "Common":
                            cost2 = cost2 + 10;
                        break;
                        case "Rare":
                            cost2 = cost2 + 25;
                        break;
                        case "Legendary":
                            cost2 = cost2 + 50;
                        break;
                        case "Unknown":
                            cost2 = cost2 + 500;
                        break;
                        case "Black":
                            cost2 = cost2 + 1000;
                        break;
                        case "Exclusive":
                            cost2 = cost2 + 1000;
                        break;
                    }
                    if(bey.attached) cost2 += 15;
                }
                for(var i = 0; i < box2.items.length; i++){
                    cost2 = cost2 + 15;
                }
                for(var i = 0; i < box2.parts.length; i++){
                    cost2 = cost2 + 50
                }
                if(box2.beys.length == 0 && box2.parts.length == 0 && box2.items.length == 0) cost2 = 10000;
                let stuff2 = "";
                if(box2.beys[0]){
                    if(stuff2 !== "") stuff2 += ", ";
                    stuff2 += `${box2.beys[0].bbname || box2.beys[0].name}`;
                    for(var i = 1; i < box2.beys.length; i++){
                        stuff2 += `, ${box2.beys[i].bbname || box2.beys[i].name}`
                    }
                }
                if(box2.parts[0]){
                    if(stuff2 !== "") stuff2 += ", ";
                    stuff2 += `${box2.parts[0].name}`;
                    for(var i = 1; i < box2.parts.length; i++){
                        stuff2 += `, ${box2.parts[i].name}`
                    }
                }
                if(box2.items[0]){
                    if(stuff2 !== "") stuff2 += ", ";
                    stuff2 += `${box2.items[0].name}`;
                    for(var i = 1; i < box2.items.length; i++){
                        stuff2 += `, ${box2.items[i].name}`
                    }
                }
                message.channel.createMessage(`**Shipping Fee: <:valtz:665760587845861386>${cost2}**\n__Contents__\n${stuff2 || "Nothing. Put something here or pay <:valtz:665760587845861386>10000."}\n*If your list is messy, I recommend using something called \`CTRL+F\`/\`CMD+F\`. ||Or \`ALT+F4\` if you want to rage quit because of your messy list.||*`).catch(err => message.channel.createMessage(`Good job. Your list is probably as populated as the human population that Discord refuses to send it. Good job. It is still sendable to a friend though. The shipping fee costs <:valtz:665760587845861386>${cost} by the way.`));
            break;
            case "bey":
                if(!args[2]) return message.reply("please provide the index of the Bey that you would like to add into the box.");
                let bindex = parseInt(args[2])-1;
                if(!stats.beys[bindex]) return message.reply("no Bey found.");
                if(bindex == 0) return message.channel.createMessage("***No.***");
                if(stats.beys[bindex].starred === true) return message.reply("you can't gift starred Beys.");
                message.channel.createMessage(`Successfully added ${stats.beys[bindex].bbname || stats.beys[bindex].name} to the box!`);
                if(stats.beys[bindex].attached) return message.channel.createMessage(`That Bey contains an attached item. Please \`${prefix}detach\` it and add it in separately.`)
                stats.items[iindex].beys.push(stats.beys[bindex]);
                stats.beys.splice(bindex, 1);
                db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items, beys: stats.beys}});
            break;
            case "part":
                if(!args[2]) return message.reply("please provide the index of the part that you would like to add into the box.");
                let bindex2 = parseInt(args[2])-1;
                if(!stats.beyparts[bindex2]) return message.reply("no part found.");
                message.channel.createMessage(`Successfully added ${stats.beyparts[bindex2].name} to the box!`);
                stats.items[iindex].parts.push(stats.beyparts[bindex2]);
                stats.beyparts.splice(bindex2, 1);
                db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items, beyparts: stats.beyparts}});
            break;
            case "item":
                if(!args[2]) return message.reply("please provide the index of the item that you would like to add into the box.");
                let bindex3 = parseInt(args[2])-1;
                if(!stats.items[bindex3]) return message.reply("no item found.");
                if(bindex3 == iindex) return message.channel.createMessage(`You flipped the gift box as if you're trying to add the gift box into the gift box, very nice.`);
                if(stats.items[bindex3].name == "Pocket") return message.channel.createMessage("RIP Pocket.");
                if(stats.items[bindex3].name.toLowerCase().includes("avatar")) return message.channel.createMessage("Your avatar is yours, and only yours.")
                if(stats.items[bindex3].name == "Gift Box"){
                    for(var i = 0; i < stats.items[bindex3].items.length; i++){
                        stats.items[iindex].items.push(stats.items[bindex3].items[i]);
                    }
                    for(var i = 0; i < stats.items[bindex3].beys.length; i++){
                        stats.items[iindex].beys.push(stats.items[bindex3].beys[i]);
                    }
                    for(var i = 0; i < stats.items[bindex3].parts.length; i++){
                        stats.items[iindex].parts.push(stats.items[bindex3].parts[i]);
                    }
                    message.channel.createMessage(`Successfully added ${stats.items[bindex3].name}'s content(s) into the box!`)
                }else{
	                message.channel.createMessage(`Successfully added ${stats.items[bindex3].name} to the box!`);
                    stats.items[iindex].items.push(stats.items[bindex3]);
                }
                stats.items.splice(bindex3, 1);
                db.collection("users").updateOne({_id: message.author.id}, {$set: {items: stats.items}});
            break;
        }
    }
}

module.exports = GiftBox;