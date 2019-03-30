exports.run = (client, message, args) => {
    const parameter = message.content.split(' ')[1];

    if(parameter) {
        message.channel.send(parameter).catch(console.error);
        client.sql.setPrefix(message.guild, parameter);
    }
}