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
    victim.atk = Math.round((victim.atk/100)*20);
	acted.stamina = acted.stamina - 1;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Exceed Evil-eye used **Serpent Launch**.`)
	.setDescription (`Evileye deflected the enemy's attacks due to the outward weight distribution of it's Gravity disc, negating 80% of incoming damage. But it's Atomic driver is forced to lock up when defending, reducing stamina by 1.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const ExceedEvileye = new bcworkshop.Beyblade({name: "Exceed Evil-eye", type: "Defense", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/e/eb/Exceed_Evil-eye_%28B-80_02_Ver%29.png/revision/latest?cb=20180306204432"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ExceedEvileye;