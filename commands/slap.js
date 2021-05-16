const Discord = require('discord.js');

module.exports = {
	name: 'slap',
	description: 'Trout someone.',
	usage: 'mention',
	cooldown: 2,
	execute(message, args) {
		if(!message.mentions.users.first()) return message.react('❓');
		rng=Math.random();
		if(rng <= 0.04) return message.channel.send(`Trout WHIFFA YU ${message.mentions.users.first().username}`);
		else if(rng <= 0.08) return message.channel.send(`A Trout BROACHETH ${message.mentions.users.first().username}`);
		else return message.channel.send(`<:trout:821745962610851850> ***WHACK!*** ${message.author.username} slaps ${message.mentions.users.first().username} around a bit with a wet trout.`);
	}
};
