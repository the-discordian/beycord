const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    let bool;
    if (acted.stamina <= Math.round((acted.maxstamina/100)*70) && acted.hp > Math.round((acted.maxhp/100)*80)) bool = true;
    else bool = false;
    return bool;
  }, function passed(acted, victim, message){
    victim.hp = victim.hp - (acted.atk * 2)
    let embed = new Discord.MessageEmbed()
  .setTitle(`[${acted.username}] God Valkyrie activated **God Reboot**.`)
  .setDescription(`Valkyrie's spin velocity dropped low enough to cause the spring loaded tabs in it's Reboot driver to pull in, causing the extended plastic tip to pull in and let the plastic base make contact with the stadium, granting Valkyrie a immense boost in spin velocity that strengthened it enough to deal double it's basic attack damage to the opponent.`)
   .setColor("#551a8b");
    message.channel.createMessage({embed:embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
	
	 let before = victim.hp;
    let base = 40;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.25; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
    
	acted.stamina = acted.stamina + 1;
    //Change "victim.hp = victim.hp - 123" to "victim.hp = victim.hp - <damage number>. This and the line below can be removed if the special move does not deal any damage.
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
	.setTitle(`[${acted.username}] God Valkyrie used **Jet Bound Launch**.`)
	.setDescription(`Valkyrie initiated it's Jet Launch technique, smashing into the stadium walls repeatedly and bouncing off them to increase speed. It combined this with the spring blades in it's layer, allowing it to repel off each one for a increased speed boost and to prevent stamina loss this turn. Valkyrie slashed into the enemy repeatedly with it's immense speed for ${diff} damage.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const GodValkyrie = new bcworkshop.Beyblade({name: "God Valkyrie", type: "Attack", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657119175835679/image0.png?width=682&height=586"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = GodValkyrie;