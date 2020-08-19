const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "verifiedrole",
    description: "Sets the role which will be given to the verified member",
    usage: "(command) [role name/role id]",
    category: "Configuration",
    perms: "ADMINISTRATOR",
    async execute(client, message, args, settings) {
        if (!args.length) {
            const role = message.guild.roles.cache.find(r => r.id === settings.GiveRole);
            if (!role) {
                let embed = new MessageEmbed()
                .setColor("#ff000")
                .setDescription("No role was configurated! Please config the role!");
                return message.channel.send(embed);
            }
            let embed = new MessageEmbed()
            .setColor("#91ff00")
            .setDescription(`Current setting for \`GiveRole\` is \`${role.name}\``);
            return message.channel.send(embed);
        }

        const role = message.guild.roles.cache.find(r => r.name === args.join(" ") || r.id === args.join(" "));
        if (!role) {
            let embed = new MessageEmbed()
            .setColor("#ff000")
            .setDescription("Please enter a valid role name or a valid role id!");
            return message.channel.send(embed);
        }

        await client.updateGuild(message.guild, { GiveRole: role.id });
        let embed = new MessageEmbed()
        .setColor("#15ff00")
        .setDescription("Setting updated!");
        return message.channel.send(embed);
    } 
};