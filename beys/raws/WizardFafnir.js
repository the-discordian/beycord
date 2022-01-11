const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");
//----------------------------------------------------------------------------------------------------------------
function SACheck(acted, victim, logger){
    return acted.sp >= 3;
}

function SAExecute(acted, victim, logger){
    let effect1 = 10;
    let effect2 = 1 + 0.01 * acted.lvl;
    acted.sp -= 3;
    victim.stability -= effect1;
    victim.stamina -= effect2;
    logger.add(`[${acted.username}] Wizard Fafnir used **Wizard Blow**!`);
}

const WizardBlow = new bcworkshop.Special("Wizard Blow", SACheck, SAExecute);
//----------------------------------------------------------------------------------------------------------------
function PassiveCheck1(acted, victim, logger){
    return Math.floor(Math.random() * 2) == 0 && victim.bey.sd == 0;
}

function PassiveEXE1(acted, victim, logger){
    victim.atk = Math.round((victim.atk/100)*60); 
    victim.hp = victim.hp - Math.round((victim.atk/100)*60);
    logger.add(`[${acted.username}] Wizard Fafnir used **Ratchet Through**!`);

}
const RatchetThrough = new bcworkshop.Passive("Ratchet Through", PassiveCheck1, PassiveEXE1, 15);
//----------------------------------------------------------------------------------------------------------------
function PassiveCheck2(acted, victim, logger){
    return (Math.random() * 2) == 0 && victim.move == "fight" && victim.bey.sd == 0 && acted.hp < Math.floor((acted.maxhp/100)*25);
}

function PassiveEXE2(acted, victim, logger){
    victim.stamina -= 0.5 + 0.01 * acted.lvl; 
    acted.stamina += 1 + 0.01 * acted.lvl;
    logger.add(`[${acted.username}] Wizard Fafnir used **Ratchet Drain**!`);

}
const RatchetDrain = new bcworkshop.Passive("Ratchet Drain", PassiveCheck2, PassiveEXE2, 5);
//----------------------------------------------------------------------------------------------------------------
function PassiveCheck3(acted, victim, logger){
    return Math.floor(Math.random() * 2) == 0 && victim.move == "fight" && victim.bey.sd == 0 && acted.hp < Math.floor((acted.maxhp/100)*25);

}

function PassiveEXE3(acted, victim, logger){
    victim.stamina -= 1 + 0.01 * acted.lvl; 
    acted.stamina += 2 + 0.01 * acted.lvl;
    logger.add(`[${acted.username}] Wizard Fafnir used **Wizard Drain**!`);

}
const WizardDrain = new bcworkshop.Passive("Wizard Drain", PassiveCheck3, PassiveEXE3, 15);
//----------------------------------------------------------------------------------------------------------------
function PassiveCheck4(acted, victim, logger){
    return acted.stamina <= 2 && victim.move == "fight"

}

function PassiveEXE4(acted, victim, logger){
    acted.stamina += 3 + 0.01 * acted.lvl;
    logger.add(`[${acted.username}] Wizard Fafnir used **Wizard Zero**!`);

}
const WizardZero = new bcworkshop.Passive("Wizard Zero", PassiveCheck4, PassiveEXE4, 60);
//----------------------------------------------------------------------------------------------------------------
const example = new bcworkshop.Beyblade({
    name: "Wizard Fafnir",
    type: "Stamina",
    imageLink: "https://cdn.discordapp.com/attachments/671569234891112482/800146361987104818/318.png"
})

.attachSpecial(WizardBlow)
.attachPassive(RatchetThrough)
.attachPassive(RatchetDrain)
.attachPassive(WizardDrain)
.attachPassive(WizardZero)
.setDefaultSD("Left");
module.exports = example;

