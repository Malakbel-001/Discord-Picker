const SQLite = require("better-sqlite3");
const sql = new SQLite('./guilds.sqlite', { verbose: console.log });

exports.create = (guild) => {
    // Check if the table "guilds" exists.
    const guildsTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'guilds';").get();
    if (!guildsTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare( `CREATE TABLE guilds (
            id INTEGER PRIMARY KEY NOT NULL, 
            serverName TEXT NOT NULL, 
            region TEXT NOT NULL, 
            ownerName TEXT NOT NULL, 
            ownerId INTEGER NOT NULL);`).run();
        // Ensure that the "id" row is always unique and indexed.
    }

    console.log("todo guild insert");
}