const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function StartingModeRequirement(acted, victim, logger){//StartingMode Requirement
    return acted.bey.ModeLock == false;
}

function StartingModeEffect(acted, victim, logger){//StartingMode Effect
    if (acted.bey.TwinMode == 0){
        acted.bey.CurrentMode = "Upper";
        logger.add(`[${acted.username}] Twin Nemesis launched in **Upper Mode**!`);
        }else{
                 acted.bey.CurrentMode = "Smash";
                 logger.add(`[${acted.username}] Twin Nemesis launched in **Smash Mode**!`);
        }
        acted.bey.ModeLock = true;
    }

const StartingMode = new bcworkshop.Mode("Starting Mode", StartingModeRequirement, StartingModeEffect);


function ModeChangeRequirement(acted, victim, logger){//ModeChange Requirement
    return acted.sp >= 1;
}

function ModeChangeEffect(acted, victim, logger){//ModeChange Effect
    if (acted.bey.CurrentMode == "Smash"){
    acted.bey.CurrentMode = "Upper";
    logger.add(`[${acted.username}] Twin Nemesis used **Mode Change**! Bey set to **Upper Mode**!`);   
    }else{
            acted.bey.CurrentMode = "Smash";
            logger.add(`[${acted.username}] Twin Nemesis used **Mode Change**! Bey set to **Smash Mode**!`);
        }
        acted.sp -= 1;
    }
    
const ModeChange = new bcworkshop.Special("Mode Change", ModeChangeRequirement, ModeChangeEffect);


function HOTCRequirement(acted, victim, logger){
    return acted.move == "fight";
}

function HOTCEffect(acted, victim, logger){
    if (acted.bey.CurrentMode == "Upper"){
        acted.atk = (acted.atk/100 * 110);
    }else{
        victim.stability -= 2;  

    }
}

const HOTC = new bcworkshop.Mode("Hammer of The Colossus", HOTCRequirement, HOTCEffect);


function UpperCrashRequirement(acted, victim, logger){
    return acted.bey.CurrentMode == "Upper" && acted.sp >= 2;
}

function UpperCrashEffect(acted, victim, logger){
    if((Math.floor(Math.random() * 99) <= 29)){
        victim.stability -= 25;
        victim.stamina -= (1.6 + 0.004 * acted.lvl);
        acted.sp -= 3;
        logger.add(`[${acted.username}] Twin Nemesis used **Upper Crash**!`);
    }
}

const UpperCrash = new bcworkshop.Passive("Upper Crash", UpperCrashRequirement, UpperCrashEffect, 50);


function SmashHammerRequirement(acted, victim, logger){
    return acted.bey.CurrentMode == "Smash" && acted.sp >= 2;
}

function SmashHammerEffect(acted, victim, logger){
    if((Math.floor(Math.random() * 99) <= 29)){
        victim.hp -= (60 + .6 * acted.lvl);
        victim.stamina -= (0.5 + 0.009 * acted.lvl);
        acted.sp -= 3;
        logger.add(`[${acted.username}] Twin Nemesis used **Smash Hammer**!`);
    }
}

const SmashHammer = new bcworkshop.Passive("Smash Hammer", SmashHammerRequirement, SmashHammerEffect, 50);


const TwinNemesis = new bcworkshop.Beyblade({name: "Twin Nemesis", type: "Attack", imageLink: "https://static.wikia.nocookie.net/beyblade/images/2/21/Beyblade_Twin_Nemesis.png/revision/latest?cb=20180716232248", aliases: ["Twin Noctemis"]})
.attachMode(StartingMode)
.attachSpecial(ModeChange)
.attachPassive(UpperCrash)
.attachPassive(SmashHammer)
.attachMode(HOTC)
.addProperty("TwinMode", "(Math.floor(Math.random() * 2))")
.addProperty("CurrentMode", false)
.addProperty("ModeLock", false)
.setDefaultSD("Right");

module.exports = TwinNemesis;