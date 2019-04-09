const strings = require('../strings/setup');
const continueEnum = require('../enums/setup');

module.exports = {
	name: 'setup',
	description: 'Setting up Google Calendar integration with your server',
	guildOnly: true,
	aliases: ['s'],
	async execute(message) {
		try {
			await message.reply(strings.setupStart);
			const promiseValue = await awaitYesNo(message.author.id, message);
			await goNext(promiseValue, awaitYesNo, function() { message.reply("hi"); });


		}
		catch (error) {
			console.error(error);
		}


		// message.client.sql.setGoogleCalendarId(message.guild, args[0]);
		// message.reply(message.client.sql.getGoogleCalendarId(message.guild));
	},
};

function checkYes(m) { return m === "y" || m === "yes"; }
function checkNo(m) { return m === "n" || m === "no"; }
function checkCancel(m) { return m === "c" || m === "cancel"; }

function awaitYesNo(initiatorId, message) {
	return new Promise(resolve => {
		const filter = newMessage => {
			return initiatorId = newMessage.author.id;
		};
		console.log("run");
		message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				if (checkYes(collected.first().content)) 			{ resolve(continueEnum.Yes); }
				else if (checkNo(collected.first().content)) 		{ resolve(continueEnum.No); }
				else if (checkCancel(collected.first().content)) 	{ resolve(continueEnum.Cancel); }
				else {
					console.log("else");
					message.reply("Please reply with yes, no or cancel");
					resolve(continueEnum.Again);
				}
			})
			.catch(() => {
				console.log("catch");
				message.reply("Please reply with yes, no or cancel");
				resolve(continueEnum.Again);
			});
	});
}

async function goNext(promiseValue, previousFunc, nextFunc) {
	return new Promise(resolve => {
		switch (promiseValue.value) {
			case continueEnum.Yes.value:
				nextFunc();
				break;
			case continueEnum.No.value:
				console.log("no");
				// skip
				break;
			case continueEnum.Again.value:
				console.log("durr");
				// promiseValue = previousFunc;
		}
		return resolve(promiseValue);
	});
}