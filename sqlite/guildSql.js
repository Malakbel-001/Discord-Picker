const SQLite = require("better-sqlite3");
const sql = new SQLite('./guilds.sqlite', { verbose: console.log });

/**
 * Various (better-)SQLite functions to control the guilds.sqlite database file
 */
class GuildSql {
    // INSERT GUILD
    insertGuild(guild) {
        const insert = sql.prepare(`INSERT OR REPLACE INTO guilds (discordId, serverName, region, ownerName, ownerId) 
                VALUES (@discordId, @serverName, @region, @ownerName, @ownerId)`);

        const newGuild = {
            discordId: `${guild.id}`,
            serverName: `${guild.name}`,
            region: `${guild.region}`,
            ownerName: `${guild.owner.displayName}`,
            ownerId: `${guild.ownerID}`,
        }

        insert.run(newGuild);
    }

    // DELETE GUILD
    deleteGuild(guild) {
        const deleteGuild = sql.prepare(`DELETE FROM guilds WHERE discordId = ?`);

        deleteGuild.run(guild.discordId);
    }

    // Check if the database/table exists. If not create guilds TABLE
    checkDbExists() {
        // Check if the sqlite table "guilds" exists.
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare(`CREATE TABLE IF NOT EXISTS guilds (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                discordId TEXT NOT NULL,
                serverName TEXT NOT NULL, 
                region TEXT NOT NULL, 
                ownerName TEXT NOT NULL, 
                ownerId INTEGER NOT NULL,
                prefix TEXT DEFAULT '!' NOT NULL,
                defaultChannelId INTEGER);`).run();
        // Ensure that the "id" row is always unique and indexed.
    }

    // Check-update the database on guilds added/kicked during downtime
    checkMissingGuilds(client) { 
        // getGuild sql statement
        const getGuild = sql.prepare("SELECT * FROM guilds WHERE discordId = ?");

        // check for guilds that are added during downtime and add to database
        client.guilds.forEach((clientGuild) => {
            const foundMissingGuildToAdd = getGuild.get(clientGuild.id);
            if (!foundMissingGuildToAdd) {
                this.insertGuild(clientGuild);
            }
        })

        // check for guilds that kicked the bot during downtime and delete from database
        const getAllGuilds = sql.prepare("SELECT * FROM guilds");
        getAllGuilds.all().forEach((databaseGuild) => {
            const foundBotKickedFromGuild = client.guilds.get(databaseGuild.discordId);
            if (!foundBotKickedFromGuild) {
                this.deleteGuild(databaseGuild);
            }
        })
    }
}

module.exports = GuildSql;