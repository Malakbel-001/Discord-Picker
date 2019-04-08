module.exports = {
	name: 'test',
	description: 'Test temp',
	aliases: ['t'],
	guildOnly: true,
	execute(message) {
		message.reply("Temp test");
		// message.client.calendar.calendars.delete({
		// 	auth: message.client.jwtClient,
		// 	calendarId: "ln271m0678plfvgkqij3ksr7b8@group.calendar.google.com",
		// }, (err, response) => {
		// 	if(err) {
		// 		console.error(err);
		// 	}

		// 	console.log(response);
		// });


		// message.client.calendar.calendars.insert({
		// 	auth: message.client.jwtClient,
		// 	requestBody: {
		// 		summary: "test new calendar",
		// 	},
		// }, (err, response) => {
		// 	if(err) {
		// 		console.error(err);
		// 	}

		// 	console.log(response);
		// });
	},
};