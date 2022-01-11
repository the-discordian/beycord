const bcworkshop = require("bcworkshop");

function ReqRGuard(acted, victim, logger){
    return acted.sp >= 5 && acted.hp >= Math.round((acted.maxhp/100)*20);
}
function RGuard(acted, victim, logger){
    acted.hp += Math.round((acted.maxhp/100)*20);
    acted.stamina += Math.round(3 + 0.1 * acted.lvl);
    victim.hp -= Math.round(40 + 0.4 * victim.lvl);
    logger.add(`[${acted.username}] Brave Solomon used **Royal Guard**!`);
}
const RoyalG = new bcworkshop.Special("Royal Guard", ReqRGuard, RGuard);

function ReqKingsS(acted, victim, logger){
    return acted.sp >= 5 && acted.hp <= Math.round((acted.maxhp/100)*20) && !acted.bey.KSUsed;
}
function KingsS(acted, victim, logger){
    acted.bey.KSUSed = true;
    acted.sp += Math.round(3 + 0.2 * acted.lvl);
    if(acted.sp < 0) acted.sp = 0;
    acted.hp += Math.round((acted.maxhp/100)*20);
    acted.stamina += Math.round(3 + 0.1 * acted.lvl);
    logger.add(`[${acted.username}] Brave Solomon used **Kings Sacrifice**!`);
}
const KSacrifice = new bcworkshop.Special("Kings Sacrifice", ReqKingsS, KingsS);

function ReqGTemple(acted, victim, logger){
    return acted.sp >= 1 && acted.hp >= Math.round((acted.maxhp/100)*70);
}
function GTemple(acted, victim, logger){
    acted.sp -= Math.round(1 - 0.05 * acted.lvl);
    if(acted.sp < 0) acted.sp = 0;
    victim.atk = 0;
    victim.hp -= victim.atk;
    logger.add(`[${acted.username}] Brave Solomon activated **Golden Temple**!`);
}
const GoldenT = new bcworkshop.Passive("Golden Temple", ReqGTemple, GTemple, 120);

function ReqLegendsP(acted, victim, logger){
    return acted.sp >= 1 && acted.hp <= Math.round((acted.maxhp/100)*70);
}
function LegendsP(acted, victim, logger){
    acted.sp += Math.round(2 - 0.1 * acted.lvl);
    victim.sp += Math.round(1 - 0.05 * victim.lvl);
    if(acted.sp < 0) acted.sp = 0;
    if(victim.sp < 0) victim.sp = 0;
    victim.stamina -= Math.round(1 - 0.1 * acted.lvl);
    logger.add(`[${acted.username}] Brave Solomon activated **Legends Prophecy**!`);
}
const LProfecy = new bcworkshop.Passive("Legends Prophecy", ReqLegendsP, LegendsP, 240);

function ReqSPeace(acted, victim, logger){
    return acted.sp <= 4 && acted.bey.ScriptsOfWar.active == false;  
}
function SPeace(acted, victim, logger){
    acted.atk = Math.round((acted.atk/100)*20);
    acted.stamina += Math.round(0.2 + 0.01 * acted.lvl);
    victim.atk = Math.round((victim.atk/100)*20);
    logger.add(`[${acted.username}] Brave Solomon is on mode **Scripts Of Peace**!`);
}
const ScriptsOfP = new bcworkshop.Mode("Scripts Of Peace", ReqSPeace, SPeace);

function ReqSWar(acted, victim, logger){
    return acted.sp >= 5;
}
function SWar(acted, victim, logger){
    if(!!acted.bey.ScriptsOfPeace.active) acted.bey.ScriptsOfPeace.active = false;
    acted.atk += Math.round(2 + 0.1 * acted.lvl);
    acted.stamina -= Math.round(0.2 + 0.01 * acted.lvl);
    logger.add(`[${acted.username}] Brave Solomon is on mode **Scripts Of War**!`);
}
const ScriptsOfW = new bcworkshop.Mode("Scripts Of War", ReqSWar, SWar);

const BraveSolomon = new bcworkshop.Beyblade({name:"Brave Solomon", type: "Attack", imageLink:"https://i.ibb.co/m6gWwM6/solomon.png"})

.attachSpecial(RoyalG)
.attachSpecial(KSacrifice)
.attachPassive(GoldenT)
.attachPassive(LProfecy)
.attachMode(ScriptsOfP)
.attachMode(ScriptsOfW)
.addProperty("KSUsed", false)
.setDefaultSD("Right");

module.exports = BraveSolomon;