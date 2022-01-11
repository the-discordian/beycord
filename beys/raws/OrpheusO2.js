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
    victim.atk = Math.round((victim.atk/100)*55);
	victim.stamina = victim.stamina - 1;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Orpheus O2 used **Destiny Dodge**.`)
	.setDescription (`Orpheus used the weight of the Armed disc to defend, reducing incoming damage by 45%, and using the contact point on it's layer to destabilize the opponent and drain 1 stamina!`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const OrpheusO2 = new bcworkshop.Beyblade({name: "Orpheus O2", type: "Defense", imageLink: "https://i.ibb.co/Y33ntmp/orpheos.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = OrpheusO2;