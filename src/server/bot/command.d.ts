import * as discord from "discord.js"
type FunctionWithTypedProps<T> = { exec(value: T,...props:any): void }["exec"];

interface commandModules {
    command: discord.SlashCommandBuilder | Omit<discord.SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    exec: FunctionWithTypedProps<discord.ChatInputCommandInteraction<discord.CacheType> | discord.MessageContextMenuCommandInteraction<discord.CacheType> | discord.UserContextMenuCommandInteraction<discord.CacheType>>
}

export {commandModules}