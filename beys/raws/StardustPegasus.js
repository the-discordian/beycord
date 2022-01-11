const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");
//----------------------------------------------------------------------------------------------------------------
function SACheck(acted, victim, logger){
    return acted.sp >= 3 && !acted.bey.UnearthSpeed.active;
}

function SAExecute(acted, victim, logger){
    acted.sp -= 3;
    victim.hp -= (victim.atk + acted.atk) * (1 + 0.05 * acted.lvl-1);
    acted.hp = Math.round((acted.hp/100)*70);
    logger.add(`[${acted.username}] Stardust Pegasus used **Stardust Supernova**!`);
}
const Supernova = new bcworkshop.Special("Stardust Supernova", SACheck, SAExecute);
//----------------------------------------------------------------------------------------------------------------

function SA1Check(acted, victim, logger){
    return acted.sp >= 5 && !!acted.bey.UnearthSpeed.active;
}

function SA1Execute(acted, victim, logger){
    acted.sp -= 5;
    victim.hp -= (victim.atk + acted.atk) * (1 + 0.07 * acted.lvl-1);
    acted.bey.UnearthSpeed.active = false;
    logger.add(`[${acted.username}] Stardust Pegasus used **Ultimate Stardust Supernova**!`);

}
const UltSupernova = new bcworkshop.Special("Ultimate Stardust Supernova", SA1Check, SA1Execute);

function UnearthSpdCheck(acted, victim, logger){
    return acted.hp < Math.round((acted.maxhp/100)*50) && !acted.bey.USUsed;
}

function UnearthSpdEXE(acted, victim, logger){
    acted.bey.USUsed = true;
    setTimeout(() => {
        acted.bey.UnearthSpeed.active = false;
        logger.add(`${acted.username}] Stardust Pegasus returned to normal speed.`)
    }, 20000);
    victim.stamina -= 0.1 + 0.01 * acted.lvl; 
    acted.stamina += 1 + 0.01 * acted.lvl;
    victim.atk = Math.round((victim.atk/100)*90);
    acted.atk = Math.round((victim.atk/100)*110);
    logger.add(`[${acted.username}] Stardust Pegasus went into an **Unearthly Speed**!`);
}


const UnearthSpeed = new bcworkshop.Mode("Unearth Speed", UnearthSpdCheck, UnearthSpdEXE);

function SlowTimeCheck(acted, victim, logger){
    return acted.hp < Math.round((acted.maxhp/100)*25) && !acted.bey.timeStopped;
}

function SlowTimeEXE(acted, victim, logger){
    acted.bey.timeStopped = true;
    setTimeout(() => {
        acted.bey.SlowTime.active = false;
        logger.add("Time shall move again.");
    }, 10000);
    acted.stamina += 2 + 0.01 * acted.lvl;
    victim.stamina += 2 + 0.01 * victim.lvl;
    acted.hp += 50 + 1 * acted.lvl-1;
    victim.hp += 50 + 1.5 * victim.lvl-1;
    victim.atk = 0;
    logger.add(`[${acted.username}] Stardust Pegasus slowed time!`);
}
const SlowTime = new bcworkshop.Mode("Slow Time", SlowTimeCheck, SlowTimeEXE, 30);

function sreq(a,b,c){
    return !0;
}

function suse(a,b,c){
    if(a.hp<(a.maxhp/100*90)){a.bey.type="Attack"}else if(a.stamina<(a.maxstamina/100*50)){a.bey.type="Stamina"}else if(a.hp<(a.maxhp/100*30)){a.bey.type="Defense"}
}

const Stardust = new bcworkshop.Passive("Stardust", sreq, suse);

const example = new bcworkshop.Beyblade({
    name: "Stardust Pegasus",
    type: "Balance",
    imageLink: "https://images-ext-2.discordapp.net/external/K_4MQL_GWv7fY5pK68pwIL1yCFNQO1mEXGRdhS4hxUQ/https/media.discordapp.net/attachments/810371076692508692/810375788364955648/image0.png"
})

.attachSpecial(Supernova)
.attachSpecial(UltSupernova)
.attachMode(UnearthSpeed)
.attachMode(SlowTime)
.attachPassive(Stardust)
.addProperty("timeStopped", false)
.addProperty("USUsed", false)
.setSDChangable(true)
.setDefaultSD("Right");

module.exports = example;
