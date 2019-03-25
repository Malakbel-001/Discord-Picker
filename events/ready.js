const guilds = require('../models/guilds')

module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`)

    guilds.checkDbExists();
    guilds.checkMissingGuilds(client);
}