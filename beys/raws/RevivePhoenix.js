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
    
    victim.hp = victim.hp - 60;
    acted.hp = acted.hp - 6;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Revive Phoenix used **Revive Crush**. 68 damage dealt. [${acted.username}] Revive Phoenix also lost some HP due to it's armour accidentally hitting itself.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const RevivePhoenix = new bcworkshop.Beyblade({name: "Revive Phoenix", type: "Defense", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/c/ca/BBC-RP10F_Beyblade.png/revision/latest?cb=20180709182938"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = RevivePhoenix;