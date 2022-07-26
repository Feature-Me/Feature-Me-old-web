import JSZip from "jszip";
import React from "react";
import { toast } from "react-toastify";
import mimedb from "mime-db";

import TranslateText from "../../../Components/TranslateText/TranslateText";
import databaseInfo from "../../../Config/databaseinfo.json";
import getMime from "../../getMime/getMime";
import getExtension from "Utils/getExtension/getExtension";

type modelAssetContents = {
    data: ArrayBuffer,
    alt?: {
        data: ArrayBuffer,
        mime: string
    }
}


interface modelContentData {
    name: string;
    src: string;
    alt?: string;
}




function installBackground(zip: JSZip) {
    return new Promise<void>(async (resolve, reject) => {

        if (!zip.file("FileMap.json")) {
            toast.error(<TranslateText contentData={"resourcesManager.database.notifications.installFailed"} />);
            resolve();
        }

        const fileMapJsonData: modelContentData = JSON.parse(await zip.file("FileMap.json")!.async("string"));
        const data: modelAssetContents = {
            data: await zip.file(fileMapJsonData.src)?.async("arraybuffer") || new ArrayBuffer(0),
            alt: {
                data: await zip.file(fileMapJsonData.alt || "")?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMime(fileMapJsonData.alt || "") || "image/png"
            }
        }

        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = async e => {
            const db = dbOpenRequest.result;
            const ModelStore = db.transaction(databaseInfo.backgroundStore, "readwrite").objectStore(databaseInfo.backgroundStore);

            const put = ModelStore.put({
                id: fileMapJsonData.name,
                data:data
            });
            put.onsuccess = e => {
                resolve();
                db.close();
            }
        }
    });
}

export { installBackground };
export type { modelAssetContents };