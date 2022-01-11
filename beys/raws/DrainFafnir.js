const bcworkshop = require("bcworkshop");

function DrainSpinRequirements(acted, victim, logger){//Drain Spin Requirements
     return acted.stamina < victim.stamina && acted.sp >= .5 && acted.sp <= 2.5 && victim.move == "fight"
}

function DrainSpinEffects(acted, victim, logger){//Drain Spin Effects
     victim.stamina -= (.1 + .001 * acted.lvl);
     acted.stamina += (.1 + .001 * acted.lvl);
     victim.stability -= 2;
     acted.stability += 2;
     acted.sp -= .5;
}

const DrainSpin = new bcworkshop.Mode("Drain Spin", DrainSpinRequirements, DrainSpinEffects);


function NothingBreakRequirements(acted, victim, logger){//Nothing Break Requirements
     return acted.stamina >= (acted.maxstamina/100 * 80) && acted.sp >= 3
}

function NothingBreakEffects(acted, victim, logger){//Nothing Break Effects
     acted.stamina -= (acted.maxstamina/100 * 40);
     victim.hp -= (acted.atk * 0.03 * acted.lvl);
     acted.sp -= 3;
     logger.add(`[${acted.username}] Drain Fafnir used **Nothing Break**!`);
}

const NothingBreak = new bcworkshop.Passive("Nothing Break", NothingBreakRequirements, NothingBreakEffects, 40);


function FullPowerResonanceRequirements(acted, victim, logger){//Full Power Resonance Requirements
     return acted.hp <= (acted.maxhp/100 * 40) && acted.sp >= .5
}

function FullPowerResonanceEffects(acted, victim, logger){//Full Power Resonance Effects
     acted.atk += (acted.atk/100 * .15 * acted.lvl);
     acted.sp -= .5;
}

const FullPowerResonance = new bcworkshop.Mode("Full Power Resonance", FullPowerResonanceRequirements, FullPowerResonanceEffects);


function TrueDrainSpinRequirements(acted, victim, logger){//True Drain Spin Requirements
     return acted.stamina < victim.stamina && acted.sp >= 3 && victim.move == "fight"
}

function TrueDrainSpinEffects(acted, victim, logger){//True Drain Spin Effects
     victim.stamina -= (1 + .002 * acted.lvl);
     acted.stamina += (1 + .002 * acted.lvl);
     victim.stability -= 4;
     acted.stability += 4;
     acted.sp -= .5;
}

const TrueDrainSpin = new bcworkshop.Mode("True Drain Spin", TrueDrainSpinRequirements, TrueDrainSpinEffects);


const DrainFafnir = new bcworkshop.Beyblade({name: "Drain Fafnir", type: "Stamina", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657411468886036/image1.png"})
.attachPassive(NothingBreak)
.attachMode(DrainSpin)
.attachMode(TrueDrainSpin)
.attachMode(FullPowerResonance)
.setDefaultSD("Left");

module.exports = DrainFafnir; 