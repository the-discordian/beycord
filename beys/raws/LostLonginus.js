const bcworkshop = require("bcworkshop");

function LostSpiralRequirement(acted, victim, logger){//Lost Spiral Requirement
    return acted.sp >= 3
}

function LostSpiralEffect(acted, victim, logger){//Lost Spiral Effect
    victim.hp -= (50 + .5 * acted.lvl);
    victim.stability -= (7 + .03 * acted.lvl);
    logger.add(`[${acted.username}] Lost Longinus used **Lost Spiral**!`);
}

const LostSpiral = new bcworkshop.Special("Lost Spiral", LostSpiralRequirement, LostSpiralEffect);


function TheFirstLeftSpinRequirement(acted, victim, logger){//The First Left Spin Requirement
    return true;
}

function TheFirstLeftSpinEffect(acted, victim, logger){//The First Left Spin Effect
    if (victim.bey.sd !== acted.bey.sd){
    let difference;
    if(acted.stamina > victim.stamina) difference = acted.stamina - victim.stamina;
    else difference = victim.stamina - acted.stamina;
    acted.atk += difference;
    if (acted.atk > 100) acted.atk = 100;}else{
        acted.atk += (acted.atk/100 * 18);
    }
}

const TheFirstLeftSpin = new bcworkshop.Mode("The First Left Spin", TheFirstLeftSpinRequirement, TheFirstLeftSpinEffect);


function FierceResonanceRequirement(acted, victim, logger){//Fierce Resonance Requirement
    return acted.sp >= 5 && acted.hp <= (acted.maxhp/2) && !acted.bey.boostUsed;
}

function FierceResonanceEffect(acted, victim, logger){//Fierce Resonance Effect
    acted.bey.boostUsed = true;
    acted.stability += 20;
    acted.hp += (acted.maxhp/100 * 20 + .1 * acted.lvl);
    logger.add(`[${acted.username}] is getting serious! **Fierce Resonance** activated!`);
}

const FierceResonance = new bcworkshop.Passive("Fierce Resonance", FierceResonanceRequirement, FierceResonanceEffect);


const LostLonginus = new bcworkshop.Beyblade({name: "Lost Longinus", type: "Attack", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656822001664070/image0.png?width=644&height=548", aliases: ["Lost Luinor"]})
.attachMode(TheFirstLeftSpin)
.attachPassive(FierceResonance)
.attachSpecial(LostSpiral)
.addProperty("boostUsed", false)
.setDefaultSD("Left");

module.exports = LostLonginus;