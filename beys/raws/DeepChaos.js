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
    .setTitle(`[${acted.username}] Deep Chaos failed use **Levitation Launch**.`)
		.setDescription(`Chaos cannot use Lift Launch, sense the opponent did not use a basic attack.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
		 let before = victim.hp;
    let base = 30;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
	
	 victim.atk = Math.round((victim.atk/100)*75);
	 victim.hp = victim.hp - 30;
	 acted.stamina = acted.stamina + 2;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Deep Chaos used **Levitation Launch**.`)
	.setDescription(`Chaos used the momentum of it's opponent's attack and the Flow frame to glide into the air briefly, landing on it's Bearing driver delicately to reduce stamina loss and the impact of the opponent's attack, granting 2 stamina and 25% damage reduction. Chaos retaliated by using the spring loaded fang-like contact points, striking the opponent with the sharp point to deal ${diff} damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }
  });

const DeepChaos = new bcworkshop.Beyblade({name: "Deep Chaos", type: "Stamina", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/4/47/Beyblade_Deep_Chaos.png/revision/latest?cb=20180717000213"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = DeepChaos;