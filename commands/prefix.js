module.exports = {
    name: 'prefix',
    description: 'Set prefix',
    args: true,
    guildOnly: true,
    usage: '[new prefix]',
	execute(message, args) {
        message.channel.send(`${args[0]} is the new prefix for ${message.client.user.tag}`).catch(console.error);
        message.client.sql.setPrefix(message.guild, args[0]);
    },
}