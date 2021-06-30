const Discord = require('discord.js');
const { prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Displays usage information for commands.',
	usage: '[command]',
	cooldown: 1,
	execute(message, args) {
		const { commands } = message.client;
		if(!args.length) {
			const embed = new Discord.MessageEmbed()
			.setTitle('Commands')
			.setDescription(commands.map(command => command.name).join(', '))
			.setFooter(`Use ${prefix}help ${this.usage} to get info on a specific command.`);
			return message.channel.send(embed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if(!command) return message.react('⁉️');

		aliaslist = 'N/A';
		if(command.aliases) aliaslist = command.aliases.join(', ');

		const embed = new Discord.MessageEmbed()
		.setTitle(command.name)
		.setDescription(command.description || 'N/A')
		.addField('Usage',`${prefix}${command.name} ${command.usage}`)
		.setFooter(`Aliases: ${aliaslist} | Cooldown: ${command.cooldown || 3} second(s)`);

		message.channel.send("​",embed);
	}
};
