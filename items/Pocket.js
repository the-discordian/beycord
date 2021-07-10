const Item = require("./Item.js");
const Discord = require("discord.js");

class Pocket extends Item {
    constructor(){
        super("Pocket", Infinity);
        this.tickets = 0;
        this.premium = 0;
    }
    async use(client, message, args, prefix, iindex){
        let stats = await db.collection("users").findOne({_id: message.author.id});
        let pocket = stats.items[iindex];
        let embed = new Discord.MessageEmbed()
        .setTitle("Pocket")
        .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .setColor("#eaab15")
        .setDescription(`${pocket.tickets}<:giveawayticket:863052676182966293>\n${pocket.premium}<:premiumgt:863052676077453372>`)
        .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/party-popper_1f389.png");
        message.channel.createMessage({embed: embed});
    }
}

module.exports = Pocket;