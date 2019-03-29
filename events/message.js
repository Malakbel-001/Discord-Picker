const guildSql = require('../sqlite/guildSql')

module.exports = (client, message) => {
    if (message.author.bot) return;

    const sql = new guildSql();

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(sql.getPrefix(message.guild)) !== 0) return; // temporarily from process.env for testing purposes

    // Our standard argument/command name definition.
    const args = message.content.slice(sql.getPrefix(message.guild).length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
}