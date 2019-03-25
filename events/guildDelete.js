const guilds = require('../models/guilds')

module.exports = (client, guild) => {
    guilds.deleteGuild(guild);
}