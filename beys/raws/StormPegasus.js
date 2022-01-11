const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    return false;
  }, function passed(acted, victim, message){
    victim.hp = victim.hp - 28;
    let embed = new Discord.MessageEmbed()
    .setTitle(`Uh oh, [${acted.username}] ${acted.bey.bbname || acted.bey.name} tried to use it's passive ability but it was not set up properly. 28 damage dealt.`)
    .setDescription("Please report this at the support server.")
    .setColor("#551a8b");
    message.channel.createMessage({embed: embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
    victim.hp = victim.hp - 41;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Storm Pegasus used **Starblast Attack**. 41 damage dealt.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const StormPegasus = new bcworkshop.Beyblade({name: "Storm Pegasus", type: "Attack", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657591504928768/image0.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = StormPegasus;