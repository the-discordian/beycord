const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    let bool;
    if (acted.hp <= Math.round((acted.maxhp/100)*30)) bool = true;
    else bool = false;
    return bool;
  }, function passed(acted, victim, message){
    if (acted.stamina > Math.round((acted.maxstamina/100)*50)) {
		acted.bey.type = "Attack";
		victim.hp = victim.hp - 35;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Shelter Regulus activated **Tower Change**.`)
	.setDescription(`Regulus' high spin velocity caused the tabs on it's Tower driver to extend out, retracting the tip on in for a decrease in height, and extend it's contact points out for a more aggressive design. Regulus' type has changed to **Attack** allowing it to claw away at the opponent with it's contact points to dish out 35 damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.stamina <= Math.round((acted.maxstamina/100)*50)) {
		 acted.bey.type = "Defense";
		 acted.stamina = acted.stamina + 1;
		 victim.atk = Math.round((victim.atk/100)*80);
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Shelter Regulus activated **Tower Change**.`)
	.setDescription(`Regulus' low spin velocity caused the tabs on it's Tower driver to pull in, extending the tip on it for a increase in height, and retract it's contact points for a more defensive design. Regulus' type has changed to **Defense**. 20% damage reduced from incoming basic attacks and stamina increased by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }}, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
    
    if (acted.stamina > Math.round((acted.maxstamina/100)*50)) {
		let before = victim.hp;
    let base = 70;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.5; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	acted.stamina = acted.stamina - 2;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Shelter Regulus used **Fang Attack**. `)
	.setDescription(`Regulus' extended claw-like contact points individually struck the opponent for a quick multi-hit attack, dealing ${diff} damage. The consistent contact dropped Regulus' stamina by 2.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.stamina <= Math.round((acted.maxstamina/100)*50)) {
		 victim.atk = Math.round((victim.atk/100)*20);
		 acted.atk = victim.atk;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Shelter Regulus used **Shelter Defense**. `)
	.setDescription(`Regulus took the center of the stadium, using it's taller height to avoid direct contact with the opponent and instead make them collide against Regulus' Star frame, reducing 80% of incoming basic attack damage and inflicting the attack damage back at the opponent.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const ShelterRegulus = new bcworkshop.Beyblade({name: "Shelter Regulus", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/b/b9/Beyblade_Shelter_Regulus.png/revision/latest?cb=20180716235739"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ShelterRegulus;