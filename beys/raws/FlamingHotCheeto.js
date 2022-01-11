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
        

        victim.hp = victim.hp - 58;
        acted.stamina = acted.stamina + 1;
        victim.stamina = victim.stamina - 1;

        let embed = new Discord.MessageEmbed()
        .setTitle(`[${acted.username}] Flaming Hot Cheeto used **Cheeto Stain Tornado**. 58 damage dealt and 1 stamina absorbed.`)
        .setColor("#551a8b");
    
        message.channel.send(embed);
    });

const FlamingHotCheeto = new bcworkshop.Beyblade({name: "Flaming Hot Cheeto", type: "Stamina", imageLink: "https://cdn.discordapp.com/attachments/698014789850365992/698058848602161152/FlamingHotCheeto.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = FlamingHotCheeto;