const Beyblade=require("./Beyblade.js");class LightningLDrago extends Beyblade{constructor(e,s){super("Lightning L-Drago","Attack","https://media.discordapp.net/attachments/736042245442109441/815494544003039252/image2.png",e,s),this.specials=[{name:"Special",requires:function(e,s,t){return e.sp>3},execute:function(e,s,t){s.hp=s.hp-53,e.stamina=e.stamina-1;let a=(new Discord.MessageEmbed).setTitle(`[${e.username}] Lightning L-Drago used **Dragon Emperor Claw Smash**. 53 damage dealt and 1 stamina lost.`).setColor("#551a8b");t.channel.send(a)}}],this.passives=[{name:"Passive",requires:function(e,s,t){return!1},execute:function(e,s,t){s.hp=s.hp-28;let a=(new Discord.MessageEmbed).setTitle(`Uh oh, [${e.username}] ${e.bey.bbname||e.bey.name} tried to use it's passive ability but it was not set up properly. 28 damage dealt.`).setDescription("Please report this at the support server.").setColor("#551a8b");t.channel.createMessage({embed:a})},cd:180}],this.modes=[],this.sd=0,this.sdchangable=!1,this.aliases=[]}}module.exports=LightningLDrago;