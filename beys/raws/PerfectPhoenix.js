const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
          let bool;
          if(acted.hp < (acted.maxhp / 100 * 65)) bool = true;
          else bool = false;
          return bool;
      }, function passed(acted, victim, message){
          if(acted.bey.armour){
              victim.atk = 0;
              victim.hp = victim.hp - 20;
            let embed = new Discord.MessageEmbed()
            .setAuthor("Passive Ability")
            .setTitle(`[${acted.username}] Perfect Phoenix used **Perfect Shield**. Opponent's damage nullified while also dealing 20 damage.`)
            .setColor("#551a8b");
            message.channel.createMessage({embed: embed});
          }else{
              acted.hp = acted.hp + 20;
              acted.stamina = acted.stamina + 1;
              let embed2 = new Discord.MessageEmbed()
            .setAuthor("Passive Ability")
            .setTitle(`[${acted.username}] Perfect Phoenix used **Perfect Weight**. 20 hitpoints healed and stamina increased by 1.`)
            .setColor("#551a8b");
            message.channel.createMessage({embed: embed2})
          }
      }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
        let decide = Math.round(Math.random() * 1);
        if(decide === 1){
        
        victim.hp = victim.hp - 59;
        acted.stamina = acted.stamina - 1;
        let embed = new Discord.MessageEmbed()
        .setTitle(`[${acted.username}] Perfect Phoenix used **Perfect Crush**. 59 damage dealt, 1 stamina reduced and armour removed.`)
        .setColor("#551a8b");
        acted.bey.armour = false;
        message.channel.createMessage({embed: embed});
        }else{
            
        victim.hp = victim.hp - 50;
        victim.atk = victim.atk - 10;
        let embed = new Discord.MessageEmbed()
        .setTitle(`[${acted.username}] Perfect Phoenix used **Perfect Armour Press**. 56 damage dealt and armour removed while also reducing opponent's damage by 10.`)
        .setColor("#551a8b");
        acted.bey.armour = false;
        message.channel.createMessage({embed: embed});
        }
      });

const PerfectPhoenix = new bcworkshop.Beyblade({name: "Perfect Phoenix", type: "Balance", imageLink: "https://media.discordapp.net/attachments/490783690323001345/726759768110268426/image-removebg-preview_2.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = PerfectPhoenix;