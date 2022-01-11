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
    
    
    if (acted.stamina > Math.round((acted.maxstamina/100)*50)) {
		acted.stamina = acted.stamina + 2;
		victim.atk = Math.round((victim.atk/100)*65);
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Galaxy Zeus used **Galaxy Launch**.`)
	.setDescription(`The four metal balls within Zeus' layer moved to the four corners of the layer, increasingly outward weight distribution and stamina via flywheel effect, increasing stamina by 2! The strong outward weight blocked 35% of damage from incoming basic attacks.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.stamina <= Math.round((acted.maxstamina/100)*50)) {
		 let before = victim.hp;
    let base = 55;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
		 acted.stamina = acted.stamina + 2;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Galaxy Zeus used **Starlight Barrage**.`)
	.setDescription(`The four metal balls within Zeus' layer moved closer to the center as stamina dropped, increasing centralized weight distribution and conserving stamina as well as spin velocity. Zeus utilized the increase in spin velocity to barrage attack the opponent with it's low recoil design, dealing ${diff} damage while increasing it's own stamina by 2`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
	 }
  });

const GalaxyZeus = new bcworkshop.Beyblade({name: "Galaxy Zeus", type: "Stamina", imageLink: "https://i.ibb.co/Q9B3csx/zeus.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = GalaxyZeus;