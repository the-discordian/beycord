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
    acted.stamina = acted.stamina + 3;
	victim.atk = Math.round((victim.atk/100)*70);
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Chaos used **Gyro Launch**.`)
	.setDescription (`Chaos used it's low angled contact point to destabilize the opponent and reduce their damage by 30%, while utiliizing it's free spinning Gyro driver to enhance stamina by 3.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const Chaos = new bcworkshop.Beyblade({name: "Chaos", type: "Stamina", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/4/4f/C_og_transparent.png/revision/latest?cb=20171103215250"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Chaos;