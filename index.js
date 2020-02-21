require('dotenv').config();

// Set our required files
const Discord = require('discord.js');
const fs = require('fs');		// file system
const GuildSql = require('./sqlite/guildSql');
const { google } = require('googleapis');
const private_googleapikey = require("./private-googleapikey.json");

// client is basically a singleton that all files have access to.
// we use client to get access to our guilds/sql, command and such
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.calendar = google.calendar('v3');

// Singleton of GuildSql inside the Client object
client.sql = new GuildSql();

// Configure a JWT auth client for the Google API
client.jwtClient = new google.auth.JWT(
	private_googleapikey.client_email,
	null,
	private_googleapikey.private_key,
	['https://www.googleapis.com/auth/calendar']);

client.jwtClient.authorize(function(err) {
	if (err) {
		console.log(err);
		return;
	}
});


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		const eventHandler = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, arg => eventHandler(client, arg));
	});
});

// Get all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Setting all the command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// In case of random occurring hard to reproduce error. I.e. ECONERROR or ETIMEDOUT
client.on('error', (err) => {
	// Abbreviating the error; By a lot
	console.error(err.message);
});

client.login(process.env.BOT_TOKEN);