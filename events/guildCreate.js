const { stripIndents } = require('common-tags');

module.exports = (client, guild) => {
	client.sql.insertGuild(guild);

	guild.systemChannel.send(stripIndents`Hey there!
	DISCLAIMER: This bot is currently a Work in Progress. 

	The goal of this bot is to check for availabilities of your members/team and find one or multiple dates that work for you guys,
	for whatever event you have planned.

	Use the following command: ${client.sql.getPrefix(guild)}help 
	to find out everything I can do

	You can change the prefix using ${client.sql.getPrefix(guild)}prefix in case you have another bot with a conflicting prefix
	The current (default) prefix = ${client.sql.getPrefix(guild)}
	
	If you want to get started use: ${client.sql.getPrefix(guild)}setup`);
};