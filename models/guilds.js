const SQLite = require("better-sqlite3");
const sql = new SQLite('./guilds.sqlite', { verbose: console.log });

exports.insertGuild = (guild) => {
    const insert = sql.prepare(`INSERT OR REPLACE INTO guilds (id, serverName, region, ownerName, ownerId) 
                VALUES (@id, @serverName, @region, @ownerName, @ownerId)`);
    
    const newGuild = {
        id: `${guild.id}`,
        serverName: `${guild.name}`,
        region: `${guild.region}`,
        ownerName: `${guild.owner.displayName}`,
        ownerId: `${guild.ownerID}`,
    }

    insert.run(newGuild);
}

exports.deleteGuild = (guild) => {
    const deleteGuild = sql.prepare(`DELETE FROM guilds WHERE id = ?`);

    deleteGuild.run(guild.id);
}

exports.checkDbExists = () => {
    // Check if the sqlite table "guilds" exists.
    const guildsTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guilds';").get();
    if (!guildsTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare( `CREATE TABLE guilds (
            id INTEGER PRIMARY KEY NOT NULL, 
            serverName TEXT NOT NULL, 
            region TEXT NOT NULL, 
            ownerName TEXT NOT NULL, 
            ownerId INTEGER NOT NULL,
            prefix TEXT DEFAULT '!' NOT NULL,
            defaultChannelId INTEGER);`).run();
        // Ensure that the "id" row is always unique and indexed.
    }
}

exports.checkMissingGuilds = (client) => {
    // getGuild sql statement
    const getGuild = sql.prepare("SELECT * FROM guilds WHERE id = ?");

    // check for guilds that are missing from the database
    client.guilds.forEach((guild) => {
        const foundGuild = getGuild.get(guild.id);
        if(!foundGuild) {
            console.log(guild.name + " does not exist");
            // guilds.insertGuild(guild);
            console.log("TODO!")
        }
    })

    // TODO: check for guilds that need to be deleted from the database
}