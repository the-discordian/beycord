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
    .setTitle(`[${acted.username}] Cho-Z Spriggan used **Super Spriggan Slash**. 43 damage dealt.`)
    .setColor("#551a8b");
    message.channel.send(embed)
  });

const ChoZSpriggan = new bcworkshop.Beyblade({name: "Cho-Z Spriggan", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/5/58/BBC_Cho-Z_Spriggan_0Wall_Zeta%27_Beyblade.png/revision/latest?cb=20181126123327"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ChoZSpriggan;