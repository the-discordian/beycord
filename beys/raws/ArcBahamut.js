const bcworkshop = require("bcworkshop");

function FinalGuardRequirement(acted, victim, logger){//Final Guard Requirements
     return acted.hp <= (acted.maxhp/100 * 25);
}

function FinalGuardEffect(acted, victim, logger){//Final Guard Effects
     victim.atk -= (victim.atk/100 * 50 + .30 * acted.lvl);
     acted.stability += 3;
}

const FinalGuard = new bcworkshop.Mode("Final Guard", FinalGuardRequirement, FinalGuardEffect);


function FinalCrashRequirement(acted, victim, logger){//Final Crash Requirements
     return acted.sp <= 3 && acted.hp <= (acted.maxhp/100 * 25) && victim.move == "fight";
}

function FinalCrashEffect(acted, victim, logger){//Final Crash Effects
     acted.hp += (acted.maxhp/100 * 10 + .15 * acted.lvl);
     victim.hp -= (victim.atk * 2);
     acted.sp -= 3;
     logger.add(`[${acted.username}] Arc Bahamut used **Final Crash**!`);
}

const FinalCrash = new bcworkshop.Passive("Final Crash", FinalCrashRequirement, FinalCrashEffect, 30);


function LoneWolfResonanceRequirements(acted, victim, logger){//Lone Wolf Resonance Requirements
     return acted.sp <= 4 && acted.hp <= (acted.maxhp/100 * 25);
}

function LoneWolfResonanceEffects(acted, victim, logger){//Lone Wolf Resonance Effects
      acted.hp += (victim.atk/100 * 60 + .3 * acted.lvl);
      acted.stability += 20;
      victim.atk = (victim.atk/100 * 40 - .3 * acted.lvl);
      acted.sp -= 4
      logger.add(`[${acted.username}] prefers going solo... Arc Bahamut used **Lone Wolf's Resonance**!`);
}

const LoneWolfResonance = new bcworkshop.Special("Lone Wolf's Resonance", LoneWolfResonanceRequirements, LoneWolfResonanceEffects);


const ArcBahamut = new bcworkshop.Beyblade({name: "Arc Bahamut", type: "Defense", imageLink: "https://static.wikia.nocookie.net/beyblade/images/e/ea/Beyblade_Arc_Bahamut.png/revision/latest/scale-to-width-down/226?cb=20180717000037", aliases: ["Arc Balkesh"]})
.attachSpecial(LoneWolfResonance)
.attachPassive(FinalCrash)
.attachMode(FinalGuard)
.setDefaultSD("Left");

module.exports = ArcBahamut;