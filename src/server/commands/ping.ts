import { commandModules } from "../command";

import { SlashCommandBuilder } from 'discord.js';

const ping: commandModules = {
    command: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns gateway ping.'),
    exec: (interaction) => {
        interaction.reply({ content: `Client Ping : ${interaction.client.ws.ping}ms.`, ephemeral: true })
    },
};
export default ping;