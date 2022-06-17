import JSZip from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../database/databaseInfo.json";
import compareVersions from "compare-versions";
import React from "react";
import TranslateText from "../TranslateText/translateText";
import filesize from "filesize";

type versionMap = {
    [key: string]: string;
    version: string
}

type assets = {
    [key: string]: Array<assetContents>;
}

type assetContents = {
    name: string,
    data: ArrayBuffer
}

type contentData = {
    [key: string]: string;
    name: string;
    src: string;
}

function sumArray(array: Array<number>): number {
    return array.reduce((a, b) => a + b, 0);
}

function fetchResourcesUpdate() {
    return new Promise<string>((resolve, reject) => {
        toast.info(<TranslateText contentData={"resourcesManager.resources.notifications.downloading"} />);
        fetch("/update/map", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            Promise.all([fetchModelUpdate(res.model), fetchMusicUpdate(res.music)]).then(values => {
                toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.initialized"} end={`(${filesize(sumArray(values)).toString()})`} />);

                resolve("Successfully initialized resources");
            })
        }).catch(err => {
            console.log(err);
            toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} />}: ${err.message}`);
            reject(err);
        })
    })

}

function fetchModelUpdate(versionMap: versionMap) {
    const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
    return new Promise<number>(async (resolve, reject) => {
        toast.info(<TranslateText contentData={"resourcesManager.resources.notifications.model.downloading"} />);
        if (!versionMap) {
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }

        const fetchUrl = [];
        let latestVersion:string = ResourcesDownloaded.model.version;
        let downloadCount = 0;
        let downloadSize = 0;
        if (!JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.initialized) fetchUrl.push(`resources/model/${versionMap.initial}.fm3d`);
        for (const version in versionMap) {
            if (version == "initial") continue;
            if (compareVersions(versionMap[version], JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.version) == 1) fetchUrl.push(`resources/model/${versionMap[version]}.fm3d`);
        }

        if (fetchUrl.length == 0) {
            toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.noupdate"} />);
            resolve(0);
            return;
        }
        //const version of fetchUrl
        for (let i = 0; i < fetchUrl.length; i++) {
            const version = fetchUrl[i];
            await fetch(version!, {
                method: "GET",
                headers: {
                    "Content-Type": "application/zip"
                }
            }).then(res => res.arrayBuffer()).then(res => {
                downloadCount++;
                downloadSize += res.byteLength;
                JSZip.loadAsync(res).then(async zip => {
                    if (!zip.file("FileMap.json")) {
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notificationsmodel.noFileMap"} />);
                        reject("Error fetching resources update: FileMap.json not found");
                    }
                    else {
                        try {
                            const fileMap = await zip.file("FileMap.json").async("string");

                            const filemMapJsonData = JSON.parse(fileMap);
                            const assets: assets = {};
                            for (const category in filemMapJsonData) {
                                if (category == "version") continue;
                                for (const content of filemMapJsonData[category]) {
                                    content as contentData;
                                    if (!assets[category]) assets[category] = []
                                    assets[category].push({
                                        name: content.name,
                                        data: await zip.file(content.src).async("arraybuffer")
                                    })
                                }
                            }

                            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
                            dbOpenRequest.onsuccess = async e => {
                                const db = dbOpenRequest.result;
                                const ModelStore = db.transaction(databaseInfo.modelStore, "readwrite").objectStore(databaseInfo.modelStore);
                                for (const category in assets) {
                                    const savedModel = ModelStore.get(category);
                                    await new Promise<void>((resolve, reject) => {
                                        savedModel.onsuccess = e => {

                                            const modelData = savedModel.result?.data || [];
                                            for (const asset of assets[category]) {
                                                if(!modelData.find((m: { name: string; }) => m.name == asset.name)) modelData.push(asset);
                                                else {
                                                    const index = modelData.findIndex((m: { name: string; }) => m.name == asset.name);
                                                    modelData[index] = asset;
                                                }

                                            }
                                            ModelStore.put({
                                                id: category,
                                                data: modelData
                                            });
                                        }
                                        savedModel.onerror = e => {
                                            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.model.saveFailed"} />);
                                            reject("Error merging resources update: ModelStore.put failed");
                                        }
                                        latestVersion = compareVersions(filemMapJsonData.version, latestVersion) == 1 ? filemMapJsonData.version : latestVersion;
                                        resolve();
                                    })

                                }
                                db.close();
                            }
                        }
                        catch (error) {
                            toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.model.extractFailed"} />} : ${error}`);
                            reject(error);
                        }
                    }
                });
            }).catch(err => {
                console.log(err);
                toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} />}: ${err.message}`);
            })
            if (i == fetchUrl.length - 1) {
                toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.updated"} start={downloadCount.toString()} />);
                ResourcesDownloaded.model = {
                    initialized: true,
                    version: latestVersion
                }
                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                resolve(downloadSize);
            }
        }
    })
}
function fetchMusicUpdate(versionMap: versionMap) {
    return new Promise<number>(async (resolve, reject) => {
        setTimeout(() => {
            resolve(0);
        }, 0);
    });
}

export default fetchResourcesUpdate;