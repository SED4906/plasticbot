const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'voice',
	description: 'A phonetic TTS',
	usage: '[text]',
	cooldown: 5,
	execute(message, args) {
		if (!args.length) return message.react('❓');
		s = args.join(' ');
		sarr = [Buffer.from([82,73,70,70,0,0,0,0,87,65,86,69,102,109,116,32,16,0,0,0,1,0,1,0,64,31,0,0,64,31,0,0,1,0,8,0,100,97,116,97,0,0,0,0])];
		sizedata = 0;
		
		for(c of s) {
			if(c==' ' || c=='-'){
				sarr.push(Buffer.from(Array.from({length:256}).fill(128)));
				sizedata += 256;
			}else if(c>='a' || c<='z'){
				sdata = fs.readFileSync('./assets/tts/'+c+'.pcm');
				switch(c) {
					case 'w':
					case 'x':
					case 'q':
					case 'a':
					case 'e':
					case 'i':
					case 'o':
					case 'u':
					case 'y':
					case 'm':
					case 'n':
					case 'v':
					case 'e':
					case 'r':
						for(i=0;i<10;i++) {
							sarr.push(sdata)
						}
						sizedata += sdata.length * 10;
						break;
					default:
						sarr.push(sdata)
						sizedata += sdata.length;
				}
			}else{
				return message.react('⁉️');
			}
		}
		
		console.log(sizedata);
		
		sarr[0].writeInt32LE(sizedata+36,4)
		sarr[0].writeInt32LE(sizedata,40)
		
		const attachment = new Discord.MessageAttachment(Buffer.concat(sarr), 'tts.wav');
		return message.channel.send(attachment);
	}
};
