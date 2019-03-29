require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs')
const Enmap = require("enmap");

const client = new Discord.Client()

fs.readdir('./events/', (err, files) => { // eventHandler
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split('.')[0]
        client.on(eventName, arg => eventHandler(client, arg))
    })
})

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
  });
});

client.login(process.env.BOT_TOKEN)