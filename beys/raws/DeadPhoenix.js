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
    
    victim.hp = victim.hp - 50;
    acted.hp = acted.hp - 8;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Dead Phoenix used **Dead Armour Press**. 50damage dealt. [${acted.username}] Dead Phoenix also lost some HP due to it's armour accidentally hitting itself.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const DeadPhoenix = new bcworkshop.Beyblade({name: "Dead Phoenix", type: "Defense", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/e/ec/BBC_Dead_Phoenix_0_Atomic_Beyblade.png/revision/latest?cb=20190131010643"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = DeadPhoenix;