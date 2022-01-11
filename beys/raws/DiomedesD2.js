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
		 victim.atk = Math.round((victim.atk/100)*60);
		 acted.stamina = acted.stamina + 1;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Diomedes D2 used **Shield Stance**.`)
	.setDescription (`Diomedes used the weight of it's Triple disc concentrated into the wall shaped design of it's layer to block 40% damage and preventing stamina loss this turn.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.hp <= Math.round((acted.maxhp/100)*50)) {
		 
		  let before = victim.hp;
    let base = 75;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Diomedes D2 used **Triple Sniper**.`)
	.setDescription (`Diomedes used the Triple disc, aligned with it's three arrowhead contact points to concentrate weight into them, further strengthened by the Accel tip's flat surface to enhance speed for a fierce head on attack at the opponent, dealing ${diff} damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const DiomedesD2 = new bcworkshop.Beyblade({name: "Diomedes D2", type: "Attack", imageLink: "https://i.ibb.co/6mmdWk0/diomedes.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = DiomedesD2;