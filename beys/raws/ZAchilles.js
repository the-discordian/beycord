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
    
    victim.hp = victim.hp - 43;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Z Achilles used **Z Breaker**. 43 damage dealt.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const ZAchilles = new bcworkshop.Beyblade({name: "Z Achilles", type: "Balance", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657592041406504/image2.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ZAchilles;