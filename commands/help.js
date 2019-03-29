exports.run = (client, message, [mention, ...reason]) => {
    const sql = new guildSql();

    const help_message = `
\`\`\`
${client.sql.getPrefix(message.guild)}ping                   - Pong!
${client.sql.getPrefix(message.guild)}prefix                 - Set the prefix for the server
\`\`\`
    `;

    message.channel.send(help_message).catch(console.error);
}