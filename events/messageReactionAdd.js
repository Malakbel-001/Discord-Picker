// const Discord = require('discord.js');

module.exports = (client, messageReaction, user) => {
	console.log(messageReaction);
	// console.log(user);

	// eslint-disable-next-line prefer-const
	// let message = reaction.message,
	const emoji = messageReaction.emoji;

	if (emoji.name == '✅') {
		// We don't have the member, but only the user...
		// Thanks to the previous part, we know how to fetch it
		console.log("yes");
		// message.guild.fetchMember(user.id).then(member => {
		// 	member.addRole('role_id');
		// });
	}

	else if (emoji.name == '❎') {
		console.log("no");
	}

	// Remove the user's reaction
	messageReaction.remove(user);
};