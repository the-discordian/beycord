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
	victim.atk = Math.round((victim.atk / 100) * 40);
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Neptune used **Splash Launch**.`)
	.setDescription(`Neptune's Armed disc's weight held it down with strong force, blocking 60% of the enemy's attack. The grip of the Zephyr driver and the weight of Armed improved it's stability, granting 50 hp.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const Neptune = new bcworkshop.Beyblade({name: "Neptune", type: "Balance", imageLink: "https://i.ibb.co/HBnVWLH/neptune.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Neptune;