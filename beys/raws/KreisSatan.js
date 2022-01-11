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
    
    
    switch(true){
      case victim.atk = 0 && acted.stamina > Math.round((acted.maxstamina/100)*70):
        let embed = new Discord.RichEmbed()
          .setTitle(`[${acted.username}] Kreis Satan used **Cyclone Loop**.`)
		  .setDescription(`Satan used the free-spinning wheels on it's Loop tip to catch onto the stadium slope and speed up at the cost of 1 stamina, before smashing into the opponent for ${diff} damage!`)
          .setColor("#551a8b");
		  let before = victim.hp;
    let base = 70;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.15; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
		  acted.stamina = acted.stamina - 1;
        message.channel.createMessage({embed:embed});
        break;
      case victim.atk = 0 && acted.stamina < Math.round((acted.maxstamina/100)*70):
        let embed2 = new Discord.RichEmbed()
          .setTitle(`[${acted.username}] Kreis Satan failed to use **Cyclone Loop**.`)
		  .setDescription(`Satan tried to use Cyclone loop, but it failed due to interference by the opponent or lack of stamina!`)
          .setColor("#551a8b");
        message.channel.createMessage({embed:embed2});
        break;
		case victim.atk > 0 && acted.stamina > Math.round((acted.maxstamina/100)*70):
		let before2 = victim.hp;
    let base2 = 30;
    let plus2 = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus2 = plus2 + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg2 = base2 + plus2;
    victim.hp = victim.hp - dmg2;
    let after2 = victim.hp;
    let diff2 = before2 - after2;
		  victim.atk = Math.round((victim.atk/100)*40);
        let embed3 = new Discord.RichEmbed()
          .setTitle(`[${acted.username}] Kreis Satan used **Roller Drift**.`)
		  .setDescription(`Satan was knocked off balance by the enemy's attack, using the free-spinning wheels on it's Loop tip to reduce damage by 60%, and drift around the stadium, smashing into the enemy for ${diff}!`)
          .setColor("#551a8b");
        message.channel.createMessage({embed:embed3});
		break;
		case victim.atk > 0 && acted.stamina < Math.round((acted.maxstamina/100)*70):
        let embed4 = new Discord.RichEmbed()
          .setTitle(`[${acted.username}] Kreis Satan failed to use **Roller Drift**.`)
		  .setDescription(`Satan tried to use Roller Drift, but it couldn't gather the friction against the wheels to do so due to being unable to tilt from a incoming attack! Or maybe stamina issues?`)
          .setColor("#551a8b");
        message.channel.createMessage({embed:embed4});
		break;
  }});

const KreisSatan = new bcworkshop.Beyblade({name: "Kreis Satan", type: "Defense", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657411175677992/image0.png?width=610&height=586"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = KreisSatan;