module.exports = {
	name: 'newcommand',
	description: 'Test command',
	aliases: ['nc'],
	guildOnly: true,
	execute(message) {
		message.reply(`Hiya: ${message.guild.name}`);
	},
};