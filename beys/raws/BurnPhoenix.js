const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function FrictionActiveRequirement(acted, victim, logger){//Friction Active Requirement
     return acted.move == "fight" && acted.bey.Friction <= 40 || (acted.move == "spin" && acted.bey.Friction <= 40);
}

function FrictionActiveEffect(acted, victim, logger){//Friction Active Effect
     if (acted.sp <= 0){acted.bey.Friction += (acted.stamina/4);}
     else{acted.bey.Friction += (acted.stamina/3);};
}

const FrictionActive = new bcworkshop.Passive("Friction Gauge", FrictionActiveRequirement, FrictionActiveEffect, 0);


function FrictionPassiveRequirement(acted, victim, logger){//Friction Passive Requirement
     return acted.bey.Friction <= 40;
}

function FrictionPassiveEffect(acted, victim, logger){//Friction Passive Effect
    if (acted.sp <= 0){acted.bey.Friction += (acted.stamina/4);}
    else{acted.bey.Friction += (acted.stamina/3);
    acted.sp -= .5;};
}

const FrictionPassive = new bcworkshop.Mode("Friction", FrictionPassiveRequirement, FrictionPassiveEffect);


function CBERequirement(acted, victim, logger){//CBE Requirement
     return acted.bey.Friction >= 40;
}

function CBEEffect(acted, victim, logger){//CBE Effect
     victim.hp -= (acted.atk * 3);
     victim.stability -= 25;
     victim.atk = (victim.atk/2);
     acted.bey.Friction -= 40;
     logger.add(`[${acted.username}] Burn Phoenix used **Combusting Burning Explosion**!`);
}

const CombustingBurningExplosion = new bcworkshop.Special("Combusting Burning Explosion", CBERequirement, CBEEffect);


function CosmicForceRequirement(acted, victim, logger){//CosmicForce Requirement
     return acted.bey.Friction >= 25;
}

function CosmicForceEffect(acted, victim, logger){//CosmicForce Effect
     acted.hp += (acted.maxhp/4);
     acted.stability += 25;
     victim.atk = (victim.atk/100 * 20);
     acted.bey.Friction -= 25;
     logger.add(`[${acted.username}] Burn Phoenix used **Cosmic Force**!`)
}

const CosmicForce = new bcworkshop.Special("Cosmic Force", CosmicForceRequirement, CosmicForceEffect);


const BurnPhoenix = new bcworkshop.Beyblade({name: "Burn Phoenix", type: "Stamina", imageLink: "https://static.wikia.nocookie.net/beyblade/images/4/44/BP.Y.Wd.png/revision/latest?cb=20200221183032", aliases: ["Burn Fireblaze"]})
.addProperty("Friction", 0)
.attachPassive(FrictionActive)
.attachMode(FrictionPassive)
.attachSpecial(CombustingBurningExplosion)
.attachSpecial(CosmicForce)
.setDefaultSD("Right")
module.exports = BurnPhoenix;