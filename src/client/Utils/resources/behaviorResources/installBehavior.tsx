import JSZip from "jszip";
import React from "react";
import { toast } from "react-toastify";
import mimedb from "mime-db";

import TranslateText from "../../../Components/TranslateText/TranslateText";
import databaseInfo from "../../../Config/databaseinfo.json";
import getMime from "../../getMime/getMime";
import getExtension from "Utils/getExtension/getExtension";

type behaviorAssetContents = {
    name: string,
    type: "2d" | "3d",
    data: {
        tap: ArrayBuffer,
        damageTap: ArrayBuffer,
        hold: ArrayBuffer,
        bright: ArrayBuffer,
        seed: ArrayBuffer,
        flick: ArrayBuffer,
        character: ArrayBuffer,
        ground: ArrayBuffer,
    },
}


interface behaviorContentData {
    version: string;
    type: "2d" | "3d",
    name: string,
    tap: string,
    damageTap: string,
    hold: string,
    bright: string,
    seed: string,
    flick: string,
    character: string,
    ground: string,
}




function installBehavior(zip: JSZip) {
    return new Promise<void>(async (resolve, reject) => {
        if (!zip.file("FileMap.json")) {
            toast.error(<TranslateText contentData={"resourcesManager.database.notifications.installFailed"} />);
            resolve();
        }

        const fileMapJsonData: behaviorContentData = JSON.parse(await zip.file("FileMap.json")!.async("string"));

        const data: behaviorAssetContents["data"] = {
            tap: await zip.file(fileMapJsonData.tap)?.async("arraybuffer") || new ArrayBuffer(0),
            damageTap: await zip.file(fileMapJsonData.damageTap)?.async("arraybuffer") || new ArrayBuffer(0),
            hold: await zip.file(fileMapJsonData.hold)?.async("arraybuffer") || new ArrayBuffer(0),
            bright: await zip.file(fileMapJsonData.bright)?.async("arraybuffer") || new ArrayBuffer(0),
            seed: await zip.file(fileMapJsonData.seed)?.async("arraybuffer") || new ArrayBuffer(0),
            flick: await zip.file(fileMapJsonData.flick)?.async("arraybuffer") || new ArrayBuffer(0),
            character: await zip.file(fileMapJsonData.character)?.async("arraybuffer") || new ArrayBuffer(0),
            ground: await zip.file(fileMapJsonData.ground)?.async("arraybuffer") || new ArrayBuffer(0),
        }

        console.log(data);
        
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = async e => {
            const db = dbOpenRequest.result;
            const ModelStore = db.transaction(databaseInfo.behaviorStore, "readwrite").objectStore(databaseInfo.behaviorStore);

            const put = ModelStore.put({
                id: fileMapJsonData.name,
                data: {
                    type: fileMapJsonData.type,
                    data: data,
                }
            });
            put.onsuccess = e => {
                resolve();
                db.close();
            }
        }
    });
}

export { installBehavior };
export type { behaviorAssetContents };