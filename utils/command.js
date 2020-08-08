const { readdirSync } = require("fs");
const Ascii = require("ascii-table");

const table = new Ascii("Command Handler");

table.setHeading("Commands", "Load Status");

module.exports = (client) => {
    console.log("Checking Commands");
    readdirSync("./commands/").forEach(dir => {
        const command = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of command) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(pull.name, "✅");
            } else {
                table.addRow(file, `❌`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
};