const bcworkshop = require("bcworkshop");

function dpreq(acted, victim, logger){
    let chance = Math.floor(Math.random() * 4);
    return ((victim.move == "fight" && chance == 0 && (acted.hp/acted.maxhp*100) < 75) || (victim.move == "fight" && (acted.hp/acted.maxhp*100) < 30)) && !acted.bey.miniOut;
}

function dpuse(acted, victim, logger){
    acted.bey.miniOut = true;
    logger.add(`[${acted.username}] Venom Diabolos' mini Bey has been hit off.`);
    let extradamage = setInterval(() => {
        victim.stamina -= 0.5;
        victim.stability -= 1;
    }, 2000);
    let time = 12000+((acted.lvl-1)*500);
    setTimeout(() => {
        clearInterval(extradamage);
        logger.add(`[${acted.username}] Venom Diabolos' mini Bey ringed-out.`);
    }, time)
}

const DualPhantom = new bcworkshop.Passive("Dual Phantom / Bullet Attack", dpreq, dpuse);

function ccreq(acted, victim, logger){
    return acted.bey.miniOut && !acted.bey.miniGone && acted.sp >= 1;
}

function ccuse(acted, victim, logger){
    acted.sp -= 1;
    logger.add(`[${acted.username}] Venom Diabolos used **Bullet Cannon**!`);
    victim.hp -= Math.round(acted.atk+6);
    victim.stability -= 2;
}

const BulletCannon = new bcworkshop.Special("Bullet Cannon", ccreq, ccuse);

function slreq(acted, victim, logger){
    return acted.sp > 4;
}

function sluse(acted, victim, logger){
    acted.sp -= 4;
    victim.hp -= (30+(Math.round((acted.lvl-1)*0.9)));
    victim.stability -= 5;
    acted.stability -= 3;
    logger.add(`[${acted.username}] Venom Diabolos used **Shining Launch**!`);
}

const ShiningLaunch = new bcworkshop.Special("Shining Launch", slreq, sluse);

function screq(acted, victim, logger){
    return acted.bey.miniOut && !acted.bey.miniGone && acted.sp >= 5 && (victim.hp / victim.maxhp * 100) < 15;
}

function scuse(acted, victim, logger){
    acted.sp -= 5;
    victim.hp = 0;
    victim.stamina = 0;
    victim.stability = 0;
    logger.add(`[${acted.username}] Venom Diabolos used **Shining Cross**! RIP the opponent.`);
}

const ShiningCross = new bcworkshop.Special("Shining Cross", screq, scuse);

function bireq(acted, victim, logger){
    return acted.bey.miniOut && !acted.bey.miniGone && acted.sp > 3;
}

function biuse(acted, victim, logger){
    acted.sp -= 3;
    victim.hp -= (28+Math.round((acted.lvl-1)*0.32))
    victim.stability -= 10;
}

const BulletImpact = new bcworkshop.Special("Bullet Impact", bireq, biuse);

const VenomDiabolos = new bcworkshop.Beyblade({name: "Venom Diabolos", type: "Balance", imageLink: "https://static.wikia.nocookie.net/beyblade/images/d/d1/BBGT_Venom_Diabolos_Vanguard_Bullet_Beyblade_2.png/revision/latest/scale-to-width-down/349?cb=20191229014921"})
.setDefaultSD("RIGHT")
.addProperty("miniOut", false)
.addProperty("miniGone", false)
.attachPassive(DualPhantom)
.attachSpecial(BulletCannon)
.attachSpecial(ShiningLaunch)
.attachSpecial(ShiningCross)
.attachSpecial(BulletImpact);

module.exports = VenomDiabolos;