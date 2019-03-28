const GuildSqliteStatements = require('../sqlite/guildSql')

module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`)

    const sql = new GuildSqliteStatements();
    sql.checkDbExists();
    sql.checkMissingGuilds(client);
}