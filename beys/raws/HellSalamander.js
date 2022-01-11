const bcworkshop = require("bcworkshop");

function SRHSRequirement(acted, victim, logger){
     return acted.sp >= 3 && acted.bey.type == "Attack";
}

function SRHS(acted, victim, logger){
     victim.hp -= (50 + .7 * acted.lvl);
     acted.stamina -= (1 + .008 * acted.lvl);
     acted.stability -= 20;
     victim.stability -= 25;
     acted.sp -= 3;
     logger.add(`[${acted.username}] Hell Salamander used **Sword Rebellion Hell Slash**!`);
}

const SwordRebellionHellSlash = new bcworkshop.Special("Sword Rebellion Hell Slash", SRHSRequirement, SRHS);


function RCHRequirement(acted, victim, logger){
     return acted.sp >= 3 && acted.bey.type == "Defense";
}

function RCH(acted, victim, logger){
      acted.stamina = (1 + .018 * acted.lvl);
      acted.stability += 5;
      victim.atk = (victim.atk = (victim.atk/100 * (50 - .2 * acted.lvl)));
      acted.sp -= 3;
      logger.add(`[${acted.username}] Hell Salamander used **Raging Crimson Hellfire**!`);
}

const RagingCrimsonHellfire = new bcworkshop.Special("Raging Crimson Hellfire", RCHRequirement, RCH);


function BRRequirement(acted, victim, logger){
     return acted.sp >= .2 && acted.move == "fight";
}

function BR(acted, victim, logger){
     switch(acted.bey.SalamanderMode){
          case 0:
               victim.atk -= (Math.round(victim.atk/100 * 90));
          break;
          case 1:
               acted.atk += (Math.round(victim.hp/100 * 5));
          break;
     }
     acted.sp -= .2;
}

const BurningResonance = new bcworkshop.Mode("Burning Resonance", BRRequirement, BR);

function FIFRequirements(acted, victim, logger){
      return acted.sp >= 3 && acted.bey.type == "Defense" && victim.move == "fight";
}

function FIF(acted, victim, logger){
    if((Math.floor(Math.random() * 99) <= 9)){
         acted.hp += (victim.atk/100 * (120 + .3 * acted.lvl));
         acted.sp -= 3;
         logger.add(`[${acted.username}] Hell Salamander activated **Forged in Fire**!`);
    }
}

const ForgedInFire = new bcworkshop.Passive("Forged In Fire", FIFRequirements, FIF, 60);


function UTRequirements(acted, victim, logger){
      return acted.sp >= 4 && acted.bey.type == "Attack" && victim.move == "fight";
}

function UT(acted, victim, logger){
     if((Math.floor(Math.random() * 99) <= 29)){
          victim.atk -= (victim.atk = (victim.atk/100 * (30 - .3 * acted.lvl)));
          acted.stability -= 5;
          acted.sp -= 4;
          logger.add(`[${acted.username}] Hell Salamander activated **Untouchable Flame**!`);
     }
}

const UntouchableFlame = new bcworkshop.Passive("Untouchable Flame", UTRequirements, UT, 60);


function AttackRequirement(acted, victim, logger){
     return acted.bey.SalamanderMode == 1;
}

function AttackM(acted, victim, logger){
     acted.bey.type = "Attack";
     logger.add(`[${acted.username}] launched Hell Salamander in **Attack** mode!`);
}

const AttackMode = new bcworkshop.Mode("Attack Mode", AttackRequirement, AttackM);


function DefenseRequirement(acted, victim, logger){
     return acted.bey.SalamanderMode == 0;
}

function DefenseM(acted, victim, logger){
     acted.bey.type = "Defense";
     logger.add(`[${acted.username}] launched Hell Salamander in **Defense** mode!`);
}

const DefenseMode = new bcworkshop.Mode("Defense Mode", DefenseRequirement, DefenseM);


const HellSalamander = new bcworkshop.Beyblade({name: "Hell Salamander", type: "Balance", imageLink: "https://i.imgur.com/5PgZtDe.png", aliases: ["Heat Salamander"]})
.attachSpecial(SwordRebellionHellSlash)
.attachSpecial(RagingCrimsonHellfire)
.attachPassive(ForgedInFire)
.attachPassive(UntouchableFlame)
.attachMode(BurningResonance)
.attachMode(AttackMode)
.attachMode(DefenseMode)
.addProperty("SalamanderMode", "(Math.floor(Math.random() * 2))")
.setDefaultSD("Left");

module.exports = HellSalamander;