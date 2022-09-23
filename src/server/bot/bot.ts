import * as discord from "discord.js"
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

import {commandModules} from "./command";

dotenv.config({path:path.join(__dirname,"../../../.env")});

const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds,discord.GatewayIntentBits.DirectMessages] });
const rest = new discord.REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN||"");

const commandFiles = fs.readdirSync(path.join(__dirname,"./commands")).filter(file => file.endsWith('.js'));
let commands = new discord.Collection<string,commandModules>();
for (const file of commandFiles) {
    const command: { default: commandModules } = require(`./commands/${file}`);
    
    commands.set(command.default.command.name,command.default);
}

async function register() {
    if (!client.user?.id) return;
    const commandData = commands.map(cmd => cmd.command)
    const data = await rest.put(discord.Routes.applicationCommands(client.user.id),{body:commandData})
    return client.application!.commands.set(commandData);
}

client.on("ready",async (e)=>{
    console.log(`Logged in as ${e.user.tag}`);
    try {
        await register();
    } catch (error) {
        console.error(error);
    }
    
    client.users.fetch(process.env.OWNER_ID||"").then(user=>{
        if(!user) throw Error("user not found");
        //user.send(`logged in to discord.\nStarted:${new Date().toString()}`);
        const embed = new discord.EmbedBuilder()
        .setColor(0x1189da)
        .setTitle("Feature Me Server Started.")
        .setTimestamp()
        user.send({embeds:[embed]})
    })
})

client.on("interactionCreate",async (interaction)=>{
    if(!interaction.isCommand())return;
    try {
        const command = commands.get(interaction.commandName);
        command?.exec(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply("An Error has occured.")
    }
})

function login(){
    if (!process.env.DISCORD_BOT_TOKEN) console.error("login Failed.")
    client.login(process.env.DISCORD_BOT_TOKEN)
}

export {login}
