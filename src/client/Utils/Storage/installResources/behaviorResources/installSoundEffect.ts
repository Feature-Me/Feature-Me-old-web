import JSZip from "jszip";
import path from "path-browserify";
import json5 from "json5";

import databaseInfo from "Config/databaseinfo.json";
import getMime from "Utils/getMime/getMime";

function installSoundEffect(zip:JSZip) {
    return new Promise<void|Error>(async (resolve, reject) => {
        if(!zip.file("FileMap.json")){
            resolve(new Error("FileMap.json not found"));
        }

        const fileMapJsonData:soundEffectContentMap = json5.parse(await zip.file("FileMap.json")!.async("string"));

        const data: soundEffectAssetContents["sound"] = {
            tap:{
                data: await zip.file(path.normalize(fileMapJsonData.sound.tap))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.tap))
            },
            damage: {
                data: await zip.file(path.normalize(fileMapJsonData.sound.damage))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.damage))
            },
            hold: {
                data: await zip.file(path.normalize(fileMapJsonData.sound.hold))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.hold))
            },
            bright: {
                data: await zip.file(path.normalize(fileMapJsonData.sound.bright))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.bright))
            },
            seed: {
                data: await zip.file(path.normalize(fileMapJsonData.sound.seed))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.seed))
            },
            flick: {
                data: await zip.file(path.normalize(fileMapJsonData.sound.flick))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.flick))
            },
            assist: {
                data: await zip.file(path.normalize(fileMapJsonData.sound.assist))?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(path.normalize(fileMapJsonData.sound.assist))
            }
            
        }

        /* let data:any = {

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

        data = data as soundEffectAssetContents["sound"]; */

        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = (event) => {
            const db = dbOpenRequest.result;
            const soundEffectStore = db.transaction(databaseInfo.soundEffectStore, "readwrite").objectStore(databaseInfo.soundEffectStore);
            const put = soundEffectStore.put({
                version:fileMapJsonData.version,
                name: fileMapJsonData.name,
                made:fileMapJsonData.made,
                sound: data,
                license: fileMapJsonData.license,
                installedAt: Date.now()
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