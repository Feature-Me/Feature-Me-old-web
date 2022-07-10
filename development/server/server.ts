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
const server:http.Server = http.createServer(app);

const basedir:string = path.join(__dirname, "../");
const viewsdir:string = path.join(basedir, "views");
const resourcesdir:string = path.join(basedir, "resources");
const scriptsdir:string = path.join(basedir, "scripts");
const stylesdir:string = path.join(basedir, "styles");
const dbdir:string = path.join(basedir, "db");
const port:number = 3000;

const db = {
    users: new nedb({ filename: path.join(dbdir, "users.db"), autoload: true }),
    leaderboard: new nedb({ filename: path.join(dbdir, "leaderboard.db"), autoload: true })
}


app.use(bodyParser.json());
app.use("/scripts",express.static(scriptsdir));
app.use("/styles",express.static(stylesdir));
app.use("/resources/model",express.static(path.join(resourcesdir, "3DModels")));
app.use("/resources/music",express.static(path.join(resourcesdir, "MusicResources")));
console.log(`Views directory: ${scriptsdir}`);


app.get("/", (req, res) => {
    res.sendFile(path.join(viewsdir, "index.html"));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    
});

app.get("/update/map",(req,res)=>{
    const modelUrl = "/resources/model/"
    const musicUrl = "/resources/music/"
    
    const model:{[key:string]:string} = {}
    const music: { [key: string]: string } = {}
    fs.readdirSync(path.join(resourcesdir, "3DModels")).forEach(file => {
        if(file.endsWith(".fm3d")){
            model[file.replace(".fm3d","")] = modelUrl + file
        }
    });
    fs.readdirSync(path.join(resourcesdir, "MusicResources")).forEach(file => {
        if(file.endsWith(".fmmc")){
            music[file.replace(".fmmc","")] = musicUrl + file
        }
    });
    res.json({
        model: model,
        music: music
    })

    
})