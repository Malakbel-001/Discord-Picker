const guildSql = require('../sqlite/guildSql')

module.exports = (client, guild) => {
    const sql = new guildSql();
    sql.insertGuild(guild);
}