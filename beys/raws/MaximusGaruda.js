const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");
//----------------------------------------------------------------------------------------------------------------
function SACheck(acted, victim, logger){
    return acted.sp >= 3;
}

function SAExecute(acted, victim, logger){
    acted.stability += 10 + 0.2 * acted.lvl;
    acted.stamina += 2 + 0.01 * acted.lvl;
    victim.hp -= 40 + 0.2 * acted.lvl;
    logger.add(`[${acted.username}] Maximum Garuda used **Meteor Strike**!`);
}

const MeteorStrike = new bcworkshop.Special("Meteor Strike", SACheck, SAExecute);
//----------------------------------------------------------------------------------------------------------------

function FMCheck(acted, victim, logger){
    return acted.move == spin
}

function FMexe(acted, victim, logger){
    acted.bey.flightCharge += 1;
}

const FlightMeter = new bcworkshop.Passive("Flight Meter", FMCheck, FMexe)   //this is how to charge up energy fro bound flight

//----------------------------------------------------------------------------------------------------------------
function BoundFlightCheck(acted, victim, logger){
    return acted.bey.flightCharge >= 5;
}

function BoundFlightExecute(acted, victim, logger){
    acted.bey.flightCharge = 0;
    setTimeout(() => {acted.bey.BoundFlight.active = false}, 10000);
        ;
        victim.atk = 0;
        acted.stamina += 0.2;
        logger.add(`[${acted.username}] Maximum Garuda is in the air.`);
    
}

const BoundFlight = new bcworkshop.Mode("Bound Flight", BoundFlightCheck, BoundFlightExecute);
//----------------------------------------------------------------------------------------------------------------
function BoundDescentCheck(acted, victim, logger){
    return !acted.bey.BoundFlight.active;
}

function BoundDescentExe(acted, victim, logger){
    setTimeout(() => {acted.bey.BoundFlight.active = false}, 10000);
        acted.stamina += 0.3
        logger.add(`[${acted.username}] Maximum Garuda is in the stadium.`);
}
const BoundDescent = new bcworkshop.Passive("Bound Descent", BoundDescentCheck, BoundDescentExe) // this is bound flight's effects
//----------------------------------------------------------------------------------------------------------------
function DankResCheck(acted, victim, logger){
    return acted.sp > 2;
}

function DankResEXE(acted, victim, logger){
    victim.atk = Math.round((victim.atk/100)*50);
}

const DankRes = new bcworkshop.Passive("Bold Resonance", DankResCheck, DankResEXE)   //this is how to charge up energy fro bound flight

//----------------------------------------------------------------------------------------------------------------

function FluGuardCheck(acted, victim, logger){
    return acted.hp >= Math.round((acted.maxhp/100)*90);
}

function FluGuardEXE(acted, victim, logger){
    victim.atk = Math.round((victim.atk/100)*30);
    acted.stamina += 0.2
}

const FluGuard = new bcworkshop.Passive("Flugel Guard", FluGuardCheck, FluGuardEXE)   //this is how to charge up energy fro bound flight

//----------------------------------------------------------------------------------------------------------------

const example = new bcworkshop.Beyblade({
    name: "Maximum Garuda",
    type: "Stamina",
    imageLink: "https://images-ext-1.discordapp.net/external/L_26GiVjzUgtq-sUaUTLFd7Scuzi87_Mr-0zSfdbvSs/%3Fcb%3D20180716235147/https/vignette.wikia.nocookie.net/beyblade/images/7/7c/Beyblade_Garuda.png/revision/latest"
})

.addProperty("flightCharge", 0)
.attachSpecial(MeteorStrike)
.attachPassive(BoundDescent)
.attachPassive(FlightMeter)
.attachPassive(FluGuard)
.attachPassive(DankRes)
.attachMode(BoundFlight)
.setDefaultSD("Right");
module.exports = example;

