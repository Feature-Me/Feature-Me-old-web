import JSZip from "jszip";
import React from "react";
import { toast } from "react-toastify";
import mimedb from "mime-db";
import json5 from "json5";

import TranslateText from "Components/TranslateText/translateText";
import databaseInfo from "Config/databaseinfo.json";
import getMime from "Utils/getMime/getMime";




function installBackground(zip: JSZip) {
    return new Promise<void | Error>(async (resolve, reject) => {

        if (!zip.file("FileMap.json")) {
            toast.error(<TranslateText key={"resourcesManager.database.notifications.installFailed"} />);
            resolve(new Error("FileMap.json not found"));
        }

        const fileMapJsonData: backgroundContentMap = json5.parse(await zip.file("FileMap.json")!.async("string"));
        const data: backgroundAssetContents = {
            name: fileMapJsonData.name,
            data: await zip.file(fileMapJsonData.src)?.async("arraybuffer") || new ArrayBuffer(0),
            alt: {
                data: await zip.file(fileMapJsonData.alt || "")?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(fileMapJsonData.alt || "") || "image/png"
            },
            skydata: {
                turbidity: fileMapJsonData.skydata.turbidity,
                rayleigh: fileMapJsonData.skydata.rayleigh,
                mieCoeffient: fileMapJsonData.skydata.mieCoeffient,
                mieDirectionalG: fileMapJsonData.skydata.mieDirectionalG,
                sunPhi: fileMapJsonData.skydata.sunPhi,
                sunTheta: fileMapJsonData.skydata.sunTheta
            },
            made: fileMapJsonData.made,
            scenes: [],
            installedAt: Date.now()
        }

        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = async e => {
            const db = dbOpenRequest.result;
            const ModelStore = db.transaction(databaseInfo.backgroundStore, "readwrite").objectStore(databaseInfo.backgroundStore);

            const put = ModelStore.put(data);
            put.onsuccess = e => {
                db.close();
                resolve();
            }
            put.onerror = e => {
                db.close();
                console.error(e);
                resolve(new Error("Error while installing background"));
            }
        }
    });
}

export { installBackground };