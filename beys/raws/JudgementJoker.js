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
    
    victim.hp = victim.hp - 30;
    acted.hp = acted.hp - 10;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Judgement Joker used **The Judgement**. 30 damage dealt. [${acted.username}] Judgement Joker got hit by recoil and lose 10 HP.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const JudgementJoker = new bcworkshop.Beyblade({name: "Judgement Joker", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/3/33/BBGT_Judgement_Joker_00Turn_Trick_Zan_Beyblade.png/revision/latest?cb=20191030220420"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = JudgementJoker;