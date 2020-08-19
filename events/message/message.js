const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type !== "text") return;
    if (!message.content.startsWith(client.getPrefix())) return;

    const args = message.content.slice(client.getPrefix().length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();
    const settings = await client.getGuild(message.guild);

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) client = client.commands.get(client.aliases.get(cmd));
    if (command.perms) {
        if (!message.member.hasPermission(command.perms)) {
            let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("An Error Occurred")
            .setDescription(`Missing required permission(s): \`${command.perms}\``)
            .setFooter("&& - And. || - Or");
            return message.channel.send(embed);
        }

        if (!message.guild.me.hasPermission(command.perms)) {
            let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("An Error Occurred")
            .setDescription(`The bot's missing required permission(s): \`${command.perms}\``)
            .setFooter("&& - And. || - Or");
            return message.channel.send(embed);
        }
    }
    if (command) {
        try {
            await command.execute(client, message, args, settings);
        } catch (e) {
            let embed = new MessageEmbed()
            .setColor("#ff000")
            .setTitle("❗ AN ERROR OCCURRED ❗")
            .setDescription(e);
            return message.channel.send(embed);
        }
    }

};