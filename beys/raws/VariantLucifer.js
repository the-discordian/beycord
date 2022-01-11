const bcworkshop = new require("bcworkshop");
const { MessageEmbed } = require("discord.js");

//----------------------------------------------------------------------------------------------------------------
  function VarientPressCheck(acted, victim, logger){
    return acted.hp > Math.round((acted.maxhp/100)*90) && acted.sp >= 5;
}


function VarientPressExecute(acted, victim, logger){
    victim.hp -= 70 + 0.8 * acted.level;
    logger.add(`[${acted.username}] Variant Lucifer used **Varient Press**!`);
}

const VarientPress = new bcworkshop.Special("Varient Press", VarientPressCheck, VarientPressExecute);
//----------------------------------------------------------------------------------------------------------------
function VarientDisasterCheck(acted, victim, logger){
    return !acted.bey.VariantWall.active && acted.sp >= 5;
}


function VarientDisasterExecute(acted, victim, logger){
    victim.hp -= 70 + 0.4 * acted.level;
    victim.stabililty -= 10 + 0.1 * acted.lvl;
    logger.add(`[${acted.username}] Variant Lucifer used **Varient Press**!`);
}

const VarientDisaster = new bcworkshop.Special("Varient Disaster", VarientDisasterCheck, VarientDisasterExecute);
//----------------------------------------------------------------------------------------------------------------
function GodShatteringStarCheck(acted, victim, logger){
  return victim.hp < Math.round((victim.maxhp/100)*25);
}


function GodShatteringStarExecute(acted, victim, logger){
  acted.stabililty += 10 + 0.2 * acted.level;
  acted.atk = Math.round((acted.atk/100)*300);
  acted.hp = 25 + 5 * acted.level;
  acted.stamina = 1 + 0.02 * acted.level;
  logger.add(`[${acted.username}] Variant Lucifer winds up for a kill shot...`);
}

const GodShatteringStar = new bcworkshop.Passive("God Shattering Star",GodShatteringStarCheck, GodShatteringStarExecute, 60);
//----------------------------------------------------------------------------------------------------------------
function VariantWallCheck(acted, victim, logger){
  return acted.stamina > Math.round((acted.maxstamina/100)*60);
}


function VariantWallExecute(acted, victim, logger){
    if(acted.bey.VariantWall.active){
        victim.atk = Math.round(victim.atk/100*10);
        acted.stabililty -= 1 + 0.01 * (acted.level - 1);
        logger.add(`[${acted.username}] Variant Lucifer's rubber blades came out!`);
    }else{
        logger.add(`[${acted.username}] Variant Lucifer's rubber blades came back in.`);

    }

  }

const VariantWall = new bcworkshop.Passive("Variant Wall", VariantWallCheck, VariantWallExecute);


//----------------------------------------------------------------------------------------------------------------


const VariantLucifer = new bcworkshop.Beyblade({name: "Variant Lucifer", type: "Defense", imageLink: "https://static.wikia.nocookie.net/beyblade/images/1/1e/BBSK_Variant_Lucifer_Mobius_2D_Beyblade.png/revision/latest/scale-to-width-down/350?cb=20201028232600", aliases: ["Vex Lucius"]})
.attachPassive(GodShatteringStar)
.attachPassive(VariantWall)
.attachSpecial(VarientPress)
.attachSpecial(VarientDisaster)
.setDefaultSD("Right")
module.exports = VariantLucifer;