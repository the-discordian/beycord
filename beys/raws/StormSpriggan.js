const bcworkshop = require("bcworkshop");

function CounterBreakRequirement(acted, victim, logger){//Counter Break Requirement
    return victim.move == "fight" && acted.sp >= 3;
}

function CounterBreakEffect(acted, victim, logger){//Counter Break Effect
    switch(Math.floor(Math.random() * 2)){
         case 0:
              victim.hp -= (victim.atk/100 * (120 + .3 * acted.lvl));
              victim.atk -= (victim.atk/100 * (50 + .2 * acted.lvl));
              victim.stability -= 10;
              logger.add(`[${acted.username}] Storm Spriggan used **Counter Break**!`);
         break;
         case 1:
             victim.hp -= (victim.atk/100 * (120 + .6 * acted.lvl));
             victim.atk -= (victim.atk/100 * (30 + .4 * acted.lvl));
             victim.stability -= 20;
             logger.add(`[${acted.username}] Storm Spriggan used **True Counter Break**!`);
         break;
    }
    acted.sp -= 3;
}

const CounterBreak = new bcworkshop.Passive("Counter Break", CounterBreakRequirement, CounterBreakEffect, 80);


function UpperLaunchRequirement(acted, victim, logger){//Upper Launch Requirement
    return acted.sp >= 4;
}


function UpperLaunchEffect(acted, victim, logger){//Upper Launch Effect
    victim.hp -= (70 + .5 * acted.lvl);
    victim.stability -= 22;
    acted.stamina -= (1 + .006 * acted.lvl);
    acted.sp -= 4;
    logger.add(`[${acted.username}] Storm Spriggan used **Upper Launch**!`);
}

const UpperLaunch = new bcworkshop.Special("Upper Launch", UpperLaunchRequirement, UpperLaunchEffect);


function DeterminationResonanceRequirement(acted, victim, logger){//Determination Resonance Requirement
    return acted.hp <= (acted.maxhp/2);
}

function DeterminationResonanceEffect(acted, victim, logger){//Determination Resonance Effect
    acted.hp += (acted.maxhp/100 * 10 + .1 * acted.lvl);
    acted.stability += 25;
    logger.add(`[${acted.username}] is determined to win! **Determination Resonance** activated!`);
}

const DeterminationResonance = new bcworkshop.Passive("Determination Resonance", DeterminationResonanceRequirement, DeterminationResonanceEffect, 180);


const StormSpriggan = new bcworkshop.Beyblade({name: "Storm Spriggan", type: "Balance", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656330315202590/image2.png?width=601&height=586", aliases: ["Storm Spryzen"]})
.attachPassive(CounterBreak)
.attachSpecial(UpperLaunch)
.attachPassive(DeterminationResonance)
.setDefaultSD("Right");

module.exports = StormSpriggan; 