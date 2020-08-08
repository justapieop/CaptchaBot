require("dotenv").config();

module.exports = (client) => {
    client.getToken = () => {
        return process.env.TOKEN;
    }

    client.getPrefix = () => {
        return process.env.PREFIX;
    };

    client.getDBURL = () => {
        return process.env.DB;
    };

    client.getDefaultSettings = () => {
        const defaultSettings = {
            VerifyChannel: "verify",
            GiveRole: "verified"
        };
        return defaultSettings;
    };
};