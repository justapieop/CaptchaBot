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
        await dmc.send(embed)
            .then(async () => {
                const embed = new MessageEmbed()
                    .setColor("#1ef000")
                    .setDescription("Verification code sent! Please check your DM");
                channel.send(embed);
                const filter = m => m.author.id === message.author.id;

                const collector = await dmc.createMessageCollector(filter);

                collector.on("collect", async function (m) {
                    setTimeout(async () => {
                        await message.author.deleteDM();
                    }, 5000);
                    if (m.content.toUpperCase() == captcha.value) {
                        let embed = new MessageEmbed()
                            .setColor("#ffff00")
                            .setDescription("🎉 Verification completed! You are now having access to the server");
                        await dmc.send(embed);
                        return authorUser.roles.add(role, "Verified");
                    } else if (m.content.toUpperCase() != captcha.value) {
                        let embed = new MessageEmbed()
                            .setColor("#ff0000")
                            .setDescription("🎉 Verification failed! Please get another code and try again!");
                        return dmc.send(embed);
                    }
                });
            })
            .catch(() => {
                const embederr = new MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription("An error occurred while sending captcha! Make sure you have DM enabled in the server's security settings");
                return channel.send(embederr);
            });


    }
};