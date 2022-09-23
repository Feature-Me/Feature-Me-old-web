import { config } from "dotenv";
import { inspect } from "util";
import * as childProcess from "child_process"
import { commandModules } from "../command";

import { SlashCommandBuilder } from 'discord.js';

config();

const shell: commandModules = {
    command: new SlashCommandBuilder()
        .setName('shell')
        .setDescription('Run shell.(owner only)')
        .addStringOption(option =>
            option.setName("code")
                .setDescription("Shell commands to execute")
                .setRequired(true)
        ),
    exec: (interaction) => {
        if (interaction.user.id != process.env.OWNER_ID) {
            interaction.reply({ content: `Failed to execute : command can execute only bot developper.`, ephemeral: true })
        } else {
            if (!interaction.options.get("code")?.value) interaction.reply({ content: `Failed to execute : Code is invalid.`, ephemeral: true })
            try {
                const client = null;
                const process = null;
                const global = null;
                const startTime = Date.now();
                const execData = childProcess.execSync(String(interaction.options.get("code")?.value))
                const endTime = Date.now();
                interaction.reply({ content: `${inspect(execData)}\nTime:${endTime - startTime}ms.`, ephemeral: true })
            } catch (error) {
                interaction.reply({ content: `Failed to execute with Error : ${error}`, ephemeral: true })
            }
        }

    },
};

export default shell;