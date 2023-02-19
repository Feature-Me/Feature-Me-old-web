import JSZip from "jszip";
import React from "react";
import { toast } from "react-toastify";
import * as THREE from "three";
import { FontObject, TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import json5 from "json5";
import path from "path-browserify";

import TranslateText from "Components/TranslateText/translateText";
import databaseInfo from "Config/databaseinfo.json";
import getMime from "Utils/getMime/getMime";
import { installFont } from "./installFont";
import { installSoundEffect } from "./installSoundEffect";





function installBehavior(zip: JSZip) {
    return new Promise<void | Error>(async (resolve, reject) => {
        if (!zip.file("FileMap.json")) {
            toast.error(<TranslateText key={"resourcesManager.database.notifications.installFailed"} />);
            resolve(new Error("FileMap.json not found"));
        }

        const fileMapJsonData: behaviorContentMap = json5.parse(await zip.file("FileMap.json")!.async("string"));

        console.log(fileMapJsonData, zip);

        const data: behaviorAssetContents["models"] = {
            tap: await zip.file(path.normalize(fileMapJsonData.models.tap))?.async("arraybuffer") || new ArrayBuffer(0),
            damageTap: await zip.file(path.normalize(fileMapJsonData.models.damageTap))?.async("arraybuffer") || new ArrayBuffer(0),
            hold: await zip.file(path.normalize(fileMapJsonData.models.hold))?.async("arraybuffer") || new ArrayBuffer(0),
            bright: await zip.file(path.normalize(fileMapJsonData.models.bright))?.async("arraybuffer") || new ArrayBuffer(0),
            seed: await zip.file(path.normalize(fileMapJsonData.models.seed))?.async("arraybuffer") || new ArrayBuffer(0),
            flick: await zip.file(path.normalize(fileMapJsonData.models.flick))?.async("arraybuffer") || new ArrayBuffer(0),
            character: await zip.file(path.normalize(fileMapJsonData.models.character))?.async("arraybuffer") || new ArrayBuffer(0),
            ground: await zip.file(path.normalize(fileMapJsonData.models.ground))?.async("arraybuffer") || new ArrayBuffer(0),
        }

        let soundEffectName: string;

        let font: FontObject | undefined, fontName: string;

        if (fileMapJsonData.soundEffect) {
            try {
                const soundEffect = zip.filter(path => path.startsWith(fileMapJsonData.soundEffect!));
                const soundEffectFileMap = await zip.file(path.normalize(fileMapJsonData.soundEffect! + "/FileMap.json"))?.async("string");

                if (soundEffectFileMap) {
                    const soundEffectFileMapData = JSON.parse(soundEffectFileMap);
                    soundEffectName = soundEffectFileMapData.name;
                }

                const soundEffectZip = new JSZip();
                for (const file of soundEffect) {
                    if (file.dir) continue;
                    soundEffectZip.file(file.name.replace(fileMapJsonData.soundEffect + "/", ""), await file.async("arraybuffer"));
                }
                installSoundEffect(soundEffectZip)

            } catch (error) {
                console.error(error);
            }
        }



        if (fileMapJsonData.font) {
            try {
                if (zip.file(path.normalize(fileMapJsonData.font))) {
                    font = await fontToJson(await zip.file(path.normalize(fileMapJsonData.font))!.async("arraybuffer"));
                    fontName = font.familyName
                    installFont(font).catch(e => { throw new Error(e); });
                }
            } catch (error) {
                console.error(error);
            }
        }

        console.log(data);


        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = async e => {
            const db = dbOpenRequest.result;
            const ModelStore = db.transaction(databaseInfo.behaviorStore, "readwrite").objectStore(databaseInfo.behaviorStore);

            const behavior = {
                version: fileMapJsonData.version,
                name: fileMapJsonData.name,
                made: fileMapJsonData.made,
                models: data,
                soundEffect: soundEffectName || "",
                font: fontName || "",
                type: "3d",
                installedAt: Date.now()
            }

            const put = ModelStore.put(behavior);
            put.onsuccess = e => {
                db.close();
                resolve();
            }
            put.onerror = e => {
                console.error("Error", e);
                db.close();
                resolve(new Error("Error while installing behavior"));
            }
        }
    });
}

function fontToJson(font: ArrayBuffer) {
    return new Promise<FontObject>((resolve, reject) => {
        new TTFLoader().loadFromArrayBufferAsync(font).then(font => {
            resolve(font);
        }).catch(e => {
            console.error(e);
            reject(e);
        })
    });
}

export { installBehavior };
