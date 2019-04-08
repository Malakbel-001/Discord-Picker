const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'display',
	description: 'Display upcoming events',
	guildOnly: true,
	aliases: ['display', 'disp', 'show', 'show-events'],
	execute(message) {
		message.client.calendar.events.list({
			auth: message.client.jwtClient,
			calendarId: message.client.sql.getGoogleCalendarId(message.guild),
			timeMin: moment().format(),
		}, function(err, response) {
			// Sort events by startDate
			response.data.items.sort(function(eventA, eventB) {
				const dateA = new Date(eventA.start.dateTime), dateB = new Date(eventB.start.dateTime);
				return dateA - dateB;
			});

			// Show newly added event
			response.data.items.forEach(function(event) {
				message.channel.send(stripIndents` \`\`\`Event: ${event.summary} 
				Start: ${moment(event.start.dateTime).format('dddd DD/MM/YY HH:mm Z')} 
				End  : ${moment(event.end.dateTime).format('dddd DD/MM/YY HH:mm Z')}\`\`\``);
			});
		});
	},
};