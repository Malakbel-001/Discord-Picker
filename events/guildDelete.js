module.exports = (client, guild) => {
	client.sql.deleteGuild(guild);
};