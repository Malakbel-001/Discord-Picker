module.exports = {
	name: 'setup',
	description: 'Setup google calendar id for now',
	guildOnly: true,
	args: true,
	usage: ['googleCalendarId'],
	execute(message, args) {
		message.client.sql.setGoogleCalendarId(message.guild, args[0]);
		message.reply(message.client.sql.getGoogleCalendarId(message.guild));
	},
};