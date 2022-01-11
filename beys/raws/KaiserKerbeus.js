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
	   victim.stamina = victim.stamina - 2;
	   acted.stamina = acted.stamina + 2;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Kaiser Kerbeus used **Chain Launch**.`)
	.setDescription (`Kerbeus went on the offense, using it's defensive, chain-like layer to attack the opponent as the chains shredded away at the opponent's stamina, draining it by 2 while increasing it's own by 2!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (victim.atk > 0) {
	 victim.atk = Math.round((victim.atk/100)*50);
	 acted.stamina = acted.stamina + 2;
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Kaiser Kerbeus used **Chain Launch**.`)
	.setDescription (`Kerbeus used it's defensive, chain-like layer to parry the enemy attacks and reduce incoming damage by 50%, reducing recoil enough to preserve stamina and increase it by 2!`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const KaiserKerbeus = new bcworkshop.Beyblade({name: "Kaiser Kerbeus", type: "Defense", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/8/88/Beyblade_Kerbeus.png/revision/latest?cb=20181219001015"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = KaiserKerbeus;