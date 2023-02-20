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
const rooms: Array<multiPlayerRoom> = [];
const users: Array<wsUser> = [];

user.on("connection", (socket) => {
    let user: wsUser;
    socket.on("login", (data: wsUserLoginInfo, callback: Function) => {
        try {
            if (!data.id || !data.name) {
                const ns = uuidv4();
                const id = uuidv5(String(Date.now()), ns);
                user = {
                    name: data.name || "Guest",
                    tag: "",
                    id: data.id || id,
                    connection: socket.id,
                    state: "online"
                }
            }
            users.push(user);
            callback({ success: true, data });
        } catch (error) {
            console.log(error);
            callback({ success: false, data: undefined });
        }
    });
    socket.on("changeState", (state: wsUser["state"], callback: Function) => {
        if (!user) return callback({ success: false });
        user.state = state;
    })
    socket.on("disconnect", () => {
        const index = users.findIndex(u => u == user);
        if (index < 0) return;
        user.state = "offline";
        users.splice(index, 1);
    })
});

chat.on("connection", (socket) => {
    socket.on("sendMessage", (message: chatMessage) => {
        chat.emit("receiveMessage", message);
    });
});

multiPlayer.on("connection", (socket) => {
    socket.on("getRooms", () => {
        socket.emit(JSON.stringify(rooms.map(r => { r.invite, r.name, r.users.length })));
    })
    socket.on("createRoom", (name: string, user: wsUser, callback: Function) => {
        try {
            const ns = uuidv4();
            const id = uuidv5(String(Date.now()), ns);
            String.prototype.slice()
            const newRoom: multiPlayerRoom = {
                name,
                id,
                invite: id.slice(0, 4),
                users: [user],
                owner: user
            }
            rooms.push(newRoom);
            socket.join(newRoom.id);

            callback({ success: true });
        } catch (error) {
            console.error(error);
            callback({ success: false });
        }
    });
    socket.on("leaveRoom", () => {
        socket.rooms.forEach(r => {
            socket.leave(r);
            //add leave function and auto close room
            /* const room = rooms.find(rs=>rs.id==r);
            if(room)room.users.splice() */
        });
    });
    socket.on("joinRoom", (id: string, user: wsUser, callback: Function) => {
        try {
            const room = rooms.find(r => r.id == id);
            if (!room) throw new Error("The room was not found.");
            room.users.push(user);
            socket.join(id);
            callback({ success: true });
        } catch (error) {
            console.error(error);
            callback({ success: false });
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
app.use("/resources/sfx", express.static(path.join(resourcesdir, "SoundEffects")));
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


    const keys: keyType = [
        { name: "background", path: "Backgrounds", ext: ".fmbg", url: "/resources/background/", ref: {} },
        { name: "behavior", path: "Behaviors", ext: ".fmbh", url: "/resources/behavior/", ref: {} },
        { name: "music", path: "MusicResources", ext: ".fmmc", url: "/resources/music/", ref: {} },
        { name: "soundEffect", path: "SoundEffects", ext: ".fmsf", url: "/resources/sfx/", ref: {} },
    ]

    const data: { [key: string]: refType } = {};

    for (const key of keys) {
        fs.readdirSync(path.join(resourcesdir, key.path)).forEach(file => {
            if (file.endsWith(key.ext)) {
                key.ref[file.replace(key.ext, "")] = {
                    url: key.url + file,
                    size: fs.statSync(path.join(resourcesdir, key.path, file)).size,
                    hash: crypto.createHash("sha256").update(fs.readFileSync(path.join(resourcesdir, key.path, file))).digest("hex"),
                }
            }
        });
        data[key.name] = key.ref;
    }

    res.json(data);

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