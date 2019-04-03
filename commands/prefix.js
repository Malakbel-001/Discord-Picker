exports.run = (client, message, args) => {
    if(args[0]) {
        message.channel.send(`${args[0]} is the new prefix for ${client.user.tag}`).catch(console.error);
        client.sql.setPrefix(message.guild, args[0]);
    }
    else {
        message.reply(`
You didn't give me a prefix. Put the prefix after the ${client.sql.getPrefix(message.guild)}prefix command.
Example: ${client.sql.getPrefix(message.guild)}prefix +
so + would be the new prefix`);
    }
}