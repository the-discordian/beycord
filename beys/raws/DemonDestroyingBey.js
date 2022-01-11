const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function StartingModeRequirement(acted, victim, logger){//StartingMode Requirement
     return acted.bey.TypeLock == false;
 }
 
 function StartingModeEffect(acted, victim, logger){//StartingMode Effect
     switch((Math.floor(Math.random() * 4))){
         case 0:
              acted.bey.type = "Attack";
         break;
         case 1:
              acted.bey.type = "Defense";
         break;
         case 2:
              acted.bey.type = "Stamina";
         break;
         case 3:
              acted.bey.type = "Balance";
         break;
    }
    logger.add(`[${acted.username}] Demon Destroying Bey launched in **${acted.bey.type}** Mode!`);
    acted.bey.TypeLock = true;
 }
 
 const StartingMode = new bcworkshop.Mode("Starting Mode", StartingModeRequirement, StartingModeEffect);


function WindFormRequirement(acted, victim, logger){//WindForm Requirement
    return acted.sp >= 3 && acted.bey.type == "Attack";
}

function WindFormEffect(acted, victim, logger){//WindForm Effect
     switch(Math.floor(Math.random() * 3)){
          case 0:
               acted.bey.type = "Balance";
          break;
          case 1:
               acted.bey.type = "Defense";
          break;
          case 2:
               acted.bey.type = "Stamina";
          break;
     }
     acted.stability -= 15;
     victim.hp -= (50 + .4 * acted.lvl);
     acted.bey.Form = true;
     if (acted.bey.sd == "Right"){
     logger.add(`[${acted.username}] Demon Destroying Bey used **Wind ${acted.bey.animal} Form: ${acted.bey.prefix} Storm**! Type changed to **${acted.bey.type}**!`);
     }else{
     logger.add(`[${acted.username}] Demon Destroying bey used **Wind ${acted.bey.animal} Form: Vanishing ${acted.bey.suffix}**! Type changed to **${acted.bey.type}!`);
     }
}

const WindForm = new bcworkshop.Special("Wind Blading Form", WindFormRequirement, WindFormEffect);


function GaiaFormRequirement(acted, victim, logger){//GaiaForm Requirement
     return acted.sp >= 3 && acted.bey.type == "Defense";
 }
 
 function GaiaFormEffect(acted, victim, logger){//GaiaForm Effect
      switch(Math.floor(Math.random() * 3)){
           case 0:
                acted.bey.type = "Balance";
           break;
           case 1:
                acted.bey.type = "Attack";
           break;
           case 2:
                acted.bey.type = "Stamina";
           break;
      }
      victim.stability -= 10;
      victim.atk -= (victim.atk/100 * 30 + .5 * acted.lvl);
      acted.bey.Form = true;
      if (acted.bey.sd == "Right"){
      logger.add(`[${acted.username}] Demon Destroying Bey used **Gaia ${acted.bey.animal} Form: ${acted.bey.prefix} Force**! Type changed to **${acted.bey.type}**!`);
      }else{
      logger.add(`[${acted.username}] Demon Destroying Bey used **Gaia ${acted.bey.animal} Form: Seismic ${acted.bey.suffix}**! Type changed to **${acted.bey.type}**!`);
      }

 }
 
 const GaiaForm = new bcworkshop.Special("Gaia Blading Form", GaiaFormRequirement, GaiaFormEffect);

 
 function FlameFormRequirement(acted, victim, logger){//FlameForm Requirement
     return acted.sp >= 4 && acted.bey.type == "Stamina";
}
 
function FlameFormEffect(acted, victim, logger){//FlameForm Effect
     switch(Math.floor(Math.random() * 3)){
          case 0:
               acted.bey.type = "Balance";
          break;
          case 1:
               acted.bey.type = "Attack";
          break;
          case 2:
               acted.bey.type = "Defense";
          break;
     }
     acted.stamina += (acted.stamina * 2);
     if (acted.stamina > 15) {
          acted.stamina = 15;
     }
     acted.stability += 10;
     acted.bey.Form = true;
     if (acted.bey.sd == "Right"){
     logger.add(`[${acted.username}] Demon Destroying Bey used **Flame ${acted.bey.animal} Form: ${acted.bey.prefix} Inferno**! Type changed to **${acted.bey.type}**!`);
     }else{
     logger.add(`[${acted.username}] Demon Destroying Bey used **Flame ${acted.bey.animal} Form: Blazing ${acted.bey.suffix}**! Type changed to **${acted.bey.type}**!`);
     }
} 

const FlameForm = new bcworkshop.Special("Flame Blading Form", FlameFormRequirement, FlameFormEffect);


function WaterFormRequirement(acted, victim, logger){//WaterForm Requirement
     return acted.sp >= 5 && acted.bey.type == "Balance";
}

function WaterFormEffect(acted, victim, logger){//WaterForm Effect
     switch(Math.floor(Math.random() * 3)){
          case 0:
               acted.bey.type = "Stamina";
          break;
          case 1:
               acted.bey.type = "Attack";
          break;
          case 2:
               acted.bey.type = "Defense";
          break;
     }
     acted.hp = (acted.hp * 2);
     acted.stability += 20;
     acted.bey.Form = true;
     if (acted.bey.sd == "Right"){
     logger.add(`[${acted.username}] Demon Destroying Bey used **Aqua ${acted.bey.animal} Form: ${acted.bey.prefix} Tides**! Type changed to **${acted.bey.type}**!`);
     }else{
     logger.add(`[${acted.username}] Demon Destroying Bey used **Aqua ${acted.bey.animal} Form: Abyssal ${acted.bey.suffix}**! Type changed to **${acted.bey.type}**!`);
     }
}


const WaterForm = new bcworkshop.Special("Aqua Blading Form", WaterFormRequirement, WaterFormEffect);


function AnimalFormRequirement(acted, victim, logger){
    return acted.bey.Form == true;
}

function AnimalFormEffect(acted, victim, logger){
     switch(Math.floor(Math.random() * 4)){
          case 0:
               acted.bey.animal = "Dragon";
               acted.bey.prefix = "Daunting";
               acted.bey.suffix = "Roar";
               victim.atk = (victim.atk/2);
          break;
          case 1:
               acted.bey.animal = "Tiger";
               acted.bey.prefix = "Beastly";
               acted.bey.suffix = "Claw";
               acted.stamina += (victim.stamina/100 * 40);
          break;
          case 2:
               acted.bey.animal = "Wolf";
               acted.bey.prefix = "Howling";
               acted.bey.suffix = "Fang";
               victim.stability -= 10;
          break;
          case 3:
               acted.bey.animal = "Phoenix";
               acted.bey.prefix = "Undying";
               acted.bey.suffix = "Wing";
               acted.hp += (acted.maxhp/100 * 5);
          break;
     }
     acted.bey.Form = false;
}

const AnimalForms = new bcworkshop.Mode("Animal Form", AnimalFormRequirement, AnimalFormEffect);


const DemonDestroyingBey = new bcworkshop.Beyblade({name: "Demon Destroying Bey", type: "Balance", imageLink: "https://cdn.glitch.com/7f7cfead-eec3-467c-866a-948e538f87c9%2Fkimetsunobeiburedo.png?v=1581766665854"})
.attachSpecial(WindForm)
.attachSpecial(GaiaForm)
.attachSpecial(FlameForm)
.attachSpecial(WaterForm)
.attachMode(StartingMode)
.attachMode(AnimalForms) 
.addProperty("Form", false)
.addProperty("TypeLock", false)
.addProperty("animal", false)
.addProperty("prefix", false)
.addProperty("suffix", false)
.setDefaultSD("Right")
.setSDChangable(true);
module.exports = DemonDestroyingBey;