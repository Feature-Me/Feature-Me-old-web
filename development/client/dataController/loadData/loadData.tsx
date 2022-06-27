import databaseInfo from "../../global/databaseInfo.json";
import Version from "../../global/versions.json"
import compareVersions from "compare-versions";
import gameData from "dataController/gameData/gameData";
import { toast } from "react-toastify";
import React from "react";
import TranslateText from "global/TranslateText/translateText";
import arrayBufferToBase64 from "functions/arrayBufferToBase64/arrayBufferToBase64";

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
        await loadBackgroundAndGameObject();
        resolve()
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
                gameData.background.alt = "data:image/png;base64,"+arrayBufferToBase64(backgrounds.data.find((b: { name: string }) => b.name === gameConfig.background.backgroundName).alt)
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

export default loadData;