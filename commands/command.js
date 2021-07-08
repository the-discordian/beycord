const Discord = require("discord.js")

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('COMMANDS')
  .setDescription('Here is the first list of commands that you can use\n\n**start**\nStarts the game\n\n**inventory**\nView what Beys you have and your entire inventory\n\n**equip**\nEquip a Bey with the index number (the number before the name) of a Bey shown in the inventory command.\n\n**ping**\nShows how fast the bot is running in milliseconds.\n\n**shop**\nDisplay the shop.\n\n**purchase**\nPurchase an item with the index number (the number before the name) of the item shown in the shop command.\n\n**current**\nDisplay informations of your currently equipped Bey.\n\n**profile**\nDisplay your blader stats and blader level.\n\n**battle**\nChallenges a blader for a Beyblade battle.\n\n**support**\nDisplay the invite to the support server.\n\n**invite**\nInterested in inviting Beycord? This command is for you.\n\n**setprefix**\nChange the prefix for the server.\n\n**claim**\nCLaim an appeared Bey by guessing its type and answering the math question. \n\n**redirect**\nSet a redirect channel for all the Bey spawns to go in there to prevent spams from other channels. \n\n**trade**\nTrade with your friend for stronger Beys.\n\n**train**\nTrain and gain EXPs. Only works every 15 minute.\n\n**info**\nShows the info of a Bey.\n\n**donate**\n*Donate to keep Beycord alive and running. Your donations are highly appreciated as keeping Beycord running needs quite a lot of money.*\n\nJoin our [discord server!](https://discord.com/invite/42vkvZMv7d)')
  .setColor("#7f7fff")
  .setTimestamp()
  message.author.createMessage({embed:startembed});
}

module.exports.help = {
    name: "commands",
    aliases: ["commandlist", "cmds"],
    desc: "DMs you a list of commands",
    usage: "<commands>"
  }