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
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Unlock Unicorn failed to use **Horn Launch**.`)
	.setDescription (`Unicorn attempted to use Horn Launch, but without any incoming attacks, it failed to do anything!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
		 
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
	
		 victim.stamina = victim.stamina - 1;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Unlock Unicorn used **Horn Launch**.`)
	.setDescription (`Unicorn used the numerous contact points on it's Needle driver to create friction and resist the enemy attack, allowing it to stop knockback as it instead drove it's horn straight into the opponent for ${diff} damage, the destabilization from the attack dropped the opponent's stamina by 1.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const UnlockUnicorn = new bcworkshop.Beyblade({name: "Unlock Unicorn", type: "Defense", imageLink: "https://i.ibb.co/fFqZBQf/Unicorn.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = UnlockUnicorn;