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
    
	
   if (victim.atk = 0) {
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Jail Jormungand failed to use **Undead Launch**.`)
	.setDescription (`Jail Jormungand attempted to use Undead Launch, but without any incoming attacks, it failed to do anything!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
	 victim.atk = Math.round((victim.atk/100)*30);
	 acted.stamina = acted.stamina + 3;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Jail Jormungand used **Undead Launch**.`)
	.setDescription (`Jormungard used the free spinning wings on it's Cycle tip to reduce incoming damage by 70%, preserving stamina and increasing it by 3!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const JailJormungand = new bcworkshop.Beyblade({name: "Jail Jormungand", type: "Stamina", imageLink: "https://i.ibb.co/C0gyWgj/jormuntor.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = JailJormungand;