const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    let bool;
    if (acted.stamina <= Math.round((acted.maxstamina/100)*80) && acted.hp > Math.round((acted.maxhp/100)*80)) bool = true;
    else bool = false;
    return bool;
  }, function passed(acted, victim, message){
    victim.hp = victim.hp - (acted.atk * 2.5)
	acted.stamina = acted.stamina - 1;
    let embed = new Discord.MessageEmbed()
  .setTitle(`[${acted.username}] God Valkyrie activated **Ultimate Reboot**.`)
  .setDescription(`Valkyrie's Ultimate Reboot driver's tabs retract in, causing the rubber of the driver to make contact with the stadium floor and grant Valkyrie a massive boost in spin velocity, allowing it to move faster than ever as it smashed into the opponent for X2.5 it's basic attack damage! The rubber surface of Ultimate Reboot causes stamina to drop faster, reducing stamina by 1.`)
   .setColor("#551a8b");
    message.channel.createMessage({embed:embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
    
    if (acted.stamina > Math.round((acted.maxstamina/100)*20)) {
		let before = victim.hp;
    let base = 70;
    let plus = 0;
    for(var i = 0; i < acted.lvl; i++){
       plus = plus + 0.2; 
	   //+0.1 every level which means 1 more damage every 10 levels
    }
    let dmg = base + plus;
    victim.hp = victim.hp - dmg;
    let after = victim.hp;
    let diff = before - after;
		 let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Strike God Valkyrie used **God Slash**.`)
	.setDescription (`Valkyrie utilized the three locked blades on it's layer as a single, long blade that's bolstered by it's high spin velocity to slash across the enemy's layer for ${diff} damage.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed});
	 } else if (acted.stamina <= Math.round((acted.maxstamina/100)*30)) {
		 let embed2 = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Strike God Valkyrie failed to use **God Slash**.`)
	.setDescription (`Valkyrie's spin velocity isn't high enough to use God Slash properly.`)
    .setColor("#551a8b");
	message.channel.createMessage({embed: embed2});
  }});

const StrikeGodValkyrie = new bcworkshop.Beyblade({name: "Strike God Valkyrie", type: "Attack", imageLink: "https://vignette.wikia.nocookie.net/beyblade/images/7/77/Strike_god_valkyrie.png/revision/latest?cb=20181210105204"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = StrikeGodValkyrie;