import React from "react";
import { toast } from "react-toastify";

import TranslateText from "../../Components/TranslateText/TranslateText";

import databaseInfo from "../../Config/databaseinfo.json";

let DBVersion = (localStorage.getItem("DBVersion") && JSON.parse(localStorage.getItem("DBVersion")!).version + 1) || 1;
function initDatabase() {
    const databaseRequest = indexedDB.open(databaseInfo.DBName, DBVersion);
    databaseRequest.onupgradeneeded = () => {
        console.log("Database Upgraded");
        try {
            const db = databaseRequest.result;
            const ModelStore = db.createObjectStore(databaseInfo.backgroundStore, { keyPath: "id" });
            const behaviorStore = db.createObjectStore(databaseInfo.behaviorStore, { keyPath: "id" });
            const MusicStore = db.createObjectStore(databaseInfo.musicStore, { keyPath: "id" });
            const ReplayStore = db.createObjectStore(databaseInfo.replayStore, { keyPath: "id", autoIncrement: true });
            const chartEditorStore = db.createObjectStore(databaseInfo.chartEditorStore, { keyPath: "id"});
            db.close();
            localStorage.setItem("DBVersion", JSON.stringify({ version: DBVersion, initialized: true, updated: new Date().getDate() }));
        } catch (error) {
            console.error(error);
            toast.error(`${<TranslateText contentData= { "resourcesManager.database.notifications.initializingFailed"} />} : ${ error } `);
        }
    }
}

export default initDatabase;