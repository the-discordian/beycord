const Item = require("./Item.js");
const Discord = require("discord.js");

class AvatarEmbryo extends Item {
    constructor(){
        super("AvatarEmbryo", 1999);
        this.xp = 1;
    }
    async use(client, message, args, prefix, iindex, db){
        let stats = await db.collection("users").findOne({_id: message.author.id});
        let embed = new Discord.MessageEmbed()
        //console.log(stats.items)
        //console.log(iindex)
        //console.log(stats.items[iindex])
        //console.log(stats.items[iindex].xp)
        .setTitle("Hi, I'm an Avatar Embryo!")
        .setDescription(`I'm looking forward to my adventures with you. Just \`;attach\` me to your equipped Bey and I will be beside you as you face powerful foes!\n\n**EXPs**: ${stats.items[parseInt(args[0])-1].xp} / 900`)
        .setImage("https://static.wikia.nocookie.net/beyblade/images/5/50/Beyblade_Burst_Chouzetsu_Cho-Z_Valkyrie_Zenith_Evolution_vs_Cho-Z_Achilles_00_Dimension_2.png/revision/latest/scale-to-width-down/1000?cb=20190507222656")
        .setColor("#fbb804");
        message.channel.createMessage({embed: embed});
    }
}

module.exports = AvatarEmbryo;