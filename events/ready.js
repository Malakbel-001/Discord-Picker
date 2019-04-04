module.exports = client => {
	console.log(`Logged in as ${client.user.tag}!`)

	client.sql.checkDbExists();
	client.sql.checkMissingGuilds(client);
}