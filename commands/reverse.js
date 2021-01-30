module.exports = {
	name: 'reverse',
	description: 'Reverses text.',
	usage: '[text]',
	aliases: ['esrever'], 
	execute(message, args) {
		if (!args.length) return message.react('❓');
		message.channel.send(args.join(' ').split('').reverse().join(''));
	}
};
