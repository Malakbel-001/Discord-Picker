const GuildSqliteStatements = require('../sqlite/guildSql')

module.exports = (client, guild) => {
    const sql = new GuildSqliteStatements();
    sql.deleteGuild(guild);
}