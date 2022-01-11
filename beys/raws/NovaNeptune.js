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
    acted.hp = acted.hp + 40;
	acted.stamina = acted.stamina + 2;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Nova Neptune used **Wave Launch**. 40 health recovered. 2 stamina gained`)
    .setColor("#551a8b");
    
    message.channel.send(embed);
  });

const NovaNeptune = new bcworkshop.Beyblade({name: "Nova Neptune", type: "Balance", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/4/44/BB_Nova_Neptune_Vertical_Trans_Beyblade.png/revision/latest?cb=20180718173922"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = NovaNeptune;