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
    
    
    if (acted.bey.sd == "Right") {
		 let before = victim.hp;
    let base = 40;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
		 acted.atk = Math.round((victim.atk/100)*50);
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Spriggan Requiem used **Requiem Slash**.`)
	.setDescription(`Spriggan's clockwise rotation allowed it to utilize it's higher stamina, slamming into the opponent aggressively causing them to spiral out of control. Exposing them to a fierce attack from Spriggan that dealt ${diff} + half the opponent's attack damage!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 if (acted.stamina > victim.stamina){
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
		acted.atk = Math.round((victim.atk/100)*50);
		victim.stamina = victim.stamina + 2;
		 let embed3 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Spriggan Requiem used **Requiem Slash**.`)
	.setDescription(`Spriggan's clockwise rotation allowed it to utilize it's higher stamina, slamming into the opponent aggressively to increase their stamina and overload the opponent's stamina, increasing it by 2 and causing them to spiral out of control. Exposing them to a fierce attack from Spriggan that dealt ${diff} + half the opponent's attack damage!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed3})};
	 } else if (acted.bey.sd == "Left") {
	 victim.stamina = victim.stamina - 2;
	 acted.stamina = acted.stamina + 1;
	 victim.atk = Math.round((victim.atk/100)*50);
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Spriggan Requiem used **Requiem Spin**.`)
	.setDescription(`Spriggan used the rubber on it's layer to absorb the opponent's attack and spin power dropping their stamina by 2 while, reducing damage by 50% and increasing stamina by 1 this turn.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const SpryzenRequiem = new bcworkshop.Beyblade({name: "Spryzen Requiem", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/b/be/Beyblade_Spriggan_Requiem.png/revision/latest?cb=20200211223148"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("Right")
.setSDChangable(true);

module.exports = SpryzenRequiem;