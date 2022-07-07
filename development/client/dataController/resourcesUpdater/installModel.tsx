import TranslateText from "global/TranslateText/translateText";
import JSZip from "jszip";
import React from "react";
import { toast } from "react-toastify";
import databaseInfo from "../../global/databaseInfo.json";

type modelAssetContents = {
    name: string,
    data: ArrayBuffer | { [key: string]: ArrayBuffer },
    size: number
    alt?: ArrayBuffer,
}

type assets = {
    [key: string]: Array<modelAssetContents>;
}

type modelContentData = {
    [key: string]: string | {};
    name: string;
    src: string | { [key: string]: string };
    alt?: string;
}




async function installModel(zip: JSZip) {
    return new Promise<void>(async (resolve,reject) =>{
    console.log(zip);

    const filemMapJsonData = JSON.parse(await zip.file("FileMap.json").async("string"));

    const assets: assets = {};
    for (const category in filemMapJsonData) {
        if (category == "version") continue;
        for (const content of filemMapJsonData[category]) {
            content as modelContentData;

            if (!assets[category]) assets[category] = []
            let data: ArrayBuffer | { [key: string]: ArrayBuffer }
            let size: number;
            let alt: ArrayBuffer;
            if (typeof content.src == "string") {
                data = await zip.file(content.src).async("arraybuffer");
                size = data.byteLength;
            } else {
                data = {} as { [key: string]: ArrayBuffer };
                for (const key in content.src) {
                    const dataContent = await zip.file(content.src[key]).async("arraybuffer");
                    console.log(key, content.src[key], dataContent);
                    data[key] = dataContent
                    size += data[key].byteLength;
                }
            }
            if (content.alt) alt = await zip.file(content.alt).async("arraybuffer");
            else alt = new ArrayBuffer(0);
            assets[category].push({
                name: content.name,
                data: data,
                size: size,
                alt: alt
            })
        }

    }


    const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
    dbOpenRequest.onsuccess = async e => {
        const db = dbOpenRequest.result;
        const ModelStore = db.transaction(databaseInfo.modelStore, "readwrite").objectStore(databaseInfo.modelStore);
        for (const category in assets) {
            const savedModel = ModelStore.get(category);

                savedModel.onsuccess = e => {

                    const modelData = savedModel.result?.data || [];
                    for (const asset of assets[category]) {
                        if (!modelData.find((m: { name: string; }) => m.name == asset.name)) modelData.push(asset);
                        else {
                            const index = modelData.findIndex((m: { name: string; }) => m.name == asset.name);
                            modelData[index] = asset;
                        }

                    }
                    const put = ModelStore.put({
                        id: category,
                        data: modelData
                    });
                    put.onsuccess = e => {
                        resolve();
                        db.close();
                    }
                }
                savedModel.onerror = e => {
                    toast.error(<TranslateText contentData={ "resourcesManager.resources.notifications.model.saveFailed"} />);
                    reject("Error merging resources update: ModelStore.put failed");
                }

        }
    }
});
}

export { installModel };