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
    
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Prime Apocalypse used **${victim.bey.move}**.`)
    .setColor("#551a8b");
    if(victim.bey.name === "Prime Apocalypse"){
      victim.hp = victim.hp - 59;
    }else{
    let fakesend = function(content){return true}
    let biomessage = {
        channel: {
            send: fakesend,
            createMessage: fakesend
        }
    }
    victim.bey.special(acted,victim,biomessage,player);
  }
    message.channel.send(embed);
  });

const PrimeApocalypse = new bcworkshop.Beyblade({name: "Prime Apocalypse", type: "Attack", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/e/ef/BBGT_Prime_Apocalypse_0Dagger_Ultimate_Reboot%27_Beyblade.png/revision/latest/scale-to-width-down/350?cb=20200114025326"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = PrimeApocalypse;