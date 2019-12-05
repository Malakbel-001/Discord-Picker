module.exports = {
	name: 'test',
	description: 'Test temp',
	aliases: ['t'],
	guildOnly: true,
	execute(message) {
		message.reply(`Temp test: ${message.guild.name}`);

		message.client.calendar.calendarList.list({
			auth: message.client.jwtClient,
		}, (err, response) => {
			if(err) {
				console.error(err);
			}

			console.log(response.data.items);
		});
	},
};

// message.client.calendar.calendars.delete({
// 	auth: message.client.jwtClient,
// 	calendarId: "kpe90ui9r92ltif72oai4vavu0@group.calendar.google.com",
// }, (err, response) => {
// 	if(err) {
// 		console.error(err);
// 	}
// 	console.log(response);
// });

// message.client.calendar.calendars.delete({
// 	auth: message.client.jwtClient,
// 	calendarId: "pb4sup30ifrp1ff3o2a0i3qh1k@group.calendar.google.com",
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