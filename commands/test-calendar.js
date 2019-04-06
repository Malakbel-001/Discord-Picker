const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'test-calendar',
	description: 'Test temp.',
	guildOnly: true,
	aliases: ['test'],
	execute(message) {
		message.client.calendar.events.list({
			auth: message.client.jwtClient,
			calendarId: message.client.sql.getGoogleCalendarId(message.guild),
		}, function(err, response) {
			// console.log(response);
			response.data.items.forEach(function(item) {
				message.channel.send(stripIndents` \`\`\`Event: ${item.summary} 
				Start: ${moment(item.start.dateTime).format('dddd DD/MM/YY HH:mm Z')} 
				End  : ${moment(item.end.dateTime).format('dddd DD/MM/YY HH:mm Z')}\`\`\``);
			});
		});
	},
};