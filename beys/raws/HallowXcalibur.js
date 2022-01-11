const bcworkshop = require("bcworkshop");

function hsreq(acted, victim, logger){
    return acted.sp > 5;
}

function hsuse(acted, victim, logger){
    acted.sp -= 5;
    victim.hp = Math.round(victim.hp/100*75);
    acted.stamina = acted.stamina - 1;
    logger.add(`[${acted.username}] Hallow Xcalibur used **Hallow Saber**.`);
}

const HallowSaber = new bcworkshop.Special("Hallow Saber", hsreq, hsuse);

function hcreq(acted, victim, logger){
    return true;
}

function hcuse(acted, victim, logger){
    acted.sp += 1;
    acted.bey.hallowEnergy += 1;
}

const HallowCharge = new bcworkshop.Passive("Hallow Charge", hcreq, hcuse, 5);

function hstrreq(acted, victim, logger){
    return !acted.bey.HallowMode.active;
}

function hstruse(acted, victim, logger){
    if(acted.bey.HallowMode.active){
        acted.atk = Math.round(acted.atk/100*105);
    }else{
        acted.atk = Math.round(acted.atk/100*150);
        victim.atk = Math.round(victim.atk/100*75);
        acted.stamina = acted.stamina + 0.5;
    }
}

const HallowStrength = new bcworkshop.Passive("Hallow Strength", hstrreq, hstruse, 0);

function rsreq(acted, victim, logger){
    return acted.hp < (Math.round(acted.maxhp/100*35)) && acted.bey.boostUsed === false;
}

function rsuse(acted, victim, logger){
    acted.bey.boostUsed = true;
    acted.hp = Math.round(acted.maxhp/100*50);
    acted.stamina = acted.stamina + 2;
    logger.add(`[${acted.username}] Hallow Xcalibur refused to die and revived itself.`);
}

const Resurrection = new bcworkshop.Passive("Resurrection", rsreq, rsuse, 0);

function hmreq(acted, victim, logger){
    return acted.bey.hallowEnergy >= 5;
}

function hmuse(acted, victim, logger){
    acted.bey.hallowEnergy = -7;
    logger.add(`[${acted.username}] Hallow Xcalibur activated **Hallow Mode**.`)
    setTimeout(() => {
        acted.bey.HallowMode.active = false;
        victim.hp = Math.round(victim.hp/100*90);
        victim.stamina = victim.stamina - 1;
        logger.add(`[${acted.username}] Hallow Xcalibur's **Hallow Mode** ran out.`)
    }, 15000);
}

const HallowMode = new bcworkshop.Mode("Hallow Mode", hmreq, hmuse);

const HallowXcalibur = new bcworkshop.Beyblade({name: "Hallow Xcalibur", type: "Attack", imageLink: "https://media.discordapp.net/attachments/692234599350140961/772772008378892298/12_copy.png"})
.addProperty("hallowEnergy", 0)
.addProperty("boostUsed", false)
.attachSpecial(HallowSaber)
.attachPassive(HallowCharge)
.attachPassive(HallowStrength)
.attachPassive(Resurrection)
.attachMode(HallowMode);

module.exports = HallowXcalibur;