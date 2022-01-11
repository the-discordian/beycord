const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function ReqWSlide(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3;
}
function WSlide(acted, victim, logger){
    victim.hp -= (60 + 0.2 * acted.lvl);
    acted.stamina += (1 + 0.2 * acted.lvl);
    //What will a special do
logger.add(`[${acted.username}] Bey used **Wedge Slide**!`);
}
const WedgeS = new bcworkshop.Special("Wedge Slide", ReqWSlide, WSlide);

function ReqRStorm(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.move == "spin" && acted.stamina >= Math.round((acted.maxstamina/100)*60);
}
function RStorm(acted, victim, logger){
    acted.stamina += (2 + 0.2 * acted.lvl);
    victim.atk = Math.round((victim.atk/100)*20);
//What will a passive do
logger.add(`[${acted.username}] Crash Ragnaruk activated **Ragnaruk Storm**!`);
}
const RagnarukS = new bcworkshop.Passive("Ragnaruk Storm", ReqRStorm, RStorm, 125);

function ReqRCounter(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return victim.move == "fight" && acted.move == "spin" && acted.sp >= 1;
}
function RCounter(acted, victim, logger){
    victim.hp -= (victim.atk + 0.2 * victim.lvl);
    acted.sp -= 1;
//What will a passive do
logger.add(`[${acted.username}] Crash Ragnaruk activated **Reach Counter**!`);
}
const ReachC = new bcworkshop.Passive("Reach Counter", ReqRCounter, RCounter, 150);

function ReqRTyph(acted, victim, logger){
    return acted.move == "spin" && acted.stamina >= Math.round((acted.maxstamina/100)*70);;
    //Requirement to activate IF there's a mode change
}
function RTyph(acted, victim, logger){
    setTimeout(() => {acted.bey.RTyphoonEX.active = true}, 20000);
    acted.stamina += 0.5;
    victim.atk = Math.round((victim.atk/100)*30);
    logger.add(`[${acted.username}] Crash Ragnaruk is on mode **Ragnaruk Typhoon**!`);
    //What will mode change do
}
const RTyphoon = new bcworkshop.Mode("Ragnaruk Typhoon", ReqRTyph, RTyph);

function ReqRTyphB(acted, victim, logger){
    return victim.move == "special" && victim.sp >= 3;
    //Requirement to activate IF there's a mode change
}
function RTyphB(acted, victim, logger){
    acted.bey.RTyphoon = false;
    logger.add(`[${acted.username}] Crash Ragnaruk lost the mode **Ragnaruk Typhoon**!`);
    //What will mode change do
}
const RTyphoonBreak = new bcworkshop.Mode("Ragnaruk Typhoon BREAK", ReqRTyphB, RTyphB);

function ReqRTyphEX(acted, victim, logger){
    return acted.bey.RTyphEX && acted.sp >= 3;
    //Requirement to activate IF there's a mode change
}
function RTyphEX(acted, victim, logger){
    acted.stamina += 1;
    victim.hp -= 0.9;
    victim.stability -= 0.9;
    victim.stamina -= 0.9;
    acted.sp = 0;
    logger.add(`[${acted.username}] Crash Ragnaruk is on mode **Ragnaruk Typhoon EX**!`);
    //What will mode change do
}
const RTyphoonEX = new bcworkshop.Mode("Ragnaruk Typhoon EX", ReqRTyphEX, RTyphEX);

function ReqRTyphEXB(acted, victim, logger){
    return victim.move == "special" && victim.sp >= 3;
    //Requirement to activate IF there's a mode change
}
function RTyphEXB(acted, victim, logger){
    acted.bey.RTyphoonEX = false;
    logger.add(`[${acted.username}] Crash Ragnaruk lost the mode **Ragnaruk Typhoon EX**!`);
    //What will mode change do
}
const RTyphoonEXBREAK = new bcworkshop.Mode("Ragnaruk Typhoon EX BREAK", ReqRTyphEXB, RTyphEXB);

const CrashRagnaruk = new bcworkshop.Beyblade({name:"Crash Ragnaruk", type: "Stamina", imageLink:"https://i.ibb.co/SKBR0XH/ragnaruk.png"})

.attachSpecial(WedgeS)
.attachPassive(RagnarukS)
.attachPassive(ReachC)
.attachMode(RTyphoon)
.attachMode(RTyphoonBreak)
.attachMode(RTyphoonEX)
.attachMode(RTyphoonEXBREAK)
.setDefaultSD("Right");

module.exports = CrashRagnaruk;