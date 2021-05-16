const { prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command.',
	usage: '[command]',
	execute(message, args) {
		if (message.author.id!=395268886515154945) return message.react("🔐");
		if (!args.length) return message.react("❓");
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return message.react('⁉️');
		delete require.cache[require.resolve(`./${command.name}.js`)];
		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.react('👌');
		} catch (error) {
			console.error(error);
			message.react('❗');
		}
	}
};