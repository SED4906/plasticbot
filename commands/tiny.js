const Discord = require('discord.js');
const { createCanvas, loadImage, Image } = require('canvas');
const fs = require('fs');

module.exports = {
	name: 'tiny',
	description: 'Creates very tiny text.',
	usage: '[text]',
	cooldown: 5,
	execute(message, args) {
		if (!args.length) return message.react('❓');
		s = args.join(' ');
		const canvas = createCanvas(200, Math.ceil(s.length/50)*6);
		const ctx = canvas.getContext('2d');
		const img = new Image()
		img.onload = () => {
			for(i=0;i<s.length;i++) {
				if(s[i] == '\n') ctx.drawImage(img, 128, 0, 4, 6, (i%50)*4, Math.floor(i/50)*6, 4, 6);
				else ctx.drawImage(img, Math.min(s.charCodeAt(i)*4, 127*4), 0, 4, 6, (i%50)*4, Math.floor(i/50)*6, 4, 6);
			}
		}
		img.onerror = err => { throw err }
		img.src = './assets/4x6.png';
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tiny.png');
		return message.channel.send("​",attachment);
	}
};
