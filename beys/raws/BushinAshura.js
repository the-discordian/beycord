const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");
//----------------------------------------------------------------------------------------------------------------
function TCounterCheck(acted, victim, logger){
    return acted.sp >= 3 && acted.lvl >= 50;
}


function TCounterExecute(acted, victim, logger){
    acted.sp -= 3;
    victim.hp -= victim.atk + acted.atk / (4 / 0.2 * acted.level)
    logger.add(`[${acted.username}] Bushin Ashura used **Tower Counter**!`);
}

const TCounter = new bcworkshop.Special("Tower Counter", TCounterCheck, TCounterExecute);
//----------------------------------------------------------------------------------------------------------------
function DBuhsinGuardCheck(acted, victim, logger){
    return acted.sp >= 2 && victim.move == "fight" && acted.lvl >= 50;
}


function DBuhsinGuardExecute(acted, victim, logger){
    setTimeout(() => {acted.bey.DBushinGuard.active = false}, 20000);
    victim.atk = 0
    victim.hp -= victim.atk/10 
    logger.add(`[${acted.username}] Bushin Ashura used **Double Bushin Guard**!`);
}

const DBushinGuard = new bcworkshop.Mode("Double Bushin Guard", DBuhsinGuardCheck, DBuhsinGuardExecute, 20);
//----------------------------------------------------------------------------------------------------------------

function BuhsinGuardCheck(acted, victim, logger){
    return acted.sp >= 2 && victim.move == "fight" && acted.lvl <= 50;
}


function BuhsinGuardExecute(acted, victim, logger){
    setTimeout(() => {acted.bey.BushinGuard.active = false}, 20000);
     victim.atk = Math.round((victim.atk/100)*50);
     logger.add(`[${acted.username}] Bushin Ashura used **Bushin Guard**!`);
 }
 
 
const BushinGuard = new bcworkshop.Mode("Bushin Guard", BuhsinGuardCheck, BuhsinGuardExecute, 20);
//----------------------------------------------------------------------------------------------------------------
function HDefenseCheck(acted, victim, logger){
    return acted.stability <= 30 && (Math.random() * 2) == 0;
}


function HDefenseExecute(acted, victim, logger){
    victim.hp -= victim.atk * 1 + 0.0025 * acted.level
    logger.add(`[${acted.username}] Bushin Ashura used **Hurricane Defense**!`);
}

const HDefense = new bcworkshop.Passive("Hurricane Defense", HDefenseCheck, HDefenseExecute);
//----------------------------------------------------------------------------------------------------------------

function BuhsinDefenseCheck(acted, victim, logger){
    return acted.bey.DBushinGuard.active == false || acted.bey.BushinGuard.active == false; //WIP
}


function BuhsinDefenseExecute(acted, victim, logger){
     logger.add(`[${acted.username}] Bushin Ashura's guard wore down.`);
 }
 
 
const BushinDefense = new bcworkshop.Mode("Bushin Defense", BuhsinDefenseCheck, BuhsinDefenseExecute, 20);
//----------------------------------------------------------------------------------------------------------------



const example = new bcworkshop.Beyblade({
    name: "Bushin Ashura",
    type: "Defense",
    imageLink: "https://static.wikia.nocookie.net/beyblade/images/0/00/BBGT_Bushin_Ashura_Hurricane_Keep_Ten_Beyblade.png/revision/latest/scale-to-width-down/350?cb=20191030220638"
})

.attachMode(DBushinGuard)
.attachMode(BushinGuard)
.attachSpecial(TCounter)
.attachPassive(HDefense)
.attachMode(BushinDefense)
.setDefaultSD("Right")
module.exports = example;
