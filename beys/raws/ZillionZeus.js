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
    
    
    if (acted.stamina > Math.round((acted.maxstamina/100)*50)) {
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
		acted.stamina = acted.stamina + 3;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Zillion Zeus used **Infinity Launch**.`)
	.setDescription (`The iron balls within Zeus moved to the outer part of the layer, increasing outward weight distribution and increasing stamina by 3. The weight distribution allowed Zeus to counter enemy attacks and deal ${diff} damage!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.stamina <= Math.round((acted.maxstamina/100)*50)) {
		 acted.stamina = acted.stamina + 1;
		 victim.atk = Math.round((victim.atk/100)*30);
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Zillion Zeus used **Iron Launch**.`)
	.setDescription (`The iron balls within Zeus' layer moved to the center, granting a centralized weight distribution and preventing stamina loss this turn! The shifted weight absorbed some attacks, reducing incoming damage by 70%.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const ZillionZeus = new bcworkshop.Beyblade({name: "Zillion Zeus", type: "Stamina", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656759980621844/image2.png?width=655&height=587"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = ZillionZeus;