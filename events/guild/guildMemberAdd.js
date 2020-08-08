const Captcha = require("@haileybot/captcha-generator");
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    const settings = await client.getGuild(member.guild);
    const role = member.guild.roles.cache.find(r => r.id === settings.GiveRole);
    if (!role) return;
    const channel = member.guild.channels.cache.find(c => c.id === settings.VerifyChannel);
    if (!channel) return;
    const captcha = new Captcha();
    const attachment = new MessageAttachment(captcha.PNGStream, "captcha.png");
    let embed = new MessageEmbed()
    .setColor("#ffff00")
    .setDescription("Please type the characters below to begin the verification progress")
    .attachFiles(attachment)
    .setImage("attachment://captcha.png");

    const msg = await channel.send(embed);

    const filter = m => m.author.id === member.id;

    let collector = channel.createMessageCollector(filter);

    collector.on("collect", function(m) {
        msg.delete();
        if (m.content.toUpperCase() === captcha.value) {
            let embed = new MessageEmbed()
            .setColor("#ffff00")
            .setDescription("🎉Congratulation! You have been verified successfully!");
            channel.send(embed);
            return member.roles.add(role);
        } else if (m.content.toUpperCase() !== captcha.value) {
            let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setDescription("Wrong code! Please re-join the server to get another code!");
            return channel.send(embed);
        }
    });
    
};