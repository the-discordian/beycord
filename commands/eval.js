const Discord = require('discord.js');

//EVAL Function
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

  //EVAL Command Handler
  module.exports.run = async (client, message, args, prefix, player, db) => {
      if(message.author.id !== process.env.ownerID) return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        message.channel.createMessage('```\nYou are authorized to use this command!```')
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        message.channel.createMessage(`\`\`\`js\n${clean(evaled)}\n\`\`\``);
      } catch (err) {
        message.channel.createMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
    module.exports.help = {
        name: "eval",
              };