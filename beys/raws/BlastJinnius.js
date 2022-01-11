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
		 acted.hp = acted.hp + 40;
		 acted.stamina = acted.stamina + 1;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Blast Jinnius used **Cyclone Wall**.`)
	.setDescription(`Jinnius' outer layer slid up from centrifugal force, exposing a smooth surface that reduces knockback from incoming attacks greatly, healing 40 hp and increasing stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
		 let before = victim.hp;
    let base = 45;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	 acted.atk = victim.atk;
	 victim.atk = Math.round((victim.atk/100)*75);
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Blast Jinnius used **Cyclone Counter**.`)
	.setDescription(`Jinnius' outer layer fell back down into place as the opponent struck the smooth exposed surface, interfering with their attack and reducing the damage from it by 25%. As Jinnius' layer fell back down, it smashed the opponent into the stadium floor for ${diff} damage + the opponent's attack damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }
  });

const BlastJinnius = new bcworkshop.Beyblade({name: "Blast Jinnius", type: "Defense", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/e/ed/Beyblade_Jinnius.png/revision/latest?cb=20180716235324"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = BlastJinnius;