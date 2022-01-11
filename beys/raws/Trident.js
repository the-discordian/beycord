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
    acted.atk = victim.atk;
	acted.stamina = acted.stamina + 3;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Trident used **Claw Counter**.`)
	.setDescription(`The concentrated weight Trident's Heavy disc allowed it to extend the claws of the Claw driver, creating a gale force strong enough to enhance stamina by 3. The gale force parried and reflected the enemy's attack back to them!`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const Trident = new bcworkshop.Beyblade({name: "Trident", type: "Stamina", imageLink: "https://i.ibb.co/HxXLsPX/trident.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Trident;