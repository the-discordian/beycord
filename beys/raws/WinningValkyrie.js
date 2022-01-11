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
    
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Winning Valkyrie used **Rush Launch**. 35 damage dealt.`)
    .setColor("#551a8b");
    victim.hp = victim.hp - 35;
    message.channel.send(embed);
  });

const WinningValkyrie = new bcworkshop.Beyblade({name: "Winning Valkyrie", type: "Attack", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/c/cf/Anime_wV.png/revision/latest?cb=20180404012334"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = WinningValkyrie;