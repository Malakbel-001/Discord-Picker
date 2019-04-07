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
			timeMin: moment().format(),
			// orderBy: 'startTime',
		}, function(err, response) {
			// console.log(response);
			// console.log(response.data.items);
			response.data.items.sort(function(eventA, eventB) {
				const dateA = new Date(eventA.start.dateTime), dateB = new Date(eventB.start.dateTime);
				return dateA - dateB;
			});

			response.data.items.forEach(function(event) {
				message.channel.send(stripIndents` \`\`\`Event: ${event.summary} 
				Start: ${moment(event.start.dateTime).format('dddd DD/MM/YY HH:mm Z')} 
				End  : ${moment(event.end.dateTime).format('dddd DD/MM/YY HH:mm Z')}\`\`\``);
			});
		});
	},
};