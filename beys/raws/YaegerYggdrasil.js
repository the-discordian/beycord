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
    
    
    //Change "victim.hp = victim.hp - 123" to "victim.hp = victim.hp - <damage number>. This and the line below can be removed if the special move does not deal any damage.
    acted.hp = acted.hp + 50;
	acted.stamina = acted.stamina + 2;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Yaeger Yggdrasil used **Nature Launch**.`)
	.setDescription (`Yggdrasil used the POM, low friction surface of it's Yielding tip to gain 2 stamina, and enhance it's stability, recovering 50 hp!`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const YaegerYggdrasil = new bcworkshop.Beyblade({name: "Yaeger Yggdrasil", type: "Stamina", imageLink: "https://i.ibb.co/wrjqwvJ/yggdrasil.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = YaegerYggdrasil;