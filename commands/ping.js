module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send(`pong${message.content.charAt(0)}`).catch(console.error);
	},
};