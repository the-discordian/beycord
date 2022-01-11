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
    
    victim.hp = victim.hp - 15;
    victim.stamina = victim.stamina - 1;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] King Kerbeus used **Chain Launch**. 15 damage dealt and opponent's stamina decreased by 1.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const KingKerbeus = new bcworkshop.Beyblade({name: "King Kerbeus", type: "Defense", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656558473281548/image1.png?width=630&height=586"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = KingKerbeus;