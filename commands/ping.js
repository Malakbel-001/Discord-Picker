module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message) {
		message.channel.send(`pong${message.client.sql.getPrefix(message.guild)}`).catch(console.error);
	},
};