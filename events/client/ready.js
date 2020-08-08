module.exports = (client) => {
    console.log(`${client.user.tag} is ready`);
    setInterval(function() {
        client.user.setPresence({
            activity: {
                name: `Verifying ${client.guilds.cache.size} servers`
            }, status: "online"
        });
    }, 3000);
};