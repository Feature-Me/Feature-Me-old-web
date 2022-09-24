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
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const nedb = require("nedb");
const dotenv = require("dotenv");
const discord = require("discord.js");
dotenv.config({ path: path.join(__dirname, "../../../.env") });
//express server
const app = express();
const server = http.createServer(app);
const basedir = path.join(__dirname, "../");
const viewsdir = path.join(basedir, "views");
const resourcesdir = path.join(basedir, "resources");
const scriptsdir = path.join(basedir, "scripts");
const imagedir = path.join(basedir, "images");
const dbdir = path.join(basedir, "db");
const port = Number(process.env.PORT) || 3000;
const db = {
    users: new nedb({ filename: path.join(dbdir, "users.db"), autoload: true }),
    leaderboard: new nedb({ filename: path.join(dbdir, "leaderboard.db"), autoload: true })
};
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    //if(process.env.NODE_ENV=="production") login();
});
app.use(bodyParser.json());
app.use("/scripts", express.static(scriptsdir));
app.use("/resources/background", express.static(path.join(resourcesdir, "Backgrounds")));
app.use("/resources/behavior", express.static(path.join(resourcesdir, "Behaviors")));
app.use("/resources/music", express.static(path.join(resourcesdir, "MusicResources")));
app.use("/images", express.static(imagedir));
app.get("/favicon", (req, res) => {
    if (req.headers["content-type"] == "image/x-icon")
        res.sendFile(path.join(imagedir, "favicon.ico"));
    else
        res.sendFile(path.join(imagedir, "favicon.png"));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(viewsdir, "index.html"));
});
app.get("/update/map", (req, res) => {
    const modelUrl = "/resources/background/";
    const behaviorUrl = "/resources/behavior/";
    const musicUrl = "/resources/music/";
    const model = {};
    const behavior = {};
    const music = {};
    fs.readdirSync(path.join(resourcesdir, "Backgrounds")).forEach(file => {
        if (file.endsWith(".fmbg")) {
            model[file.replace(".fmbg", "")] = {
                url: modelUrl + file,
                size: fs.statSync(path.join(resourcesdir, "Backgrounds", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "Backgrounds", file))).digest("hex")
            };
        }
    });
    fs.readdirSync(path.join(resourcesdir, "Behaviors")).forEach(file => {
        if (file.endsWith(".fmbh")) {
            behavior[file.replace(".fmbh", "")] = {
                url: behaviorUrl + file,
                size: fs.statSync(path.join(resourcesdir, "Behaviors", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "Behaviors", file))).digest("hex")
            };
        }
    });
    fs.readdirSync(path.join(resourcesdir, "MusicResources")).forEach(file => {
        if (file.endsWith(".fmmc")) {
            music[file.replace(".fmmc", "")] = {
                url: musicUrl + file,
                size: fs.statSync(path.join(resourcesdir, "MusicResources", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "MusicResources", file))).digest("hex")
            };
        }
    });
    res.json({
        background: model,
        behavior: behavior,
        music: music
    });
});
app.use((req, res, next) => {
    res.status(404).redirect("/");
});
//discord
const client = new discord.Client({ intents: [discord.GatewayIntentBits.Guilds, discord.GatewayIntentBits.DirectMessages] });
const rest = new discord.REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN || "");
const commandFiles = fs.readdirSync(path.join(__dirname, "./commands")).filter(file => file.endsWith('.js'));
let commands = new discord.Collection();
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.default.command.name, command.default);
}
function register() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = client.user) === null || _a === void 0 ? void 0 : _a.id))
            return;
        const commandData = commands.map(cmd => cmd.command);
        const data = yield rest.put(discord.Routes.applicationCommands(client.user.id), { body: commandData });
        return client.application.commands.set(commandData);
    });
}
client.on("ready", (e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Logged in as ${e.user.tag}`);
    try {
        yield register();
    }
    catch (error) {
        console.error(error);
    }
    client.users.fetch(process.env.OWNER_ID || "").then(user => {
        if (!user)
            throw Error("user not found");
        //user.send(`logged in to discord.\nStarted:${new Date().toString()}`);
        const embed = new discord.EmbedBuilder()
            .setColor(0x1189da)
            .setTitle("Feature Me Server Started.")
            .setTimestamp();
        user.send({ embeds: [embed] });
    });
}));
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    try {
        const command = commands.get(interaction.commandName);
        command === null || command === void 0 ? void 0 : command.exec(interaction);
    }
    catch (error) {
        console.error(error);
        interaction.reply("An Error has occured.");
    }
}));
function login() {
    if (!process.env.DISCORD_BOT_TOKEN)
        console.error("login Failed.");
    client.login(process.env.DISCORD_BOT_TOKEN);
}
