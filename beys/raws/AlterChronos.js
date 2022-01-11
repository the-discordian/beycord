const bcworkshop = require("bcworkshop");

function ModeChangeRequirement(acted, victim, logger){//ModeChange Requirement
    return acted.sp >= 1;
}

function ModeChangeEffect(acted, victim, logger){//ModeChange Effect
    if (acted.bey.type == "Attack"){
    acted.bey.type = "Stamina";
    logger.add(`[${acted.username}] Alter Chronos used **Mode Change**! Bey type set to **Stamina**!`);   
    }else{
            acted.bey.type = "Attack";
            logger.add(`[${acted.username}] Alter Chronos used **Mode Change**! Bey type set to **Attack**!`);
        }
        acted.sp -= 1;
    }

const ModeChange = new bcworkshop.Special("Mode Change", ModeChangeRequirement, ModeChangeEffect);


function StartingModeRequirement(acted, victim, logger){//StartingMode Requirement
    return true;
}

function StartingModeEffect(acted, victim, logger){//StartingMode Effect
    if (acted.bey.AlterMode == 0){
    acted.bey.type = "Attack";
    logger.add(`${acted.username} launched Alter Chronos in **Attack** mode!`);
    }else{
             acted.bey.type = "Stamina";
             logger.add(`${acted.username} launuched Alter Chronos in **Stamina** mode!`);
    }
}

const StartingMode = new bcworkshop.Mode("Starting Mode", StartingModeRequirement, StartingModeEffect);


function TightropeDiveRequirement(acted, victim, logger){//Tightrope Dive Requirement
    return acted.bey.type == "Attack" && victim.move == "fight" && acted.sp >= 2;
}

function TightropeDiveEffect(acted, victim, logger){//Tightrope Dive Effect
    victim.hp -= (victim.atk * 2);
    victim.stability -= 9;
    victim.atk = 0;
    acted.sp -= 2;
    logger.add(`${acted.username} Alter Chronos used **Tightrope Dive**!`);
}

const TightropeDive = new bcworkshop.Passive("Tightrope Dive", TightropeDiveRequirement, TightropeDiveEffect, 70);


function SlideOnShootRequirement(acted, victim, logger){//Slide-On Shoot Requirement
    return acted.bey.type == "Attack" && acted.sp >= 3;
}

function SlideOnShootEffect(acted, victim, logger){//Slide-On Shoot Effect
    victim.hp -= (50 + .3 * acted.lvl);
    victim.stability -= 12;
    acted.sp -= 3;
    logger.add(`${acted.username} Alter Chronos used **Slide-On Shoot**!`);
}

const SlideOnShoot = new bcworkshop.Special("Slide-On Shoot", SlideOnShootRequirement, SlideOnShootEffect);


function SlideOffShootRequirement(acted, victim, logger){//Slide-Off Shoot Requirement
    return acted.bey.type == "Stamina" && acted.sp >= 3;
}

function SlideOffShootEffect(acted, victim, logger){//Slide-Off Shoot Effect
    victim.stamina -= (1.2 + .008 * acted.lvl);
    victim.stability -= 7;
    acted.stamina += (1.2 + .008 * acted.lvl);
    acted.stability += 7;
    acted.sp -= 3;
    logger.add(`${acted.username} Alter Chronos used **Slide-Off Shoot**!`);
}

const SlideOffShoot = new bcworkshop.Special("Slide-Off Shoot", SlideOffShootRequirement, SlideOffShootEffect);


function MoonsaultDiveRequirement(acted, victim, logger){//Moonsault Dive Requirement
    return victim.move == "fight" && acted.sp >= 1;
}

function MoonsaultDiveEffect(acted, victim, logger){//Moonsault Dive Effect
    if((Math.floor(Math.random() * 99) <= 49)){
        victim.hp -= (50 + .7 * acted.lvl);
        acted.stability -= 25;
        acted.sp -= 1;
        logger.add(`[${acted.username}] Alter Chronos used **Moonsaught Dive**!`);
   }
}

const MoonsaultDive = new bcworkshop.Passive("Moonsault Dive", MoonsaultDiveRequirement, MoonsaultDiveEffect, 60);


const AlterChronos = new bcworkshop.Beyblade({name: "Alter Chronos", type: "Balance", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826657289242279936/image2.png?width=619&height=586", aliases: ["Alter Cognite"]})
.attachSpecial(ModeChange)
.attachSpecial(SlideOnShoot)
.attachSpecial(SlideOffShoot)
.attachPassive(TightropeDive)
.attachPassive(MoonsaultDive)
.attachMode(StartingMode)
.addProperty("AlterMode", "(Math.floor(Math.random() * 2))")
.setDefaultSD("Right");

module.exports = AlterChronos;