const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let helpArray = message.content.split(" ");
  let helpArgs = helpArray.slice(1);

  if((!helpArgs[0]) || (helpArgs[0] === "1")){
    let embed = new Discord.MessageEmbed()
    .setTitle("HELP")
    .setDescription("Here is the first list of commands that you can use.")
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .addFields(
      {name: "start", value: "Starts the game. Most commands require this to be ran before using them as this sets up your profile and stuffs."},
      {name: "inventory", value: "View what Beys you have and your entire inventory."},
      {name: "equip", value: "Equip a Bey with the index number (the number before the name) of a Bey shown in the inventory command."},
      {name: "ping", value: "Shows how fast the bot is running in milliseconds."},
      {name: "shop", value: "Displays the shop."},
      {name: "purchase", value: "Purchase an item with the index number (the number before the name) of the item shown in the shop command."},
      {name: "current", value: "Display informations of your currently equipped Bey."},
      {name: "profile", value: "Display your blader stats and blader level."},
      {name: "battle", value: "Challenges a blader for a Beyblade battle."},
      {name: "support", value: "Display the invite to the support server."},
      {name: "invite", value: "Interested in inviting Beycord? This command is for you."},
      {name: "setprefix", value: "Change the prefix for the server."},
      {name: "leaderboard", value: "View the leaderboard and ranks of the top 10 players in Beycord."},
      {name: "event", value: "View the current event."},
      {name: "claim", value: "Claim an appeared Bey by guessing it's type and answering the math question."},
      {name: "redirect", value: "Set a redirect channel for all the Bey spawns to go in there to prevent spams from other channels."},
      {name: "trade", value: "Trade with your friends for stronger Beys."},
      {name: "vote", value: "Upvote the bot on DBL and get rewards!"},
      {name: "code", value: "Claim codes and get rewards."},
      {name: "faction", value: "This command is too complicated so it has it's own help embed. Type `;faction` help for the embed."},
      {name: "train", value: "Train and gain EXPs. Only works once every 15 minutes."},
      {name: "shard", value: "Displays the ID of the shard that the server belongs to."},
      {name: "info", value: "Shows the info of a Bey."},
      {name: "getpremium", value: "Buys or activates your premium membership."},
      {name: "donate", value: "Donate to keep Beycord alive and running. Your donations are highly appreciated as keeping Beycord running needs quite a lot of money."}
    )
    .setColor(0x7f7fff)
    .setFooter(`PAGE 1/2`);
    message.author.createMessage({embed:embed});
  } else if(helpArgs[0] && helpArgs[0].toLowerCase() == "2"){
    let embed = new Discord.MessageEmbed()
    .setTitle("HELP")
    .setDescription("Here is the second list of commands that you can use.")
    .setThumbnail(client.user.avatarURL)
    .setTimestamp()
    .addFields(
      {name: "booster", value: "Shows your current active stats boosters"},
      {name: "clear", value: "Clear your duplicates, leaving the one with the highest level and the starreds. Doesn't remove Buddy Beys and your starter due to obvious reasons."},
      {name: "attach", value: "Attach an item to a Bey."},
      {name: "detach", value: "Detach an item to a Bey."},
      {name: "rankup", value: "Rankup and aquire Valtz. You need 100 wins to rank up."},
      {name: "botinfo", value: "Displays information about the bot."},
      {name: "debug", value: "Debugs a Bey to find bugs and potentially fixes it."},
      {name: "giveaways", value: "Host, enter and view giveaways!"},
      {name: "iteminventory", value: "View your inventory of items"},
      {name: "partinventory", value: "View what Bey parts you have in your inventory."},
      {name: "part", value: "Check for a Bey part's information."},
      {name: "knownbugs", value: "View any known bugs or issues with Beycord."},
      {name: "launcher", value: "Equip, unequip and view your launchers"},
      {name: "pay", value: "Pay someone with Valtz."},
      {name: "quests", value: "Complete quests and earn rewards!"},
      {name: "resetstates", value: "Reset your states data in case you are stuck in a battle or prompt."},
      {name: "settings", value: "Configure your settings."},
      {name: "sort", value: "Sort your inventory to find Beys faster."},
      {name: "star", value: "Star or unstar a Bey."},
      {name: "stars", value: "View all of the starred Beys."},
      {name: "transactionhistories", value: "Check your trade and payment history."},
      {name: "upgrade", value: "Upgrades your equipped Bey to it's next generation."},
      {name: "use", value: "Use an item."},
      {name: "whitemarket", value: "Sell or buy Beys from the White Market."},
      {name: "switch", value: "Changes the Bey's spin direction. (if possible)."}
    )
    .setColor(0x7f7fff)
    .setFooter(`PAGE 2/2`);
    message.author.createMessage({embed:embed});
  }

  if(helpArgs[0]) {
    let command = helpArgs[0];
    if(client.commands.has(command)) {
      command = client.commands.get(command);
      let startembed = new Discord.MessageEmbed()
      .setAuthor("Command Info", client.user.avatarURL)
      .setTitle(`\`${command.help.name}\` Command`)
      .setDescription(`${command.help.desc || "There is no Description for this command."}`)
      .addFields(
        {name: "Usage", value: `${command.help.usage || "No usage"}`},
        {name: "Aliases", value: `${command.help.aliases || "No Aliases"}`}
      )
      .setColor("#7f7fff")
      .setTimestamp();
      message.author.createMessage({embed:startembed}).catch(() => message.reply("I can't send the help message. Make sure to turn on DMs."));
    }
  }
}

module.exports.help = {
  name: "help",
  aliases: []
}