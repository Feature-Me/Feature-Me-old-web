import JSZip from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../database/databaseInfo.json";
import compareVersions from "compare-versions";
import React from "react";
import TranslateText from "../TranslateText/translateText";

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



function fetchResourcesUpdate() {
    return new Promise<string>((resolve, reject) => {
        toast.info(<TranslateText contentData={"resourcesManager.resources.notifications.downloading"} />);
        fetch("/update/map", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            Promise.all([fetchModelUpdate(res.model), fetchMusicUpdate(res.music)]).then(() => {
                toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.initialized"} />);
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
    return new Promise<string>(async (resolve, reject) => {
        toast.info(<TranslateText contentData={"resourcesManager.resources.notifications.model.downloading"} />);
        if (!versionMap) {
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }
        const fetchUrl = [];
        if (!JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.initialized) fetchUrl.push(`resources/model/${versionMap.initial}.fm3d`);
        for (const version in versionMap) {
            if (version == "initial") continue;
            if (compareVersions(versionMap[version], JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.version) == 1) fetchUrl.push(`resources/model/${versionMap[version]}.fm3d`);
        }
        
        if (fetchUrl.length == 0) {
            toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.noupdate"} />);
            resolve("No update");
            return;
        }
        for (const version of fetchUrl) {
            fetch(version!, {
                method: "GET",
                headers: {
                    "Content-Type": "application/zip"
                }
            }).then(res => res.arrayBuffer()).then(res => {
                JSZip.loadAsync(res).then(zip => {
                    if (!zip.file("FileMap.json")) {
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notificationsmodel.noFileMap"} />);
                        reject("Error fetching resources update: FileMap.json not found");
                    }
                    else {
                        try {
                            zip.file("FileMap.json").async("string").then(async res => {
                                const fileMap = JSON.parse(res);
                                const assets:assets = {};
                                for (const category in fileMap) {
                                    if (category == "version") continue;
                                    for (const content of fileMap[category]) {
                                        content as contentData;
                                        if (!assets[category]) assets[category] = []
                                        assets[category].push({
                                            name: content.name,
                                            data: await zip.file(content.src).async("arraybuffer")
                                        })
                                    }
                                }
                                
                                const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
                                dbOpenRequest.onsuccess = e => {
                                    const db = dbOpenRequest.result;
                                    const ModelStore = db.transaction(databaseInfo.modelStore, "readwrite").objectStore(databaseInfo.modelStore);
                                    for (const category in assets) {
                                        console.log(category,assets[category]);
                                        
                                        ModelStore.put({id:category,data:assets[category]});
                                    }
                                    db.close();
                                    resolve("Successfully updated model");
                                }

                            })
                        } catch (error) {
                            toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.model.extractFailed"} />} : ${error}`);
                            reject(error);
                        }
                    }
                });
            }).catch(err => {
                console.log(err);
                toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} />}: ${err.message}`);
            })
        }
    })
}
function fetchMusicUpdate(versionMap: versionMap) { }

export default fetchResourcesUpdate;