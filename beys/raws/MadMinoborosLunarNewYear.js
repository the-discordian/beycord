const bcworkshop = require("bcworkshop");

function FireworksQuakeRequirement(acted, victim, logger){
    return acted.sp >= 3;
}

function FireworksQuakeUse(acted, victim, logger){
    victim.hp -= (50 + .7 * acted.level);
    logger.add(`[${acted.username}]Mad Minoboros Lunar New Year Ver. used **Fireworks Quake**!`);
}

const FireworksQuake = new bcworkshop.Special("Fireworks Quake", FireworksQuakeRequirement, FireworksQuakeUse);


function MinoborosNewYearRequirement(acted, victim, logger){
    return acted.sp >= 3;
}

function MinoborosNewYearUse(acted, victim, logger){
    victim.hp -= (100 + 0.3 * acted.lvl);
    logger.add(`[${acted.username}] Mad Minoboros Lunar New Year Ver. used **Minoboros New Year**!`);
}

const MinoborosNewYear = new bcworkshop.Special("Minoboros New Year", MinoborosNewYearRequirement, MinoborosNewYearUse);


function GrazingCowRequirement(acted, victim, logger){
    return !acted.bey.FireworksCharge.active;
}

function GrazingCowUse(acted, victim, logger){
    acted.stamina += 2;
    acted.bey.firecharges += 1;
}

const GrazingCow = new bcworkshop.Passive("Grazing Cow", GrazingCowRequirement, GrazingCowUse)

function RagingBullRequirement(acted, victim, logger){
    return acted.hp < (Math.round(acted.maxhp/100*35)) && acted.bey.boostUsed === false;
}

function RagingBullUse(acted, victim, logger){
    acted.bey.boostUsed = true;
    acted.atk = Math.round(acted.atk/100*150);
    victim.atk = Math.round(victim.atk/100*75);
    acted.stamina = acted.stamina - 2;
    logger.add(`[${acted.username}] Mad Minoboros Lunar New Year Ver. got angry!`);
}

const AngryBull = new bcworkshop.Passive("Angry Bull", RagingBullRequirement, RagingBullUse, 0);

function FireworksChargeRequirement(acted, victim, logger){
    acted.hp = 100;
}

function FireworksChargeUse(acted, victim, logger){
    acted.stamina = acted.stamina + 3;
}

const FireworksCharge = new bcworkshop.Mode("Fireworks Charge", FireworksChargeRequirement, FireworksChargeUse)

const MadMinoborosLunarNewYearVer = new bcworkshop.Beyblade({name: "Mad Minoboros Lunar New Year Ver.", type: "Attack", imageLink: "https://i.imgur.com/SB7mdFU.png"})
.attachSpecial(FireworksQuake)
.attachSpecial(MinoborosNewYear)
.attachPassive(GrazingCow)
.attachPassive(AngryBull)
.attachMode(FireworksCharge)
.addProperty("firecharges", 0)
.addProperty("boostUsed", false);

module.exports = MadMinoborosLunarNewYearVer;