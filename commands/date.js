const moment = require('moment');

module.exports = {
	name: 'date',
	description: 'test moment.js',
	async execute(message) {
		const input = await message.channel.awaitMessages(m => m.author.id === message.author.id,
			{ max: 1, time: 10e3, errors: ['time'] });

		const date = moment(input.first().content);

		if (date.isValid()) {
			const now = moment();
			const diff = date.diff(now, 'hours');

			if (diff > 0) {
				message.channel.send(`The date you gave me is ${diff} hours into the future.`);
			}
			else {
				message.channel.send(`The date you gave me is ${diff} hours into the past.`);
			}
		}
		else {
			message.channel.send('You didn\'t give me a valid date.');
		}

	},
};