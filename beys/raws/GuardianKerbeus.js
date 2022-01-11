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
		let before = victim.hp;
    let base = 35;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.3; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
		acted.stamina = acted.stamina + 1;
		victim.stamina = victim.stamina - 1;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Guardian Kerbeus used **Underworld Chain Blitz**.`)
	.setDescription(`Kerbeus absorbed the opponent's attack through the chain on it's layer, the chain pressing in and rebounding Kerbeus away from the enemy and into a stadium wall. It smacked against the wall and went flying into the air, before Kerbeus came crashing back down atop it's opponent with the chain fully recoiling back before it rebounded the enemy and smashed them into the stadium floor, dealing ${diff} damage and dropping their stamina by 1. Kerbeus negated stamina loss this turn.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
	 victim.atk = Math.round((victim.atk/100)*70);
	 victim.stamina = victim.stamina - 2;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Guardian Kerbeus used **Heavy Guardian Barrier**.`)
	.setDescription(`Kerbeus used the weight of it's Heavy disc to keep itself steady as the chains pushed in to absorb enemy attacks, reducing incoming basic attack damage by 30% and stalling out the battle to drop the opponent's stamina by 2.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const GuardianKerbeus = new bcworkshop.Beyblade({name: "Guardian Kerbeus", type: "Stamina", imageLink: "https://i.ibb.co/FHhjdvm/guardian.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = GuardianKerbeus;