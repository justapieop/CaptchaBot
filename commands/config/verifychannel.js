const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "verifychannel",
    description: "Sets the channel which will be prompted for new members to verify",
    usage: "(command) [channel name/channel id]",
    category: "Configuration",
    perms: "ADMINISTRATOR",
    async execute(client, message, args, settings) {
        if (!args.length) {
            const channel = message.guild.channels.cache.find(r => r.id === settings.VerifyChannel);
            if (!channel) {
                let embed = new MessageEmbed()
                .setColor("#ff000")
                .setDescription("No channel was configurated! Please config the channel!");
                return message.channel.send(embed);
            }
            let embed = new MessageEmbed()
            .setColor("#91ff00")
            .setDescription(`Current setting for \`VerifyChannel\` is \`${channel.name}\``);
            return message.channel.send(embed);
        }

        const channel = message.guild.channels.cache.find(r => r.name === args.join(" ") || r.id === args.join(" "));
        if (!channel) {
            let embed = new MessageEmbed()
            .setColor("#ff000")
            .setDescription("Please enter a valid channel name or a valid channel id!");
            return message.channel.send(embed);
        }

        await client.updateGuild(message.guild, { VerifyChannel: channel.id });
        let embed = new MessageEmbed()
        .setColor("#15ff00")
        .setDescription("Setting updated!");
        return message.channel.send(embed);
    } 
};