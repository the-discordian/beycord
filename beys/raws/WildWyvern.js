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
    
    //Change "victim.hp = victim.hp - 123" to "victim.hp = victim.hp - <damage number>. This and the line below can be removed if the special move does not deal any damage.
	victim.atk = Math.round((victim.atk/100)*30);
	acted.atk = victim.atk;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Wild Wyvern used **Shield Crash**.`)
	.setDescription (`Wyvern used it's free spinning Orbit tip to negate 70% incoming damage, instead riding up the slope of the stadium before coming back down with more force, slamming into the enemy for ${diff} damage + the enemy's attack damage!`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const WildWyvern = new bcworkshop.Beyblade({name: "Wild Wyvern", type: "Defense", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656759148969994/image0.png?width=645&height=586"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = WildWyvern;