import { inspect } from "util";
import { commandModules } from "../command";

import { SlashCommandBuilder } from 'discord.js';

const help: commandModules = {
    command: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all commands and features'),
    exec: (interaction) => {
    }
};

export default help;