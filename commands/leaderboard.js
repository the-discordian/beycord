const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let valtSort = { coins: -1 }
    let winsSort = { totalwins: -1 }
    let streakSort = { streak: -1}
    let msg = await message.channel.createMessage("Loading Leaderboard...");
    db.collection("users").find().sort(valtSort).limit(10).toArray(async function(err, result) {
        db.collection("users").find().sort(winsSort).limit(10).toArray(async function(err2, result2) { 
            db.collection("users").find().sort(streakSort).limit(10).toArray(async function(err3, result3) {
        if (err) throw err;
        if (err2) throw err2;
        if (err3) throw err3;
        let user1 = await client.getRESTUser(`${result[0]._id}`);
        let user2 = await client.getRESTUser(`${result[1]._id}`);
        let user3 = await client.getRESTUser(`${result[2]._id}`);
        let user4 = await client.getRESTUser(`${result[3]._id}`);
        let user5 = await client.getRESTUser(`${result[4]._id}`);
        let user6 = await client.getRESTUser(`${result[5]._id}`);
        let user7 = await client.getRESTUser(`${result[6]._id}`);
        let user8 = await client.getRESTUser(`${result[7]._id}`);
        let user9 = await client.getRESTUser(`${result[8]._id}`);
        let user10 = await client.getRESTUser(`${result[9]._id}`);
        let username1 = `${user1.username}#${user1.discriminator}`;
        let username2 = `${user2.username}#${user2.discriminator}`;
        let username3 = `${user3.username}#${user3.discriminator}`;
        let username4 = `${user4.username}#${user4.discriminator}`;
        let username5 = `${user5.username}#${user5.discriminator}`;
        let username6 = `${user6.username}#${user6.discriminator}`;
        let username7 = `${user7.username}#${user7.discriminator}`;
        let username8 = `${user8.username}#${user8.discriminator}`;
        let username9 = `${user9.username}#${user9.discriminator}`;
        let username10 = `${user10.username}#${user10.discriminator}`;

        let user1_ = await client.getRESTUser(`${result2[0]._id}`);
        let user2_ = await client.getRESTUser(`${result2[1]._id}`);
        let user3_ = await client.getRESTUser(`${result2[2]._id}`);
        let user4_ = await client.getRESTUser(`${result2[3]._id}`);
        let user5_ = await client.getRESTUser(`${result2[4]._id}`);
        let user6_ = await client.getRESTUser(`${result2[5]._id}`);
        let user7_ = await client.getRESTUser(`${result2[6]._id}`);
        let user8_ = await client.getRESTUser(`${result2[7]._id}`);
        let user9_ = await client.getRESTUser(`${result2[8]._id}`);
        let user10_ = await client.getRESTUser(`${result2[9]._id}`);
        let username1_ = `${user1_.username}#${user1_.discriminator}`;
        let username2_ = `${user2_.username}#${user2_.discriminator}`;
        let username3_ = `${user3_.username}#${user3_.discriminator}`;
        let username4_ = `${user4_.username}#${user4_.discriminator}`;
        let username5_ = `${user5_.username}#${user5_.discriminator}`;
        let username6_ = `${user6_.username}#${user6_.discriminator}`;
        let username7_ = `${user7_.username}#${user7_.discriminator}`;
        let username8_ = `${user8_.username}#${user8_.discriminator}`;
        let username9_ = `${user9_.username}#${user9_.discriminator}`;
        let username10_ = `${user10_.username}#${user10_.discriminator}`;

        let user1__ = await client.getRESTUser(`${result3[0]._id}`);
        let user2__ = await client.getRESTUser(`${result3[1]._id}`);
        let user3__ = await client.getRESTUser(`${result3[2]._id}`);
        let user4__ = await client.getRESTUser(`${result3[3]._id}`);
        let user5__ = await client.getRESTUser(`${result3[4]._id}`);
        let user6__ = await client.getRESTUser(`${result3[5]._id}`);
        let user7__ = await client.getRESTUser(`${result3[6]._id}`);
        let user8__ = await client.getRESTUser(`${result3[7]._id}`);
        let user9__ = await client.getRESTUser(`${result3[8]._id}`);
        let user10__ = await client.getRESTUser(`${result3[9]._id}`);
        let username1__ = `${user1__.username}#${user1__.discriminator}`;
        let username2__ = `${user2__.username}#${user2__.discriminator}`;
        let username3__ = `${user3__.username}#${user3__.discriminator}`;
        let username4__ = `${user4__.username}#${user4__.discriminator}`;
        let username5__ = `${user5__.username}#${user5__.discriminator}`;
        let username6__ = `${user6__.username}#${user6__.discriminator}`;
        let username7__ = `${user7__.username}#${user7__.discriminator}`;
        let username8__ = `${user8__.username}#${user8__.discriminator}`;
        let username9__ = `${user9__.username}#${user9__.discriminator}`;
        let username10__ = `${user10__.username}#${user10__.discriminator}`;

        let embed = new Discord.MessageEmbed()
        .setTitle("*👑Leaderboards👑*")
        .addFields(
            {name: "**__Vote Streak Leaderboard__**", value: `**[1]** \`${username1__}\` (${result3[0].streak} streak)\n**[2]** \`${username2__}\` (${result3[1].streak} streak)\n**[3]** \`${username3__}\` (${result3[2].streak} streak)\n**[4]** \`${username4__}\` (${result3[3].streak} streak)\n**[5]** \`${username5__}\` (${result3[4].streak} streak)\n**[6]** \`${username6__}\` (${result3[5].streak} streak)\n**[7]** \`${username7__}\` (${result3[6].streak} streak)\n**[8]** \`${username8__}\` (${result3[7].streak} streak)\n**[9]** \`${username9__}\` (${result3[8].streak} streak)\n**[10]** \`${username10__}\` (${result3[9].streak} streak)`, inline: true},
            {name: "**__Valtz Leaderboard__**", value: `**[1]** \`${username1}\` (<:valtz:899373217255407646>${result[0].coins})\n**[2]** \`${username2}\` (<:valtz:899373217255407646>${result[1].coins})\n**[3]** \`${username3}\` (<:valtz:899373217255407646>${result[2].coins})\n**[4]** \`${username4}\` (<:valtz:899373217255407646>${result[3].coins})\n**[5]** \`${username5}\` (<:valtz:899373217255407646>${result[4].coins})\n**[6]** \`${username6}\` (<:valtz:899373217255407646>${result[5].coins})\n**[7]** \`${username7}\` (<:valtz:899373217255407646>${result[6].coins})\n**[8]** \`${username8}\` (<:valtz:899373217255407646>${result[7].coins})\n**[9]** \`${username9}\` (<:valtz:899373217255407646>${result[8].coins})\n**[10]** \`${username10}\` (<:valtz:899373217255407646>${result[9].coins})`, inline: true},
            {name: "**__Victories Leaderboard__**", value: `**[1]** \`${username1_}\` (${result2[0].totalwins || result2[0].wins} Victories)\n**[2]** \`${username2_}\` (${result2[1].totalwins || result2[1].wins} Victories)\n**[3]** \`${username3_}\` (${result2[2].totalwins || result2[2].wins} Victories)\n**[4]** \`${username4_}\` (${result2[3].totalwins || result2[3].wins} Victories)\n**[5]** \`${username5_}\` (${result2[4].totalwins || result2[4].wins} Victories)\n**[6]** \`${username6_}\` (${result2[5].totalwins || result2[5].wins} Victories)\n**[7]** \`${username7_}\` (${result2[6].totalwins || result2[6].wins} Victories)\n**[8]** \`${username8_}\` (${result2[7].totalwins || result2[7].wins} Victories)\n**[9]** \`${username9_}\` (${result2[8].totalwins || result2[8].wins} Victories)\n**[10]** \`${username10_}\` (${result2[9].totalwins || result2[9].wins} Victories)`, inline: true}
        )
        .setFooter("Leaderboard as of")
        .setTimestamp()
        .setColor("#FFD700")
        msg.edit({ content: "✅Finished loading!", embed: embed });
        
      });
    })
})
}

module.exports.help = {
    name: "leaderboard",
    aliases: ["lb"],
    desc: "",
    usage: ""
}