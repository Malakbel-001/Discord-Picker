module.exports = {
	name: 'setup',
	description: 'Setup react message',
	aliases: ['s'],
	execute(message) {
		// message.delete();
		
		// Pseudo code
		// Save the channel id to Guild
		const channelId = message.channel.id;
		message.client.sql.setGuildChannelId(message.guild, channelId);
		
		// Save the message id to Guild
		// Add reaction to new message
		message.channel.send("React Message")
			.then(newMessage => {
				const newMessageId = newMessage.id;
				message.client.sql.setGuildMessageId(message.guild, newMessageId);
			})
			.catch(console.error);
		
		// Inside messageReactionAdd
		// Update ChannelId -> MessageId -> Message who reacted to the post
		// aka Update post with who reacted
	},
};