const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function ReqTripleS(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 4 && acted.hp >= Math.round((acted.maxhp/100)*40);
}
function TripleS(acted, victim, logger){
    victim.hp -= (40 + 0.2 * victim.lvl);
    victim.stability -= (5 + 0.1 * victim.lvl);
    //What will a special do
logger.add(`[${acted.username}] Buster Xcalibur used **Triple Saber**!`);
}
const TSaber = new bcworkshop.Special("Triple Saber", ReqTripleS, TripleS);

function ReqPentaS(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 4 && acted.hp <= Math.round((acted.maxhp/100)*40);
}
function PentaS(acted, victim, logger){
    victim.hp -= (60 + 0.6 * victim.lvl);
    victim.stability -= (0 + 0.1 * victim.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Buster Xcalibur used **Penta Saber**!`);
}
const PSaber = new bcworkshop.Special("Penta Saber", ReqPentaS, PentaS);

function ReqSWall(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    let chance = Math.floor(Math.random()*10);
    return !acted.bey.PSaber.active && chance == 0 && victim.hp <= Math.round((victim.maxhp/100)*30);
}
function SWall(acted, victim, logger){
    victim.hp = 0;
    victim.stability = 0;
    victim.stamina = 0;
//What will a passive do
logger.add(`[${acted.username}] Buster Xcalibur activated **Saber Wall**!`);
}
const SaberW = new bcworkshop.Passive("Saber Wall", ReqSWall, SWall, 150);

function ReqBMode(acted, victim, logger){
    return acted.move == "fight" && victim.move == "spin";
    //Requirement to activate IF there's a mode change
}
function BMode(acted, victim, logger){
    setTimeout(() => {acted.bey.BusterM.active = false}, 20000);
    acted.atk += 0.8;
    acted.stamina -= 0.3;
    logger.add(`[${acted.username}] Buster Xcalibur is on mode **Buster Mode**!`);
    //What will mode change do
}
const BusterM = new bcworkshop.Mode("Buster Mode", ReqBMode, BMode);

function ReqBlMode(acted, victim, logger){
    return !acted.bey.BusterM;
    //Requirement to activate IF there's a mode change
}
function BlMode(acted, victim, logger){
    victim.atk -= 0.5;
    acted.stamina += 0.2;
    logger.add(`[${acted.username}] Buster Xcalibur is on mode **Balance Mode**!`);
    //What will mode change do
}
const BalanceM = new bcworkshop.Mode("Balance Mode", ReqBlMode, BlMode);

const BusterXcalibur = new bcworkshop.Beyblade({name:"Buster Xcalibur", type: "Attack", imageLink:"https://static.wikia.nocookie.net/beyblade/images/1/10/BBC_Buster_Xcalibur_Beyblade.png/revision/latest/scale-to-width-down/370?cb=20190918213101"})

.attachSpecial(TSaber)
.attachSpecial(PSaber)
.attachPassive(SaberW)
.attachMode(BusterM)
.attachMode(BalanceM)
.setDefaultSD("Right");

module.exports = BusterXcalibur;