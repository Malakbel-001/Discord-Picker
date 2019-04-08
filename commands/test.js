module.exports = {
	name: 'test',
	description: 'Test temp',
	aliases: ['t'],
	guildOnly: true,
	execute(message) {
		message.channel.send(`test create channel`).catch(console.error);
		console.log(message.guild.available);
		message.guild.systemChannel.send("hi");
	},
};