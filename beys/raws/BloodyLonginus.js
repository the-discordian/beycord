const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function ReqScream(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stability >= (20 + .1 * acted.lvl);
}
function Scream(acted, victim, logger){{
    acted.bey.ScreamCounter = 0;
    if (Math.floor(Math.random()*2) == 1){
        victim.hp -= (40 + 0.2 * victim.lvl);
        acted.bey.ScreamCounter += 1; 
        }
        if (Math.floor(Math.random()*4) == 0){
            victim.hp -= (40 + 0.2 * victim.lvl);
            acted.bey.ScreamCounter += 1; 
            }
            if (Math.floor(Math.random()*6) == 0){
                victim.hp -= (40 + 0.2 * victim.lvl);
                acted.bey.ScreamCounter += 1; 
                }
    }
    victim.hp -= (40 + 0.2 * victim.lvl);
    acted.bey.ScreamCounter += 1;
    //What will a special do
logger.add(`[${acted.username}] Bloody Longinus used **Dragon Scream**! ${acted.bey.ScreamCounter}x hits!`);
}
const DScream = new bcworkshop.Special("Dragon Scream", ReqScream, Scream);

function ReqSquall(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stability <= (20 + 0.1 * acted.lvl);
}
function Squall(acted, victim, logger){
    victim.hp -= (60 + 0.6 * victim.lvl);
    victim.stability -= (5 + 0.2 * victim.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Bloody Longinus used **Bloody Squall**!`);
}
const BSquall = new bcworkshop.Special("Bloody Squall", ReqSquall, Squall);


function ReqJoltR(acted, victim, logger){
    let chance = Math.floor(Math.random()*4);
    return acted.move == "fight" && acted.stamina >= Math.round((acted.maxstamina/100)*80) && chance == 0;
    //Requirement to activate IF there's a mode change
}
function JoltR(acted, victim, logger){
    acted.atk += (0.5 + 0.02 * acted.lvl);
    acted.stamina -= (0.2 - 0.02 * acted.lvl);
    logger.add(`[${acted.username}] Bloody Longinus is on mode **Jolt Rush**!`);
    //What will mode change do
}
const JRush = new bcworkshop.Mode("Jolt Rush", ReqJoltR, JoltR);

const BloodyLonginus = new bcworkshop.Beyblade({name:"Bloody Longinus", type: "Attack", imageLink:"https://static.wikia.nocookie.net/beyblade/images/f/f6/BeybladeBloodyLonginusAnime.png/revision/latest/scale-to-width-down/553?cb=20190918213350"})

.addProperty("ScreamCounter", 0)
.attachSpecial(DScream)
.attachSpecial(BSquall)
.attachMode(JRush)
.setDefaultSD("Left")
module.exports = BloodyLonginus;