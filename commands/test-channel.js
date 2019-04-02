exports.run = (client, message, args) => {
    client.channels.get(client.sql.getDsPickerChannel(message.guild)).send("Hello"); //TODO:
}