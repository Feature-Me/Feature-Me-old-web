import React from "react";
import { toast } from "react-toastify";

import TranslateText from "Components/TranslateText/TranslateText";

import databaseInfo from "Config/databaseinfo.json";

let DBVersion = (localStorage.getItem("DBVersion") && JSON.parse(localStorage.getItem("DBVersion")!).version + 1) || 1;
function initDatabase() {
    const databaseRequest = indexedDB.open(databaseInfo.DBName, DBVersion);
    databaseRequest.onupgradeneeded = () => {
        console.log("Database Upgraded");
        try {
            const db = databaseRequest.result;
            if(!db.objectStoreNames.contains(databaseInfo.backgroundStore))
                db.createObjectStore(databaseInfo.backgroundStore, { keyPath: "name" });

            if(!db.objectStoreNames.contains(databaseInfo.behaviorStore))
                db.createObjectStore(databaseInfo.behaviorStore, { keyPath: "name" });

            if(!db.objectStoreNames.contains(databaseInfo.soundEffectStore))
                db.createObjectStore(databaseInfo.soundEffectStore, { keyPath: "name" });

            if(!db.objectStoreNames.contains(databaseInfo.fontStore))
                db.createObjectStore(databaseInfo.fontStore, { keyPath: "name" });

            if(!db.objectStoreNames.contains(databaseInfo.musicStore))
                db.createObjectStore(databaseInfo.musicStore, { keyPath: "name" });

            if(!db.objectStoreNames.contains(databaseInfo.storyStore))
                db.createObjectStore(databaseInfo.storyStore, { keyPath: "id" });

            if(!db.objectStoreNames.contains(databaseInfo.replayStore))
                db.createObjectStore(databaseInfo.replayStore, { keyPath: "id",});
            
            if(!db.objectStoreNames.contains(databaseInfo.editorStore))
                db.createObjectStore(databaseInfo.editorStore, { keyPath: "id"});

            if(!db.objectStoreNames.contains(databaseInfo.practiceAssetStore))
                db.createObjectStore(databaseInfo.practiceAssetStore,{keyPath:"name"});

            db.close();
            localStorage.setItem("DBVersion", JSON.stringify({ version: DBVersion, initialized: true, updated: Date.now() }));
        } catch (error) {
            console.error(error);
            toast.error(`${<TranslateText content= { "resourcesManager.database.notifications.initializingFailed"} />} : ${ error } `);
        }
    }
}

export default initDatabase;