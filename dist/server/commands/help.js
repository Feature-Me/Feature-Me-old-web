"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const help = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all commands and features'),
    exec: (interaction) => {
    }
};
exports.default = help;
