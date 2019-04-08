const SQLite = require("better-sqlite3");
const CacheService = require('../utils/cache');
const { stripIndents } = require('common-tags');
// eslint-disable-next-line no-inline-comments
const sql = new SQLite('./guilds.sqlite');// , { verbose: console.log });

/**
 * Various (better-)SQLite functions to control the guilds.sqlite database file
 */
class GuildSql {
	constructor() {
		// Cache for 1 Hour
		this.ttl = 60 * 60 * 1;
		// Create a new cache service instance
		this.cache = new CacheService(this.ttl);
	}

	// INSERT GUILD
	insertGuild(guild) {
		const insert = sql.prepare(stripIndents`INSERT OR REPLACE INTO guilds (discordId, serverName, region, ownerName, ownerId) 
                VALUES (@discordId, @serverName, @region, @ownerName, @ownerId)`);

		const newGuild = {
			discordId: `${guild.id}`,
			serverName: `${guild.name}`,
			region: `${guild.region}`,
			ownerName: `${guild.owner.displayName}`,
			ownerId: `${guild.ownerID}`,
		};

		insert.run(newGuild);
	}

	// DELETE GUILD
	deleteGuild(guild) {
		const deleteGuild = sql.prepare("DELETE FROM guilds WHERE discordId = ?");

		deleteGuild.run(guild.id);
	}

	// GET PREFIX
	getPrefix(guild) {
		// in case of DM
		if (!guild) {
			return process.env.PREFIX;
		}

		const findGuild = sql.prepare("SELECT * FROM guilds WHERE discordId = ?");
		const key = `getPrefixById_${guild.id}`;

		function getPrefixFromDb() {
			return findGuild.get(guild.id).prefix;
		}
		return this.cache.get(key, getPrefixFromDb);
	}

	// SET PREFIX
	setPrefix(guild, newPrefix) {
		const updateGuild = sql.prepare("UPDATE guilds SET prefix = ? WHERE discordId = ?");
		const key = `getPrefixById_${guild.id}`;

		this.cache.del(key);
		updateGuild.run(newPrefix, guild.id);
	}

	// GET GOOGLE CALENDAR ID
	getGoogleCalendarId(guild) {
		const findGuild = sql.prepare("SELECT * FROM guilds WHERE discordId = ?");
		const key = `getGoogleCalendarIdByGuildId_${guild.id}`;

		function getGoogleCalendarIdFromDb() {
			return findGuild.get(guild.id).googleCalendarId;
		}
		return this.cache.get(key, getGoogleCalendarIdFromDb);
	}

	// SET GOOGLE CALENDAR ID
	setGoogleCalendarId(guild, newGoogleCalendarId) {
		const updateGuild = sql.prepare("UPDATE guilds SET googleCalendarId = ? WHERE discordId = ?");
		const key = `getGoogleCalendarIdByGuildId_${guild.id}`;

		this.cache.del(key);
		updateGuild.run(newGoogleCalendarId, guild.id);
	}

	getDsPickerChannel(guild) {
		const findGuild = sql.prepare("SELECT * FROM guilds WHERE discordId = ?");
		const key = `getDsPickerChannelById_${guild.id}`;

		function getDsPickerIdFromDb() {
			return findGuild.get(guild.id).discordPickerChannelId;
		}
		return this.cache.get(key, getDsPickerIdFromDb);
	}

	// SET DISCORD-PICKER CHANNEL
	setDsPickerChannel(guild, newChannelId) {
		const updateGuild = sql.prepare("UPDATE guilds SET discordPickerChannelId = ? WHERE discordId = ?");
		const key = `getDsPickerChannelById_${guild.id}`;

		this.cache.del(key);
		updateGuild.run(newChannelId, guild.id);
	}

	// CHECK IF THE DATABASE/TABLE EXISTS. IF NOT CREATE guilds TABLE
	checkDbExists() {
		// Check if the sqlite table "guilds" exists.
		// If the table isn't there, create it and setup the database correctly.
		sql.prepare(stripIndents`CREATE TABLE IF NOT EXISTS guilds (
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			discordId TEXT NOT NULL,
			serverName TEXT NOT NULL, 
			region TEXT NOT NULL, 
			ownerName TEXT NOT NULL, 
			ownerId INTEGER NOT NULL,
			prefix TEXT DEFAULT '!' NOT NULL,
			googleCalendarId TEXT,
			discordPickerChannelId TEXT,
			calendarChannelId TEXT);`).run();
		// Ensure that the "id" row is always unique and indexed.

		// sql.prepare(`CREATE TABLE IF NOT EXISTS schedule ( //TODO:
		//     discordId TEXT PRIMARY KEY NOT NULL,
		//     days TEXT);`).run();
	}

	// CHECK-UPDATE THE DATABASE ON GUILDS ADDED/KICKED DURING DOWNTIME
	checkMissingGuilds(client) {
		// getGuild sql statement
		const getGuild = sql.prepare("SELECT * FROM guilds WHERE discordId = ?");

		// check for guilds that are added during downtime and add to database
		client.guilds.forEach((clientGuild) => {
			const foundMissingGuildToAdd = getGuild.get(clientGuild.id);
			if (!foundMissingGuildToAdd) {
				this.insertGuild(clientGuild);
			}
		});

		// check for guilds that kicked the bot during downtime and delete from database
		const getAllGuilds = sql.prepare("SELECT * FROM guilds");
		getAllGuilds.all().forEach((databaseGuild) => {
			const foundBotKickedFromGuild = client.guilds.get(databaseGuild.discordId);
			if (!foundBotKickedFromGuild) {
				this.deleteGuild(databaseGuild);
			}
		});
	}
}

module.exports = GuildSql;