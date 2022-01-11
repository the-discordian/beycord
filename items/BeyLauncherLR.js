const Item = require("./Item.js");
const Discord = require("discord.js");

let images = {
    "B-119": "https://media.discordapp.net/attachments/692234599350140961/820207153750736917/image-removebg-preview.png",
    "B-00": "https://media.discordapp.net/attachments/692234599350140961/820206994378981396/image-removebg-preview.png",
    "B-88": "https://media.discordapp.net/attachments/692234599350140961/820206898526552094/image-removebg-preview.png"
}

class BeyLauncherLR extends Item {
    constructor(launcher){
        super("BeyLauncherLR", 1499, Infinity)
        let list = ["B-88", "B-119", "B-00"];
        let index = Math.floor(Math.random() * list.length);
        if(launcher) this.var = launcher.var;
        else this.var = list[index];
    }
    async use(client, message, args, prefix, iindex){
        let embed = new Discord.MessageEmbed()
        .setThumbnail(images[this.var])
        .setTitle(`BeyLauncher LR ${this.var}`)
        .setColor("#00c674")
        .setDescription("Just your average leftright string launcher.\n\n\`\`\`xl\nStability Drop-\nStamina+\n\`\`\`")
        .setFooter(`${prefix}lc for more interaction with launchers`)

        message.channel.createMessage({embed:embed});
    }
    boost(acted, victim, logger){
        acted.stamina += 0.2;
        acted.stability += 2;
    }
}

module.exports = BeyLauncherLR;