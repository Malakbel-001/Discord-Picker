module.exports = client => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.sql.checkDbExists();
	client.sql.checkMissingGuilds(client);

	// cache messages for messageReaction event
	// client.channels.cache.get("753947544354029618");
};