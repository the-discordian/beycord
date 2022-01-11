const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    let bool;
    if (acted.hp <= Math.round((acted.maxhp/100)*50)) bool = true;
    else bool = false;
    return bool;
  }, function passed(acted, victim, message){
	  victim.hp = victim.hp - 30;
	  acted.stamina = acted.stamina + 1;
    let embed = new Discord.MessageEmbed()
  .setTitle(`[${acted.username}] Sieg Xcalibur activated **Full Metal Surge**.`)
  .setDescription(`Xcalibur utilized the shifted weight from reaching the halfway point to bursting, the 1 disc aligned with the layer created a single concentrated point of contact on the sword to deal a heavyweight 30 damage attack to the opponent. The flat, metal Iron driver compensates for some of the imbalance caused by this, increasing stamina by 1.`)
   .setColor("#551a8b");
    message.channel.createMessage({embed:embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
	
	  if (acted.hp > 60) {
		 
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
	
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Xcalibur used **Double Impact**.`)
	.setDescription(`Xcalibur utilized the metal within the sword on it's layer to deliver a fierce and heavy strike to the opponent for ${diff} damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.hp <= 60) {
		 
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
	
	 acted.stamina = acted.stamina - 1;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Xcalibur used **Triple Impact**.`)
	.setDescription(`Xcalibur took advantage of the shifted weight from it's 1 disc being aligned with the sword on it's layer, using the extra heavy weight to deliver a heavyweight blow to the opponent for ${diff} damage. The loss in stability from the shifted weight dropped stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
	 }
  });

const SiegXcalibur = new bcworkshop.Beyblade({name: "Sieg Xcalibur", type: "Attack", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657288373796926/image0.png?width=606&height=587"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = SiegXcalibur;