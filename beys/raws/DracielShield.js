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
    
	
    victim.atk = Math.round((victim.atk/100)*60);
	acted.stamina = acted.stamina + 1;
	victim.stamina = victim.stamina - 2;
    
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
	.setTitle(`[${acted.username}] Draciel Shield used **Central Defense**.`)
	.setDescription(`Draciel's centralized weight distribution created a stamina retaining spin, allowing it to defend against 40% of incoming damage and increase stamina by 2. The opponent's weakened attacks were exploited to stall the battle out, dropping their stamina by 1.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const DracielShield = new bcworkshop.Beyblade({name: "Draciel Shield", type: "Defense", imageLink: "https://i.ibb.co/v49kxWw/Draciel.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = DracielShield;