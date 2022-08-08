import JSZip from "jszip";
import path from "path-browserify";

import databaseInfo from "../../../Config/databaseinfo.json";
import getMime from "../../../Utils/getMime/getMime";

function installSoundEffect(zip:JSZip) {
    return new Promise<void|Error>(async (resolve, reject) => {
        if(!zip.file("FileMap.json")){
            resolve(new Error("FileMap.json not found"));
        }

        const fileMapJsonData:soundEffectContentMap = JSON.parse(await zip.file("FileMap.json")!.async("string"));

        let data:any = {

        }

        for (const key in fileMapJsonData.sound) {
            const name = key as keyof soundEffectAssetContents["sound"];
            const pathName = fileMapJsonData.sound[name]
            const sound = await zip.file(path.normalize(pathName))?.async("arraybuffer") || new ArrayBuffer(0);
            const mime = getMime(pathName);
            data[name] = {
                data:sound,
                mime:mime
            }
        }

        data = data as soundEffectAssetContents["sound"];

        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = (event) => {
            const db = dbOpenRequest.result;
            const soundEffectStore = db.transaction(databaseInfo.soundEffectStore, "readwrite").objectStore(databaseInfo.soundEffectStore);
            const put = soundEffectStore.put({
                name: fileMapJsonData.name,
                sound: data,
                license: fileMapJsonData.license
            });
            put.onsuccess = (event) => {
                console.log("SoundEffect installed");
                resolve();
            }
            put.onerror = (event) => {
                console.error("SoundEffect install failed", event);
                
                resolve(new Error("SoundEffect install failed"));
            }
        }
    });

}

export { installSoundEffect };