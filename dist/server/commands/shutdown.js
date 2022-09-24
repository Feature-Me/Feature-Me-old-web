"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
const shutdown = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shut down server. (owner only)'),
    exec: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.user.id != process.env.OWNER_ID) {
            interaction.reply({ content: `Failed to execute : command can execute only bot developper.`, ephemeral: true });
        }
        else {
            yield interaction.reply({ content: "Shut down.", ephemeral: true });
            process.exit(0);
        }
    })
};
exports.default = shutdown;
