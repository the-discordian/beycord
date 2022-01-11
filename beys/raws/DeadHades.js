const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function ReqDImpulse(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 4 && acted.stamina <= Math.round((acted.maxhp/100)*70);
}
function DImpulse(acted, victim, logger){
    victim.stability -= (15 + 0.05 * victim.lvl);
    victim.hp -= (30 + 0.3 * victim.lvl);
    //What will a special do
logger.add(`[${acted.username}] Dead Hades used **Dead Impulse**!`);
}
const DeadI = new bcworkshop.Special("Dead Impulse", ReqDImpulse, DImpulse);

function ReqDGravity(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 4 && acted.stamina >= Math.round((acted.maxhp/100)*70);
}
function DGravity(acted, victim, logger){
    victim.hp -= (40 + 0.6 * victim.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Dead Hades used **Dead Gravity**!`);
}
const DeadG = new bcworkshop.Special("Dead Gravity", ReqDGravity, DGravity);

function ReqHexW(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.move == "spin" && victim.move == "fight" && acted.hp <= Math.round((acted.maxhp/100)*40);
}
function HexW(acted, victim, logger){
    victim.atk = Math.round((victim.atk/100)*40);
    acted.stamina += (2 + 0.01 * acted.lvl);
    victim.stability -= (10 + 0.05 * victim.lvl);
//What will a passive do
logger.add(`[${acted.username}] Dead Hades activated **Hex Wall**!`);
}
const HWall = new bcworkshop.Passive("Hex Wall", ReqHexW, HexW, 50);

function ReqDarkR(acted, victim, logger){
    return acted.sp >= 1 && acted.stamina >= Math.round((acted.maxstamina/100)*60) && victim.hp <= Math.round((victim.maxhp/100)*60);
    //Requirement to activate IF there's a mode change
}
function DarkR(acted, victim, logger){
    setTimeout(() => {acted.bey.DResonance.active = false}, 20000);
    acted.sp -= 1;
    acted.atk += 0.6;
    acted.stamina -= 0.2;
    logger.add(`[${acted.username}] Dead Hades is on mode **Dark Resonance**!`);
    //What will mode change do
}
const DResonance = new bcworkshop.Mode("Dark Resonance", ReqDarkR, DarkR);

function ReqDarkREX(acted, victim, logger){
    return victim.bey.name === "Revive Phoenix" && !acted.bey.DResonance.active && acted.sp >= 3;
    //Requirement to activate IF there's a mode change
}
function DarkREX(acted, victim, logger){
    setTimeout(() => {acted.bey.DResonanceEX.active = false}, 20000);
    acted.sp = 0;
    victim.hp -= 0.6;
    acted.atk += (20 + 0.5 * acted.lvl);
    acted.stamina -= (0.6 - 0.04 * acted.lvl);
    logger.add(`[${acted.username}] Dead Hades is on mode **Dark Resonance EX**!`);
    //What will mode change do
}
const DResonanceEX = new bcworkshop.Mode("Dark Resonance EX", ReqDarkREX, DarkREX);

function ReqDeadZ(acted, victim, logger){
    return !acted.bey.DeadG.active && acted.stamina >= Math.round((acted.maxhp/100)*70);
    //Requirement to activate IF there's a mode change
}
function DeadZ(acted, victim, logger){
    setTimeout(() => {acted.bey.DZone.active = false}, 5000);
    victim.hp -= 0.3;
    acted.stamina -= (0.4 - 0.02 * acted.lvl);
    logger.add(`[${acted.username}] Dead Hades is on mode **Dead Zone**!`);
    //What will mode change do
}
const DZone = new bcworkshop.Mode("Dead Zone", ReqDeadZ, DeadZ);

const DeadHades = new bcworkshop.Beyblade({name:"Dead Hades", type: "Balance", imageLink:"https://i.ibb.co/f8gXC3p/hades.png"})

.attachSpecial(DeadI)
.attachSpecial(DeadG)
.attachPassive(HWall)
.attachMode(DResonance)
.attachMode(DResonanceEX)
.attachMode(DZone)
.setDefaultSD("Right");

module.exports = DeadHades;