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
    
    victim.hp = victim.hp - 80;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Cho-Z Achilles used **Turbo Breaker**. 65 damage dealt.`)
    .setColor("#551a8b");
    message.channel.send(embed)
  });

const ChoZAchilles = new bcworkshop.Beyblade({name: "Cho-Z Achilles", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/3/3a/BBC_Cho-Z_Achilles_00_Dimension_Beyblade.png/revision/latest?cb=20181217192338"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ChoZAchilles;