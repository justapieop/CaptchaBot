const { MessageEmbed, MessageAttachment } = require("discord.js");
const Captcha = require("@haileybot/captcha-generator");

module.exports = {
    name: "verify",
    description: "Verifies a member",
    category: "Verification",
    usage: "(command)",
    async execute(client, message, args, settings) {
        const channel = message.guild.channels.cache.get(settings.VerifyChannel);
        if (!channel || message.channel.id !== channel.id) return;
        const role = message.guild.roles.cache.get(settings.GiveRole);
        const authorUser = message.guild.members.cache.get(message.author.id);
        if (!role) return;
        if (authorUser.roles.cache.some(r => r.id === role.id)) {
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
        
        const dmc = await message.author.createDM();
        const msg = await dmc.send(embed);
        
        const filter = m => m.author.id === message.author.id;

        const collector = await dmc.createMessageCollector(filter);

        collector.on("collect", (m) => {
            msg.delete();
            if (m.content.toUpperCase() === captcha.value) {
                const embed = new MessageEmbed()
                .setColor("#1ef000")
                .setDescription(`:tada: Verification Sucessfully! You are now having access to ${message.guild.name}`);
                dmc.send(embed);
                return authorUser.roles.add(role.id, "Verified");
            } else {
                const embed = new MessageEmbed()
                .setColor("#1ef000")
                .setDescription(`:tada: Verification Failed! Please try again!`);
                return dmc.send(embed);
            }
        });
    }
};