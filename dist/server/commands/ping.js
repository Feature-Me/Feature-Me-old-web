"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ping = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns gateway ping.'),
    exec: (interaction) => {
        interaction.reply({ content: `Client Ping : ${interaction.client.ws.ping}ms.`, ephemeral: true });
    },
};
exports.default = ping;
