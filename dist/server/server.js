"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const admin_ui_1 = require("@socket.io/admin-ui");
const fs = require("fs");
const crypto = require("crypto");
const uuid_1 = require("uuid");
const os = require("os");
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
//web socket
const io = new socketIo.Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});
(0, admin_ui_1.instrument)(io, {
    auth: false
});
const user = io.of("/user");
const chat = io.of("/chat");
const multiPlayer = io.of("/multiplayer");
user.on("connection", (socket) => {
    socket.on("login", (data) => {
        if (!data.id || !data.name) {
            const ns = (0, uuid_1.v4)();
            const id = (0, uuid_1.v5)(String(Date.now()), ns);
            data = {
                name: data.name || `Guest#${id.slice(0, 4)}`,
                id: data.id || id,
            };
        }
        socket.emit("loggedIn", data);
    });
});
chat.on("connection", (socket) => {
    socket.on("sendMessage", (message) => {
        chat.emit("receiveMessage", message);
    });
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Node version:${process.version}`);
    console.log(`PID:${process.pid}`);
    console.log(`${process.env.NODE_ENV} mode,bot:${process.env.USE_BOT}`);
    //if(process.env.NODE_ENV=="production") login();
});
app.use(express.json());
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
app.get("/health", (req, res) => {
    res.status(200).end("Server online.");
    console.log({
        memory: {
            used: process.memoryUsage().heapUsed,
            all: os.totalmem(),
            free: os.freemem()
        },
        upTime: process.uptime(),
        usedCpu: process.cpuUsage()
    });
});
app.use((req, res, next) => {
    res.status(404).redirect("/");
});
process.on('unhandledRejection', (error, promise) => {
    console.log(' Promise rejection : ', promise);
    console.error(error);
});
