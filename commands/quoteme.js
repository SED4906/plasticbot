const Discord = require('discord.js');

module.exports = {
	name: 'quoteme',
	description: 'Quotes you on this.',
	usage: '[text]',
	cooldown: 5,
	aliases: ['quote','me'],
	execute(message, args) {
		if (!args.length) return message.react('❓');
		const embed = new Discord.MessageEmbed()
                .setDescription(args.join(' '))
                .setFooter(`-${message.author.username}`, message.author.avatarURL());
                message.channel.send("​",embed)
	}
};
