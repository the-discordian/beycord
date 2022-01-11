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
	acted.stamina = acted.stamina - 1;
	victim.atk = Math.round((victim.atk/100)*35);
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Evil-eye used **Needle Drift**.`)
	.setDescription(`Evil-eye utilized it's Needle driver's multitude of contact points to absorb the opponent's attack, reducing it by 65% before swiftly dashing out the way at the cost of 1 stamina.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const Evileye = new bcworkshop.Beyblade({name: "Evil-eye", type: "Defense", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/7/79/E_WN.png/revision/latest?cb=20180624024355"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Evileye;