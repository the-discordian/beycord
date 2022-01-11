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
	victim.atk = Math.round((victim.atk/100)*60);
	victim.stamina = victim.stamina - 1;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Hyrus H2 used **Horn Yell**.`)
	.setDescription (`Hyrus used the outward weight distribution of it's Yell disc, and the studded points of it's Needle tip to defend 40% damage from incoming attacks, the enhanced defense slowly wears out it's opponent and drain 1 stamina.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const HyrusH2 = new bcworkshop.Beyblade({name: "Hyrus H2", type: "Defense", imageLink: "https://i.ibb.co/98hPKMk/hyrus.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = HyrusH2;