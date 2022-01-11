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
    let base = 70;
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
    .setTitle(`[${acted.username}] Gigant Gaia used **Swing Launch**.`)
	.setDescription (`Gaia used the wavering spin caused by it's Quarter disc to deliver a heavy smash attack to it's opponent worth ${diff} damage! The unbalanced nature dropped stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
		 let before = victim.hp;
    let base = 40;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.1; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	 acted.atk = victim.atk;
	 victim.atk = Math.round((victim.atk/100)*40);
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Gigant Gaia used **Swing Counter**.`)
	.setDescription (`Gaia negated 60% of the enemy attack, instead using the momentum to ride up the stadium and come back down to slam into the opponent for ${diff} damage + the enemy's attack power!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const GigantGaia = new bcworkshop.Beyblade({name: "Gigant Gaia", type: "Balance", imageLink: "https://i.ibb.co/x86gbcw/Gaia.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = GigantGaia;