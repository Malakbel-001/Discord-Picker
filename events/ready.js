const guildSql = require('../sqlite/guildSql')

module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`)

    const sql = new guildSql();
    sql.checkDbExists();
    sql.checkMissingGuilds(client);
}