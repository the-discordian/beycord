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
    
    
    //Change "victim.hp = victim.hp - 123" to "victim.hp = victim.hp - <damage number>. This and the line below can be removed if the special move does not deal any damage.
    victim.hp = victim.hp - 61;
	acted.stamina = acted.stamina - 1;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Victory Valkyrie Legend God Ver. used **Legend Flash Shoot**. 61 damage dealt and 1 stamina lost.`)
    .setColor("#551a8b");
    
    message.channel.send(embed);
  });

const VictoryValkyrieLegendGodVer = new bcworkshop.Beyblade({name: "Victory Valkyrie Legend God Ver.", type: "Attack", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/8/85/V2_ba_lgb.jpg/revision/latest/scale-to-width-down/350?cb=20171116150047"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = VictoryValkyrieLegendGodVer;