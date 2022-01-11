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
    
	 if (acted.hp > 60) {
		 
		 let before = victim.hp;
    let base = 55;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.1; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
		 acted.stamina = acted.stamina - 1;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Xcalibur used **The One Impact**.`)
	.setDescription(`Xcalibur used the Saber on it's layer to strike the opponent with a strong, concentrated attack for ${diff} damage! The natural imbalance in the layer reduced stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.hp <= 60) {
		 
		 let before = victim.hp;
    let base = 70;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	 acted.stamina = acted.stamina - 2;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Xcalibur used **Xtreme Impact**.`)
	.setDescription(`Xcalibur's Force disc aligned with the sword on it's layer, boosting it's power at the cost of a heavy imbalance, reducing stamina by 2. Xcalibur used this boost in power to slice the opponent for ${diff} damage!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
	 }
	 });

const Xcalibur = new bcworkshop.Beyblade({name: "Xcalibur", type: "Attack", imageLink: "https://i.ibb.co/q0PxGcY/xcalibur.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Xcalibur;