require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require("enmap");
const guildSql = require('./sqlite/guildSql');

const client = new Discord.Client();
client.sql = new guildSql(); // Singleton of GuildSql inside the Client object

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir('./events/', (err, files) => { // eventHandler
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, arg => eventHandler(client, arg))
  })
})

client.commands = new Enmap();

// This loop reads the /commands/ folder and attaches each command to the client.commands Enmap.
fs.readdir("./commands/", (err, files) => { // commandHandler
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

client.on('error', console.error); // in case of random occurring hard to reproduce error

client.login(process.env.BOT_TOKEN)