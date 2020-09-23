module.exports = {
	name: 'test',
	description: 'Setup react message',
	aliases: ['t'],
	execute(message) {
		// test guild channel id

		const result = message.client.sql.getGuildChannelId(message.guild);
		console.log(result);
	},
};