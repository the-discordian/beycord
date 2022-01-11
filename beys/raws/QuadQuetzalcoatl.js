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
	acted.stamina = acted.stamina + 1;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Quad Quetzalcoatl used **Bound Launch**.`)
	.setDescription (`Quetzacoatl utilized the softer plastic of the jerk disc, allowing it to bend in and rebound enemy attacks away, stabilizing itself in the process to recover 50 hp and prevent stamina loss this turn.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const QuadQuetzalcoatl = new bcworkshop.Beyblade({name: "Quad Quetzalcoatl", type: "Defense", imageLink: "https://i.ibb.co/JsSy8zK/Quetzal.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = QuadQuetzalcoatl;