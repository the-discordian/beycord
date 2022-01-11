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
    
    
    if (acted.hp > Math.round((acted.maxhp/100)*60)) {
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
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Xeno Xcalibur used **One Impact**.`)
	.setDescription (`Xcalibur used the saber on it's layer to slash away at the opponent with incredible force, dealing ${diff} damage!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.hp <= Math.round((acted.maxhp/100)*60)) {
		 let before = victim.hp;
    let base = 60;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	 acted.stamina = acted.stamina - 1;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Xeno Xcalibur used **Double Impact**.`)
	.setDescription (`Xcalibur's Magnum disc aligned with the saber on it's layer, allowing it to slash away at the opponent with incredible weight behind the attack, dealing ${diff} damage! The imbalance this causes reduced stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const XenoXcalibur = new bcworkshop.Beyblade({name: "Xeno Xcalibur", type: "Attack", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656759519117332/image1.png?width=631&height=586"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = XenoXcalibur;