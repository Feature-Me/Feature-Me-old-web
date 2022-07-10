import React from "react"; 
import { toast } from "react-toastify";

import databaseInfo from "../../global/databaseInfo.json";
import Version from "../../global/versions.json"
import compareVersions from "compare-versions";
import gameData from "dataController/gameData/gameData";

import TranslateText from "global/TranslateText/translateText";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";
import { MusicAssetContents } from "dataController/resourcesUpdater/installMusic";

type Version = {
    [key: string]: string | {};
    version: string
    TermsVersion: string
    build: string
    background: {
        [key: string]: string;
    }
}
    

interface EventTargetWithResult  extends EventTarget {
    result: any
}

function loadData() {
    return new Promise<void>(async (resolve, reject) => {
        await Promise.all([
            loadBackgroundAndGameObject(),
            loadMusic(),
        ]);
        resolve();
        
    })
}

function loadBackgroundAndGameObject() {
    return new Promise<void>((resolve, reject) => {
        const DBOpenRequest = indexedDB.open(databaseInfo.DBName);
        DBOpenRequest.onsuccess = function (event) {
            const db = DBOpenRequest.result;
            const modelStore = db.transaction(databaseInfo.modelStore, "readonly").objectStore(databaseInfo.modelStore);
            modelStore.get("background").onsuccess = e => {
                const gameConfig = JSON.parse(localStorage.getItem("gameConfig")!);
                if(gameConfig.background.backgroundName === "default"){
                    const allBackgroundVersion = Version.background.map(background => background.version);
                    for(const backgroundVersion of allBackgroundVersion){
                        if(compareVersions(backgroundVersion, Version.version) === 0){
                            gameConfig.background.backgroundName = Version.background.find(background => background.version === backgroundVersion).name;
                        }
                    }
                }

                const result = e.target as EventTargetWithResult;
                const backgrounds = result.result;
                gameData.background.all = backgrounds.data.map((b: { name: string }) => b.name);
                gameData.background.alt = arrayBufferToBase64(backgrounds.data.find((b: { name: string }) => b.name === gameConfig.background.backgroundName).alt)
                if (gameConfig.use3DBackground) gameData.background.data = new ArrayBuffer(0);
                else gameData.background.data = backgrounds.data.find((e: { name:string }) => e.name === gameConfig.background.backgroundName).data;
                
                resolve();
            }
        }
        DBOpenRequest.onerror = e => {
            reject();
            toast.error(<TranslateText contentData={"resourcesManager.loadData.notifications.failed"} />);
        }
    })
}

function loadMusic() {
    return new Promise<void>((resolve, reject) => {
        gameData.musicData =  {
            content: [],
            all: [],
        }
        const DBOpenRequest = indexedDB.open(databaseInfo.DBName);
        DBOpenRequest.onsuccess = function (event) {
            const db = DBOpenRequest.result;
            const modelStore = db.transaction(databaseInfo.musicStore, "readonly").objectStore(databaseInfo.musicStore);
            modelStore.getAllKeys().onsuccess = async e => {
                const result = e.target as EventTargetWithResult;
                const keys = result.result;
                console.log(keys);
                resolve();
                for (const key of keys) {
                    await new Promise<void>(resolve => {
                        modelStore.get(key).onsuccess = e => {
                            const result = e.target as EventTargetWithResult;
                            const music = result.result as { id: string, data: MusicAssetContents }
                            gameData.musicData.content.push(music.data);
                            gameData.musicData.all.push(key);
                            resolve();
                        }
                    });
                }
                gameData.musicData.all.sort();
                gameData.musicData.all.splice(gameData.musicData.all.findIndex(e => e == "Tutorial"),1);
                gameData.musicData.all.unshift("Tutorial");

            }
        }
        DBOpenRequest.onerror = e => {
            reject();
            console.error(e);
            toast.error(<TranslateText contentData={"resourcesManager.loadData.notifications.failed"} />);
        }
    })
}

export default loadData;