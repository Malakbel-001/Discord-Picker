module.exports = {
	name: 'setup',
	description: 'Setup react message',
	aliases: ['s'],
	execute(message) {
		message.delete();
		message.channel.send("hi")
			.then(newMessage => console.log(`Sent message: ${newMessage.id}`))
			.catch(console.error);

		// Pseudo code
		// Save the channel id to Guild
		// Save the message id to Guild
		// Add reaction to new message

		// Inside messageReactionAdd
		// Update ChannelId -> MessageId -> Message who reacted to the post
		// aka Update post with who reacted
	},
};