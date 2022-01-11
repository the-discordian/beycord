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
    
    victim.hp = victim.hp - 40;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Guardian Kerbeus Red Ver. used **Firework Dive**. 40 damage dealt.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const GuardianKerbeusRedVer = new bcworkshop.Beyblade({name: "Guardian Kerbeus Red Ver.", type: "Stamina", imageLink: "https://media.discordapp.net/attachments/736042245442109441/815431167191810089/image0.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = GuardianKerbeusRedVer;