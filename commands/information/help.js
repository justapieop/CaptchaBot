const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows list of commands",
    category: "Information",
    usage: "(command|aliases) [command name/alias]",
    aliases: ['halp'],
    execute(client, message, args) {
        const { commands } = client;
        const cmdList = commands.map(cmd => cmd.name);
        if (!args.length) {
            let embed = new MessageEmbed()
            .setColor("#ffff00")
            .setTitle("📰 Commands List 📰")
            .setDescription(`\`${cmdList.join("`, `")}\``)
            .setFooter(`${client.getPrefix()}${this.usage} to get more informations`);
            return message.channel.send(embed);
        } 
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
            let embed = new MessageEmbed()
            .setColor("#ff000")
            .setDescription("Invalid command! Please try again!");
            return message.channel.send(embed);
        }
        let embed = new MessageEmbed()
        .setColor("#ffff00")
        .setTitle(`Help for ${name}`)
        .addField("Name", command.name);

        if (command.description) embed.addField("Description", command.description);
        if (command.category) embed.addField("Category", command.category);
        if (command.usage) embed.addField("Usage", command.usage);
        if (command.aliases) embed.addField("Alias(es)", `\`${command.aliases.join("`, `")}\``);
        return message.channel.send(embed);

    }
};