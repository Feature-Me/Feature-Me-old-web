"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const fs = require("fs");
const nedb = require("nedb");
const app = express();
const server = http.createServer(app);
const basedir = path.join(__dirname, "../");
const viewsdir = path.join(basedir, "views");
const resourcesdir = path.join(basedir, "resources");
const scriptsdir = path.join(basedir, "scripts");
const stylesdir = path.join(basedir, "styles");
const dbdir = path.join(basedir, "db");
const port = 3000;
const db = {
    users: new nedb({ filename: path.join(dbdir, "users.db"), autoload: true }),
    leaderboard: new nedb({ filename: path.join(dbdir, "leaderboard.db"), autoload: true })
};
app.use(bodyParser.json());
app.use("/scripts", express.static(scriptsdir));
app.use("/styles", express.static(stylesdir));
console.log(`Views directory: ${scriptsdir}`);
app.get("/", (req, res) => {
    res.sendFile(path.join(viewsdir, "index.html"));
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
app.get("/api/resources/download", (req, res) => {
    res.json({
        size: fs.statSync(path.join(resourcesdir, "resources.fmrs")).size,
        data: new Uint8Array(fs.readFileSync(path.join(resourcesdir, "resources.fmrs")))
    });
});
