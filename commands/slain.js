const Discord = require('discord.js');
const { createCanvas, loadImage, Image } = require('canvas');
const fs = require('fs');

module.exports = {
	name: 'slain',
	description: 'Perish.',
	usage: '(mention)',
	cooldown: 5,
	execute(message, args) {
		deathmessages = [' was slain.', ' was eviscerated.', ' was murdered.',
		"'s face was torn off.", "'s entrails were ripped out.", ' was destroyed.',
		"'s skull was crushed.", ' got massacred.', ' got impaled.',
		' was torn in half.', ' was decapitated.', ' let their arms get torn off.',
		' watched their innards become outards.', ' was brutally dissected.', "'s extremities were detached.",
		"'s body was mangled.", "'s vital organs were ruptured.", ' was turned into a pile of flesh.',
		` was removed from ${message.guild.name}.`, ' got snapped in half.', ' was cut down the middle.',
		' was chopped up.', "'s plea for death was answered.", "'s meat was ripped off the bone.",
		"'s flailing about was finally stopped.", ' had their head removed.', ' lost their head.',
		' fell to their death.', " didn't bounce.", ' fell victim of gravity.',
		' faceplanted the ground.', ' left a small crater.', ' forgot to breathe.',
		' is sleeping with the fish.', ' drowned.', ' is shark food.',
		' got melted.', ' was incinerated.', ' tried to swim in lava.',
		' likes to play in magma.', " couldn't put the fire out.", " couldn't find the antidote.",
		" couldn't breathe.", " couldn't contain the watts.", ' shattered into pieces.',
		" can't be put back together again.", ' needs to be swept up.', ' just became another dirt pile.',
		" didn't materialize.", "'s legs appeared where their head should be.", ' was licked.',
		' tried to escape.', ' was slain...', ' was stabbed.'];
		uname = message.author.username;
		if(message.mentions.users.first()) uname = message.mentions.users.first().username;
		const canvas = createCanvas(400, 32);
		const ctx = canvas.getContext('2d');
		ctx.font = "20px Andy";
		ctx.fillStyle = "red";
		rmesg = deathmessages[Math.floor(Math.random() * deathmessages.length)];
		deathmessage = `${uname}${rmesg}`
		ctx.fillText(deathmessage,0,20);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'slain.png');
		return message.channel.send(attachment);
	}
};
