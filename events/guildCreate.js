const guilds = require('../sqlite/guildSql')

module.exports = (client, guild) => {
    guilds.insertGuild(guild);
}