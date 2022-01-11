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
	acted.stamina = acted.stamina + 2;
	victim.atk = Math.round((victim.atk/100)*50);
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Horusood used **Edge Field**.`)
	.setDescription(`Horusood utilized it's Edge driver to catch the wind and boost stamina by 2, while forming a solid wall that parried the enemy's attack, reducing damage from it by 50%.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const Horusood = new bcworkshop.Beyblade({name: "Horusood", type: "Stamina", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/2/25/HorusoodSpreadEdge_5.png/revision/latest?cb=20160106220527"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Horusood;