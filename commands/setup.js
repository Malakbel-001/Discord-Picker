const strings = require('../strings/setup');

module.exports = {
	name: 'setup',
	description: 'Setting up Google Calendar integration with your server',
	guildOnly: true,
	async execute(message) {
		try {
			await message.reply(strings.setupStart);
			await awaitYesNo(message.author.id, message);
		}
		catch(error) {
			console.error(error);
		}


		// message.client.sql.setGoogleCalendarId(message.guild, args[0]);
		// message.reply(message.client.sql.getGoogleCalendarId(message.guild));
	},
};

function checkYes(m) { return m === "y" || m === "yes"; }
function checkNo(m) { return m === "n" || m === "no"; }

function awaitYesNo(initiatorId, message) {
	return new Promise(resolve => {
		const filter = newMessage => {
			return initiatorId = newMessage.author.id;
		};

		message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				console.log(collected);
				// if(checkYes) { return resolve()}
			})
			.catch(collected => {
				console.log(collected);
				message.reply("Please reply with yes, no or cancel");
			});
		
		resolve(true);
	});
}