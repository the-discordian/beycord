const Fuse = require("fuse.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
	const beys = [];
	client.beys.array().forEach(b => {
	if(b !== (client.beys.get("Buddy Bey"))){
	let be = new b(); 
	if(be.name) beys.push(be.name);
	}
	});
	const fuse = new Fuse(beys, {threshold: 0.4});
	if(!args[0]) return message.reply("please enter a word to search.")
	let results = fuse.search(args.join(" "));
	if(!results[0]) return message.reply("no results found.");
	let result = "";
	let first = results.shift();
	result += `**Top search result:** \`${first.item}\``;
	if(results[0]){
		result += "\n**Other matching results:**\n";
		results.forEach(bey => result += `\`${bey.item}\`\n`);
	}
	message.channel.createMessage(result);
}

module.exports.help = {
	name: "search",
	desc: "Search for a Bey using simple queries.",
	usage: "search <query> - Search a Bey using a query.",
	aliases: []
}