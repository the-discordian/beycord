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
    victim.stamina = victim.stamina - 1;
	acted.stamina = acted.stamina + 1;
	acted.hp = acted.hp + 30;
    //For more options check the README.md
    
    //Make sure to change the "Name", "Special Name" and damage dealt below.
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Blaze Ragnaruk used **True Ragnaruk Zone**.`)
	.setDescription(`Ragnaruk's centrifugal force opened the wings on it's layer, supported by it's Flugel driver to generate a tornado that bolstered it's stability, recovering 30 hp and negating stamina loss this turn. The tornado Ragnaruk created parried some of the opponent's blows as a stalling tactic, draining their stamina by 1.`)
    .setColor("#551a8b");
    
    message.channel.createMessage({embed: embed});
  });

const BlazeRagnaruk = new bcworkshop.Beyblade({name: "Blaze Ragnaruk", type: "Stamina", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657119603785728/image1.png?width=600&height=586"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = BlazeRagnaruk;