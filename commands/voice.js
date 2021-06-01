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
		sam = new samjs();
		audiobuffer = sam.buf8(s);
		// Calculate buffer size.
		const realbuffer = new Uint8Array(
			4 + // "RIFF"
			4 + // uint32 filesize
			4 + // "WAVE"
			4 + // "fmt "
			4 + // uint32 fmt length
			2 + // uint16 fmt
			2 + // uint16 channels
			4 + // uint32 sample rate
			4 + // uint32 bytes per second
			2 + // uint16 block align
			2 + // uint16 bits per sample
			4 + // "data"
			4 + // uint32 chunk length
			audiobuffer.length
		);

		let pos=0;
		const write = (buffer) => {
			realbuffer.set(buffer, pos);
			pos+=buffer.length;
		};

		//RIFF header
		write(text2Uint8Array('RIFF')); // chunkID
		write(Uint32ToUint8Array(audiobuffer.length + 12 + 16 + 8 - 8)); // ChunkSize
		write(text2Uint8Array('WAVE')); // riffType
		//format chunk
		write(text2Uint8Array('fmt '));
		write(Uint32ToUint8Array(16)); // ChunkSize
		write(Uint16ToUint8Array(1)); // wFormatTag - 1 = PCM
		write(Uint16ToUint8Array(1)); // channels
		write(Uint32ToUint8Array(22050)); // samplerate
		write(Uint32ToUint8Array(22050)); // bytes/second
		write(Uint16ToUint8Array(1)); // blockalign
		write(Uint16ToUint8Array(8)); // bits per sample
		//data chunk
		write(text2Uint8Array('data'));
		write(Uint32ToUint8Array(audiobuffer.length)); // buffer length
		write(audiobuffer);

		const attachment = new Discord.MessageAttachment(Buffer(realbuffer), 'tts.wav');
		return message.channel.send(attachment);
	}
};
