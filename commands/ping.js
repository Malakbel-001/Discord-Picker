exports.run = (client, message, args) => {
    message.channel.send(`pong${message.content.charAt(0)}`).catch(console.error);
}