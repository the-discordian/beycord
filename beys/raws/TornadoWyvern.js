const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    let bool;
    if (acted.hp > Math.round((acted.maxhp/100)*50) && acted.stamina >= 6 && !acted.bey.passiveUsed) bool = true;
    else bool = false;
    return bool;
  }, function passed(acted, victim, message){
    acted.bey.passiveUsed = true;
	  acted.stamina = acted.stamina + 2;
    victim.atk = Math.round((victim.atk/100)*75);
    let embed = new Discord.MessageEmbed()
  .setTitle(`[${acted.username}] Tornado Wyvern activated **Tornado Parry**.`)
  .setDescription(`Wyvern used the free spinning blades on it's layer to parry the opponent, preserving it's own stamina and increasing it by 2. The parried blow was reduced by 50% and inflicted back on the attacker.`)
   .setColor("#551a8b");
    message.channel.createMessage({embed:embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
    
   let before = victim.hp;
    let base = 55;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.1; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	victim.hp = victim.hp - acted.atk;
	victim.atk = Math.round((victim.atk/100)*65);
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Tornado Wyvern used **Hyper Shield Crash**.`)
	.setDescription(`Wyvern used it's free spinning layer to reduce incoming damage by 35%, while riding up the stadium slope to the very ledge and coming back down to slam into the opponent for ${diff} damage plus the opponent's attack damage.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const TornadoWyvern = new bcworkshop.Beyblade({name: "Tornado Wyvern", type: "Defense", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657120278806568/image2.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.addProperty("passiveUsed", false)
.setSDChangable(false);

module.exports = TornadoWyvern;