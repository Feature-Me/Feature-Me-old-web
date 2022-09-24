"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const util_1 = require("util");
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
const exec = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName('exec')
        .setDescription('Execute Javascript code.(owner only)')
        .addStringOption(option => option.setName("code")
        .setDescription("Javascript Code to execute")
        .setRequired(true)),
    exec: (interaction) => {
        var _a, _b;
        if (interaction.user.id != process.env.OWNER_ID) {
            interaction.reply({ content: `Failed to execute : command can execute only bot developper.`, ephemeral: true });
        }
        else {
            if (!((_a = interaction.options.get("code")) === null || _a === void 0 ? void 0 : _a.value))
                interaction.reply({ content: `Failed to execute : Code is invalid.`, ephemeral: true });
            try {
                const client = null;
                const process = null;
                const global = null;
                const startTime = Date.now();
                const execData = eval(String((_b = interaction.options.get("code")) === null || _b === void 0 ? void 0 : _b.value));
                const endTime = Date.now();
                interaction.reply({ content: `${(0, util_1.inspect)(execData)}\nTime:${endTime - startTime}ms.`, ephemeral: true }).catch(e => { throw Error(e); });
            }
            catch (error) {
                interaction.reply({ content: `Failed to execute with Error : ${error}`, ephemeral: true });
            }
        }
    },
};
exports.default = exec;
