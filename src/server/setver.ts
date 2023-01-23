import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as socketIo from "socket.io";
import * as fs from "fs";
import * as crypto from "crypto";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

//express server
const app = express();
const server: http.Server = http.createServer(app);

const basedir: string = path.join(__dirname, "../");
const viewsdir: string = path.join(basedir, "views");
const resourcesdir: string = path.join(basedir, "resources");
const scriptsdir: string = path.join(basedir, "scripts");
const imagedir: string = path.join(basedir, "images");
const dbdir: string = path.join(basedir, "db");
const port: number = Number(process.env.PORT) || 3000;

//web socket
const io = new socketIo.Server(server, {});

const user = io.of("/user");
const chat = io.of("/chat")
const multiPlayer = io.of("/multiplayer");
const rooms = [];
const users: Array<wsUser> = [];

user.on("connection", (socket) => {
    let user: wsUser;
    socket.on("login", (data: wsUserLoginInfo) => {
        try {
            if (!data.id || !data.name) {
                const ns = uuidv4();
                const id = uuidv5(String(Date.now()), ns);
                user = {
                    name: data.name || "Guest",
                    tag: "",
                    id: data.id || id,
                    connection: id
                }
            }
            users.push(user);
            socket.emit("loggedIn", data);
        } catch (error) {
            console.log(error);
            socket.emit("loginError");
        }
    });
    socket.on("disconnect", () => {
        const index = users.findIndex(u => u == user);
        if (index < 0) return;
        users.splice(index, 1);
    })
})

chat.on("connection", (socket) => {
    socket.on("sendMessage", (message: chatMessage) => {
        chat.emit("receiveMessage", message);
    });
});

multiPlayer.on("connection", (socket) => {
    socket.on("getRooms", () => {
        socket.emit(rooms);
    })
    socket.on("createRoom", (name:string,user:wsUser) => {
        try {
            const ns = uuidv4();
        const id = uuidv5(String(Date.now()), ns);
        String.prototype.slice()
        const room: multiPlayerRoom = {
            name,
            id,
            invite:id.slice(0,4),
            users:[user]
        }
        rooms.push(newRoom);
        } catch (error) {
            console.error(error);
            socket.emit("createRoomError");
        }
    })
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`Node version:${process.version}`);
    console.log(`PID:${process.pid}`)
    console.log(`${process.env.NODE_ENV} mode,bot:${process.env.USE_BOT}`);
});

app.use(express.json());
app.use("/scripts", express.static(scriptsdir));
app.use("/resources/background", express.static(path.join(resourcesdir, "Backgrounds")));
app.use("/resources/behavior", express.static(path.join(resourcesdir, "Behaviors")));
app.use("/resources/music", express.static(path.join(resourcesdir, "MusicResources")));
app.use("/images", express.static(imagedir));

app.get("/favicon", (req, res) => {
    if (req.headers["content-type"] == "image/x-icon") res.sendFile(path.join(imagedir, "favicon.ico"));
    else res.sendFile(path.join(imagedir, "favicon.png"));
});

app.get("/worker", (req, res) => {
    res.sendFile(path.join(scriptsdir, "serviceWorker", "serviceWorker.js"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(viewsdir, "index.html"));
});


app.get("/update/map", (req, res) => {
    const modelUrl = "/resources/background/"
    const behaviorUrl = "/resources/behavior/"
    const musicUrl = "/resources/music/"

    const model: { [key: string]: { url: string, size: number, hash: string } } = {}
    const behavior: { [key: string]: { url: string, size: number, hash: string } } = {}
    const music: { [key: string]: { url: string, size: number, hash: string } } = {}
    fs.readdirSync(path.join(resourcesdir, "Backgrounds")).forEach(file => {
        if (file.endsWith(".fmbg")) {
            model[file.replace(".fmbg", "")] = {
                url: modelUrl + file,
                size: fs.statSync(path.join(resourcesdir, "Backgrounds", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "Backgrounds", file))).digest("hex")
            }
        }
    });
    fs.readdirSync(path.join(resourcesdir, "Behaviors")).forEach(file => {
        if (file.endsWith(".fmbh")) {
            behavior[file.replace(".fmbh", "")] = {
                url: behaviorUrl + file,
                size: fs.statSync(path.join(resourcesdir, "Behaviors", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "Behaviors", file))).digest("hex")
            }
        }
    });
    fs.readdirSync(path.join(resourcesdir, "MusicResources")).forEach(file => {
        if (file.endsWith(".fmmc")) {
            music[file.replace(".fmmc", "")] = {
                url: musicUrl + file,
                size: fs.statSync(path.join(resourcesdir, "MusicResources", file)).size,
                hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, "MusicResources", file))).digest("hex")
            }
        }
    });
    res.json({
        background: model,
        behavior: behavior,
        music: music
    })
})


app.get("/health", (req, res) => {
    res.status(200).end("Server online.");
})

app.use((req, res, next) => {
    res.status(404).redirect("/");
});

//process events
process.on('unhandledRejection', (error, promise) => {
    console.log(' Promise rejection : ', promise);
    console.error(error);
});

process.on("uncaughtException", (error) => {
    console.error(error);
})

process.on("beforeExit", () => {
    user.emit("serverExit");
})