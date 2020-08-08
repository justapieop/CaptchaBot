module.exports = async (client, guild) => {
    await client.createGuild({
        GuildName: guild.name,
        GuildID: guild.id
    });
};