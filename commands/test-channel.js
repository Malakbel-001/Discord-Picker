module.exports = {
	name: 'test-channel',
	description: 'Test temp.',
	guildOnly: true,
	execute(message) {
		// TODO:
		message.client.channels.get(message.client.sql.getDsPickerChannel(message.guild)).send("Hello");
	},
};