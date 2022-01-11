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
		 victim.stamina = victim.stamina - 2;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Legend Spriggan used **Upper Launch**.`)
	.setDescription(`Legend Spriggan climbed the slope of the stadium, speeding back down and using the sloped blade on it's layer to strike from under the opponent for ${diff} damage! Destabilization dropped the opponent's stamina by 2!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.bey.sd == "Left") {
		  let before2 = victim.hp;
    let base2 = 60;
    let plus2 = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus2 = plus2 + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg2 = base2 + plus2;
    victim.hp = victim.hp - dmg2;
    let after2 = victim.hp;
    let diff2 = before2 - after2;
		 acted.stamina = acted.stamina - 1;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Legend Spriggan used **Axe Launch**.`)
	.setDescription(`Spriggan used the spiky rubber on it's Merge driver to increase friction against the stadium, the larger surface area drastically boosting it's speed and power at the cost of 1 stamina. Spriggan swiftly changed it's trajectory as it used the flat contact point on it's layer to smash into the opponent for ${diff2} damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const LegendSpriggan = new bcworkshop.Beyblade({name: "Legend Spriggan", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/8/8d/Beyblade_Legend_Spriggan.png/revision/latest?cb=20200211223126"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("Right")
.setSDChangable(true);

module.exports = LegendSpriggan;