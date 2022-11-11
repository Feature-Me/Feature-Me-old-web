import { FontObject } from "three/examples/jsm/loaders/TTFLoader"
import databaseInfo from "Config/databaseinfo.json"
import { fontAssetContents } from "Types/resources/fontResources";

function loadFont(fontName:string){
    return new Promise<fontAssetContents>((resolve, reject) => {
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = (e) => {
            const db = dbOpenRequest.result;
            const fontStore = db.transaction(databaseInfo.fontStore, "readonly").objectStore(databaseInfo.fontStore);
            const getRequest = fontStore.get(fontName);
            getRequest.onsuccess = (e) => {
                const fontObject = getRequest.result as {name:string, data:FontObject};
                resolve(fontObject);
            }
            getRequest.onerror = (e) => {
                console.error(e);
                reject(e);
            }
        }
    })
}

export default loadFont;