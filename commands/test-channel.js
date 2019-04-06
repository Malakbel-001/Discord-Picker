module.exports = {
	name: 'test-channel',
	description: 'Test temp.',
	guildOnly: true,
	execute(message) {
		// TODO: untested
		if(message.client.sql.getDsPickerChannel(message.guild)) {
			message.client.channels.get(message.client.sql.getDsPickerChannel(message.guild)).send("Hello");
		}
		else {
			// TODO:
			message.reply("No.");
		}
	},
};