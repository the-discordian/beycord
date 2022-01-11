const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function SPRequirement1(acted, victim, message, player, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stamina >= Math.round((acted.maxstamina/100)*60);
}
function SP1(acted, victim, message, player, logger){
    //What will a special do
victim.hp -= (50 + 0.1 * player.lvl);
acted.stamina += (2 + 0.2 * player.lvl);
logger.add(`Archer Hercules used **Archer Strike**!`);
}
const SPName1 = new bcworkshop.Special("Archer Strike", SPRequirement1, SP1);

function SPRequirement2(acted, victim, message, player, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stamina <= Math.round((acted.maxstamina/100)*60);
}
function SP2(acted, victim, message, player, logger){
    //What will a special do
    victim.stability -= (5 + 0.1 * player.lvl);
    victim.atk = Math.round((victim.atk/100)*20);
    logger.add(`Archer Hercules used **Herculean Barrier**!`);
}
const SPName2 = new bcworkshop.Special("Herculean Barrier", SPRequirement2, SP2);

function PsRequirement(acted, victim, message, player, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.stamina <= Math.round((acted.maxstamina/100)*20);
}
function PsName(acted, victim, message, player, logger){
//What will a passive do
acted.stamina += (2 + 0.1 * player.lvl);
logger.add(`Archer Hercules activated **Eternal Stamina**!`);
}
const PvName = new bcworkshop.Passive("Eternal Stamina", PsRequirement, PsName, 60);

function ModeRequirement1(acted, victim, message, player, logger){
    return acted.stamina >= Math.round((acted.maxstamina/100)*60);
    //Requirement to activate IF there's a mode change
}
function ModeChange1(acted, victim, message, player, logger){
    acted.stamina += 0.2;
    acted.atk -= 0.5;
    logger.add(`Archer Hercules is on mode **Endless Endurance**!`);
    //What will mode change do
}
const Mode1 = new bcworkshop.Mode("Endless Endurance", ModeRequirement1, ModeChange1);

function ModeRequirement2(acted, victim, message, player, logger){
    return acted.stamina <= Math.round((acted.maxstamina/100)*60);
    //Requirement to activate IF there's a mode change
}
function ModeChange2(acted, victim, message, player){
    acted.stamina -= 0.1;
    victim.atk -= victim.atk = Math.round((victim.atk/100)*80);
    logger.add(`Archer Hercules is on mode **Endless Barrier**!`);
    //What will mode change do
}
const Mode2 = new bcworkshop.Mode("Endless Barrier", ModeRequirement2, ModeChange2);

const ArcherHercules = new bcworkshop.Beyblade({name:"Archer Hercules", type: "Stamina", imageLink:"https://static.wikia.nocookie.net/beyblade/images/b/bc/Beyblade_Hercules.png/revision/latest/scale-to-width-down/316?cb=20190918213500"})

.attachSpecial(SPName1)
.attachSpecial(SPName2)
.attachPassive(PvName)
.attachMode(Mode1)
.attachMode(Mode2)
.setDefaultSD("Right");

module.exports = ArcherHercules;