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
    
    
    if (acted.hp > Math.round((acted.maxhp/100)*50)) {
		let before = victim.hp;
    let base = 50;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.3; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Beat Kukulcan used **Thunder Attack**.`)
	.setDescription(`Kukulcan utilized the depression in the center of it's Hunter driver, imitating a hollowed tip with a lack of surface area, but using the rubber to create a tight spin path, allowing it to barrage the opponent with swift attacks for ${diff} damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.hp <= Math.round((acted.maxhp/100)*50)) {
		 let before = victim.hp;
    let base = 50;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	 victim.stamina = victim.stamina - 1;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Beat Kukulcan used **Trigger Attack**.`)
	.setDescription(`Kukulcan's sublayer under the main shifted as it took damage and grew closer to bursting, unlocking the yellow claw-like contact points and causing them to extend out from centrifugal force. Kukulcan slammed into the opponent, the exposed contact points dishing out a heavy attack for ${diff} damage. The destabilization that followed dropped the opponent's stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
	 }
  });

const BeatKukulcan = new bcworkshop.Beyblade({name: "Beat Kukulcan", type: "Attack", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/6/65/Beyblade_Beat_Kukulcan.png/revision/latest?cb=20180716231833"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = BeatKukulcan;