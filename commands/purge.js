module.exports = {
	name: 'purge',
	description: 'Purge messages from a channel',
	usage: '[message count]',
	aliases: ['clean'],
	guildOnly: true,
	execute(message, args) {
		function isNormalInteger(str) {
			const n = Math.floor(Number(str));
			return n !== Infinity && String(n) === str && n >= 0;
		}

		let messagecount;
		if (isNormalInteger(args[0])) {
			messagecount = parseInt(args[0]) + 1;
		}

		message.channel.fetchMessages({ limit: messagecount })
			.then(messages => message.channel.bulkDelete(messages));
	}
}