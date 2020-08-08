const { readdirSync } = require("fs");
const Ascii = require("ascii-table");

const table = new Ascii("Event Handler");

table.setHeading("Events", "Load Status");

module.exports = client => {
    console.log("Checking Events");
    readdirSync("./events").forEach(dir => {
        const events = readdirSync(`./events/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of events) {
            let event = require(`../events/${dir}/${file}`);
            let name = file.split('.')[0];
            if (name) {
                table.addRow(file, '✅');
                client.on(name, event.bind(null, client));
            }
            else {
                table.addRow(file, `❌`);
            }
        }
    });
    console.log(table.toString());
};