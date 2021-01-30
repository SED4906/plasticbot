const Discord = require('discord.js');
const { token, prefix } = require('./config.json');
const fs = require('fs');

// Load command modules
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('the sound of my tears // 2help', { type: 'LISTENING' });
});

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

client.on('message', message => {
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content) || message.author.bot) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) return message.react('⏱️');
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		return message.react('❗');
	}
	
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
});

client.login(token);