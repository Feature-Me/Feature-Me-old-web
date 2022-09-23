import { config } from "dotenv";
import { inspect } from "util";
import { commandModules } from "../command";

import { SlashCommandBuilder } from 'discord.js';

config();

const shutdown: commandModules = {
    command: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shut down server. (owner only)'),
    exec: async (interaction) => {
        if (interaction.user.id != process.env.OWNER_ID) {
            interaction.reply({ content: `Failed to execute : command can execute only bot developper.`, ephemeral: true })
        } else {
            await interaction.reply({ content: "Shut down.", ephemeral: true })
            process.exit(0);
        }
    }
};

export default shutdown;