const Discord = require('discord.js');
const samjs = require('sam-js');

module.exports = {
	name: 'voice',
	aliases: ['tts','sam'],
	description: 'A TTS based on SAM.',
	usage: '[text]',
	cooldown: 5,
	execute(message, args) {
		if (!args.length) return message.react('❓');
		s = args.join(' ');
		sam = new SamJs();
		const attachment = new Discord.MessageAttachment(sam.buf8(s), 'tts.wav');
		return message.channel.send(attachment);
	}
};
