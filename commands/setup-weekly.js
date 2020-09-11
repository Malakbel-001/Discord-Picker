module.exports = {
	name: 'setup-weekly-availability-checker',
	description: 'Setup a weekly availabilities picker to fill out for your team',
	guildOnly: true,
	aliases: ['sw'],
	execute(message) {
		// setup channel
		
		// const ayy = message.guild.emojis.cache.find(emoji => emoji.name === "ok_hand");

		const reply = message.reply("hi");

		// reply.message.react('👌'); TODO: fix this
		message.react('😄');

		console.log(reply);

		// set all the days and times

		// close setup
	},
};