import { FontObject } from "three/examples/jsm/loaders/TTFLoader";

import databaseInfo from "Config/databaseinfo.json";

async function installFont(font:FontObject){
    return new Promise<void>((resolve, reject) => {
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = (event) => {
            const db = dbOpenRequest.result;
            const fontStore = db.transaction(databaseInfo.fontStore, "readwrite").objectStore(databaseInfo.fontStore);
            const put = fontStore.put({
                name: font.familyName,
                data: font,
                installedAt: Date.now()
            });
            put.onsuccess = (event) => {
                console.log("Font installed");
                resolve();
            }
            put.onerror = (event) => {
                console.log("Font install failed");
                reject(event);
            }
        }
    });
}

export { installFont };