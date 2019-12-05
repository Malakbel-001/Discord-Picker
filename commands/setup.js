const strings = require('../strings/setup');
const { questionEnum, calendarSetupEnum, questionMap, calendarMap } = require('../enums/setup');
const { oneLineCommaListsOr } = require('common-tags');
const moment = require('moment-timezone');

module.exports = {
	name: 'setup',
	description: 'Setting up Google Calendar integration with your server',
	guildOnly: true,
	aliases: ['s'],
	async execute(message) {
		// eslint-disable-next-line no-unused-vars
		let promiseValue;
		let timeZoneValue;

		try {
			await message.reply(strings.setupStart);
			promiseValue = await question(message, questionMap, questionEnum);
			promiseValue = await createAvailabilityOptionsCalendar(message, promiseValue, timeZoneValue);
			// promiseValue = await goNext(promiseValue, awaitYesNo, createAvailabilityOptionsCalendar, paramsObjYesNo);

		}
		catch (error) {
			console.error(error);
		}


		// message.client.sql.setGoogleCalendarId(message.guild, args[0]);
		// message.reply(message.client.sql.getGoogleCalendarId(message.guild));
	},
};

function question(message, enumMap, qEnum) {
	return new Promise(function repeat(resolve) {
		const filter = newMessage => {
			return message.author.id === newMessage.author.id;
		};

		message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				const enumFromMap = enumMap.get(collected.first().content);
				if (enumFromMap !== undefined) {
					resolve(enumFromMap);
				}
				else {
					message.reply(oneLineCommaListsOr`Please reply with **${qEnum.enums}**`);
					repeat(resolve);
				}
			})
			.catch(() => {
				message.reply(oneLineCommaListsOr`Please reply with **${qEnum.enums}**`);
				repeat(resolve);
			});
	});
}

function checkTimeZone(message) {
	return new Promise(function repeat(resolve) {
		const filter = newMessage => {
			return message.author.id === newMessage.author.id;
		};

		message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				if (moment.tz.zone(collected.first().content)) {
					message.reply(moment.tz.zone(collected.first().content).name);
					resolve(moment.tz.zone(collected.first().content).name);
				}
				else if(collected.first().content === "skip") {
					resolve(calendarSetupEnum.skip);
				}
				else if(collected.first().content === "stop") {
					resolve(questionEnum.stop);
				}
				else {
					message.reply(`Please reply with a correct timezone`);
					repeat(resolve);
				}
			})
			.catch(() => {
				message.reply(`Please reply with a correct timezone`);
				repeat(resolve);
			});
	});
}

async function createAvailabilityOptionsCalendar(message, promiseValue, timeZoneValue) {
	console.log(promiseValue);
	if(promiseValue === questionEnum.Yes) {
		message.reply(strings.setupAvailabilityChannel);

		promiseValue = await question(message, calendarMap, calendarSetupEnum);
		console.log(promiseValue);
		if(promiseValue === calendarSetupEnum.Create) {
			message.reply(strings.setupTimeZone);
			timeZoneValue = await checkTimeZone(message);
			if(timeZoneValue === questionEnum.Stop || timeZoneValue === calendarSetupEnum.Skip) {
				promiseValue = timeZoneValue;
			}
			else {
				message.client.calendar.calendars.insert({
					auth: message.client.jwtClient,
					requestBody: {
						summary: `Availability-Checker for: ${message.guild.name}`,
						timeZone: timeZoneValue,
					},
				}, (err, response) => {
					if (err) {
						console.error(err);
					}
			
					console.log(response);
				});
			}
		}
		else if(promiseValue === calendarSetupEnum.Add) {
			message.reply("Add todo");
		}
	}
}

