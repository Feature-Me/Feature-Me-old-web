import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as http from "http";
import * as socketIo from "socket.io";
import * as fs from "fs";
import * as crypto from "crypto";
import * as nedb from "nedb";
import * as url from "url";

const app = express();
const server: http.Server = http.createServer(app);

const basedir: string = path.join(__dirname, "../");
const viewsdir: string = path.join(basedir, "views");
const resourcesdir: string = path.join(basedir, "resources");
const scriptsdir: string = path.join(basedir, "scripts");
const icondir: string = path.join(basedir, "icon");
const dbdir: string = path.join(basedir, "db");
const port: number = 3000;

const db = {
    users: new nedb({ filename: path.join(dbdir, "users.db"), autoload: true }),
    leaderboard: new nedb({ filename: path.join(dbdir, "leaderboard.db"), autoload: true })
}

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);

});

app.use(bodyParser.json());
app.use("/scripts", express.static(scriptsdir));
app.use("/resources/background", express.static(path.join(resourcesdir, "Backgrounds")));
app.use("/resources/behavior", express.static(path.join(resourcesdir, "Behaviors")));
app.use("/resources/music", express.static(path.join(resourcesdir, "MusicResources")));
app.use("/icon", express.static(icondir));

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


app.use((req, res, next) => {
    res.status(404).redirect("/");
});