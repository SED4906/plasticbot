const figlet = require('figlet');

module.exports = {
	name: 'figlet',
	description: 'Uses figlet to make large ASCII banners.',
	usage: '[text]',
	cooldown: 5,
	aliases: ['big'],
	execute(message, args) {
		if (!args.length) return message.react('❓');
		figlet(args.join(' '), function(err, data) {
			if (err) return message.react('❗');
			message.channel.send('```' + data + '```');
		});
	}
};
