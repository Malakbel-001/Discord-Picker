exports.run = (client, message, args) => {
    const help_message = `
\`\`\`
${client.sql.getPrefix(message.guild)}ping                      - Pong${client.sql.getPrefix(message.guild)} test
${client.sql.getPrefix(message.guild)}prefix                    - Set the prefix for the server
${client.sql.getPrefix(message.guild)}purge                     - Delete messages from the channel. 2nd parameter is amount of msg to delete
\`\`\`
    `;

    message.channel.send(help_message).catch(console.error);
}