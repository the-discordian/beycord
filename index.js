//Assigning Variables / Requiring
const Discord = require('discord.js');
const Eris = require("eris-additions")(require("eris"));
const fs = require('fs');
const prefix = ";";
require('dotenv').config();

//Eris CLient
const client = new Eris(process.env.TOKEN);
client.commands = new (Discord.Collection || Map)();
client.beys = new (Discord.Collection || Map)();
client.parts = new (Discord.Collection || Map)();
client.items = new (Discord.Collection || Map)();

//MongoDB Variables
const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGOURL, {useUnifiedTopology: true})

//Mongo Connect
mongo.connect((err) => {
    if(err) throw err;
    console.log("Connection to MongoDB database established successfully!");
});

//commandFiles
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name || command.help.name, command);
}

//Beys
const beyFiles = fs.readdirSync('./beys').filter(file => file.endsWith(".js") && file !== ".gitignore");
for (const file of beyFiles) {
    const bey = require(`./beys/${file}`);
    const beyc = new bey("1","1");
    client.beys.set(beyc.name, bey);
}


//Items
const itemFiles = fs.readdirSync('./items').filter(file => file.endsWith(".js") && file !== "Booster.js" && file !== "Part.js" && file !== "Beyblade.js" && file !== "Quest.js");
for (const file of itemFiles) {
    const item = require(`./items/${file}`);
    client.items.set(item.name || item.help.name, item);
}

//async create message
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
	const db = mongo.db("main");

    message.reply = content => {
        client.createMessage(message.channel.id, `<@${message.author.id}>, ${content}`);
    }
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(client.commands.has(command)) {
        try {
               let cmd = client.commands.get(command);
            cmd.run(client, message, args, prefix, {}, db);
        } catch (error) {
            console.error(error);
            message.reply(`something happened while trying to run this command. Maybe Corrupt is just an idiot?`);
        }
    }
});

//Connect client
client.on('ready', () => {
    console.log('Beycord is online!');
});

client.connect();
