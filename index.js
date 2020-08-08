const { Client, Collection } = require("discord.js");
const client = new Client();
require("./resources/config")(client);
require("./resources/mongodb")(client);
require("./utils/settings")(client);

client.commands = new Collection();
client.aliases = new Collection();
client.initDB(client.getDBURL());

["command", "event"].forEach(handler => {
    require(`./utils/${handler}`)(client);
});

client.login(client.getToken());