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
    .setTitle(`[${acted.username}] Screw Trident failed to use **Screw Counter**`)
	.setDescription(`but has failed sense the opponent didn't deliver a basic attack to steal spin power from!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
		 let before = victim.hp;
    let base = 30;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.3; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	 acted.atk = victim.atk;
	 acted.stamina = acted.stamina + 2;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Screw Trident used **Screw Counter**.`)
	.setDescription(`Trident used the rebounding rubber on it's layer to absorb the opponent's attack, the increase in spin velocity granting Trident 2 stamina and speed boost as it dashed around the stadium perimeter before smashing head on into the opponent for ${diff} damage + the opponent's attack damage."`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const ScrewTrident = new bcworkshop.Beyblade({name: "Screw Trident", type: "Stamina", imageLink: "https://i.ibb.co/qnq4y25/trident.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ScrewTrident;