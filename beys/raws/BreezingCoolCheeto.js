const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
        victim.atk = Math.round((victim.atk/100)*80);
        //Gentle Breeze
        acted.stamina = acted.stamina + 0.5;
        //Freezing Driver
        if(acted.hp < (acted.maxhp/100*50)){
            acted.atk = Math.round(acted.atk/100*125);
            acted.stamina = acted.stamina - 1;
        }
        //Cold Hearted
        if(!acted.bey.gaveEnergy){
            acted.sp = 3;
            acted.bey.gaveEnergy = true;
        }
        //Ready for the breeze
    }, function passed(acted, victim, message){
    victim.hp = victim.hp - 28;
    let embed = new Discord.MessageEmbed()
    .setTitle(`Uh oh, [${acted.username}] ${acted.bey.bbname || acted.bey.name} tried to use it's passive ability but it was not set up properly. 28 damage dealt.`)
    .setDescription("Please report this at the support server.")
    .setColor("#551a8b");
    message.channel.createMessage({embed: embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
        
        victim.hp = (victim.hp - (acted.atk + victim.atk))/100*70;
        acted.hp = acted.hp/100*85;
        acted.stamina = acted.stamina - 2;
        victim.stamina = victim.stamina + 2;
        let embed = new Discord.MessageEmbed()
        .setTitle(`[${acted.username}] Breezing Cool Cheeto used **Ice Cream**. [${victim.username}] ${victim.bey.name} got a taste of their own ice cream and received their own damage buffed by the special user's.`)
        .setDescription("Breezing Cool Cheeto overloaded decreasing its hitpoints by 25% as well as losing 2 stamina.")
        .setColor("#551a8b");
        message.channel.createMessage({embed: embed});
    });

const BreezingCoolCheeto = new bcworkshop.Beyblade({name: "Breezing Cool Cheeto", type: "Stamina", imageLink: "https://media.discordapp.net/attachments/750866365526573066/751899287905894551/FreezingcoldCheeto.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = BreezingCoolCheeto;