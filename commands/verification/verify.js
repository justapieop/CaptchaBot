const { MessageEmbed, MessageAttachment } = require("discord.js");
const Captcha = require("@haileybot/captcha-generator");

module.exports = {
    name: "verify",
    description: "Verifies a member",
    category: "Verification",
    usage: "(command)",
    async execute(client, message, args, settings) {
        const channel = message.guild.channels.cache.get(settings.VerifyChannel);
        if (!channel||message.channel.id !== channel) return;
        const role = message.guild.roles.cache.get(settings.GiveRole);
        if (!role) return;
        if (message.author.roles.cache.some(r => r.id === role.id)) {
            let embed = new MessageEmbed()
            .setColor("#ff000")
            .setDescription("Verification failed! You have already been verified!");
            return message.channel.send(embed);
        }
        const captcha = new Captcha();

        const attachmentFile = new MessageAttachment(captcha.PNGStream, "captcha.png");

        let embed = new MessageEmbed()
        .setColor("#f6ff00")
        .setDescription("Enter the text below to complete the verification process")
        .attachFiles(attachmentFile)
        .setImage("attachment://captcha.png");

        const msg = await message.channel.send(embed);

        const filter = m => m.author.id === message.author.id;

        const collector = message.channel.createMessageCollector(filter);

        collector.once("collect", function(m) {
            msg.delete();
            if (m.content.toUpperCase() === captcha.value) {
                let embed = new MessageEmbed()
                .setColor("#ffff00")
                .setDescription("🎉 Verification completed! You are now having access to the server");
                message.channel.send(embed);
                return message.author.roles.add(role, "Verified");
            } else {
                let embed = new MessageEmbed()
                .setColor("#ff0000")
                .setDescription("🎉 Verification failed! Please try again!");
                return message.channel.send(embed);
            }
        });
        
    }
};