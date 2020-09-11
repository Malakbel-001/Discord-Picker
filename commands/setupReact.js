module.exports = {
	name: 'setup',
	description: 'Setup react message',
	aliases: ['s'],
	execute(message) {
		message.delete();
		message.channel.send("hi")
			.then(newMessage => console.log(`Sent message: ${newMessage.id}`))
			.catch(console.error);
	},
};