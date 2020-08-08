const mongoose = require("mongoose");

const GuildSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    GuildName: String,
    GuildID: String,
    VerifyChannel: String,
    GiveRole: String,
});

module.exports = mongoose.model("guilds", GuildSchema);