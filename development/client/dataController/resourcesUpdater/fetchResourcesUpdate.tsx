import JSZip from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../../global/databaseInfo.json";
import compareVersions from "compare-versions";
import React from "react";
import TranslateText from "../../global/TranslateText/translateText";
import filesize from "filesize";
import { installModel } from "./installModel";
import { parseMusiccollection } from "./installMusic";

type versionMap = {
    [key: string]: string;
    version: string
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
        //toast.info(<TranslateText contentData={"resourcesManager.resources.notifications.model.downloading"} />);
        if (!versionMap) {
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }

        const fetchUrl = [];
        let latestVersion: string = ResourcesDownloaded.model.version;
        let downloadCount = 0;
        let downloadSize = 0;
        if (!JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.initialized) fetchUrl.push(versionMap.initialResources);
        for (const version in versionMap) {
            if (version == "initialResources") continue;
            if (compareVersions(versionMap[version], JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.version) == 1) fetchUrl.push(versionMap[version]);
        }

        if (fetchUrl.length == 0) {
            // toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.noupdate"} />);
            resolve(0);
            return;
        }
        //const version of fetchUrl
        for (let i = 0; i < fetchUrl.length; i++) {
            const version = fetchUrl[i];
            await fetch(version, {
                method: "GET",
                headers: {
                    "Content-Type": "application/zip",
                },
                redirect: "follow",
                mode: "cors"
            }).then(res=>{if(res.ok) return res.arrayBuffer();else{throw new Error(res.statusText)}}).then(res => {
                downloadCount++;
                downloadSize += res.byteLength;
                JSZip.loadAsync(res).then(async zip => {
                    
                    if (!zip.file("FileMap.json")) {
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notificationsmodel.music.noFileMap"} />);
                        reject("Error fetching resources update: FileMap.json not found");
                    }
                    else {
                        try {
                            const fileMap = JSON.parse(await zip.file("FileMap.json").async("string"));
                            await installModel(zip)
                            if (i == fetchUrl.length - 1) {
                                //toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.updated"} start={downloadCount.toString()} />);
                                ResourcesDownloaded.model = {
                                    initialized: true,
                                    version: compareVersions(fileMap.version, latestVersion) == 1 ? fileMap.version : latestVersion
                                }
                                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                                resolve(downloadSize);
                            }
                        }
                        catch (error) {
                            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.model.extractFailed"} />);
                            console.log(error);
                            
                            reject(error);
                        }
                    }
                });
            }).catch(err => {
                console.log(err);
                toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} end={err} />);
            })
            /* if (i == fetchUrl.length - 1) {
                //toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.updated"} start={downloadCount.toString()} />);
                ResourcesDownloaded.model = {
                    initialized: true,
                    version: latestVersion
                }
                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                resolve(downloadSize);
            } */
        }
    })
}

function fetchMusicUpdate(versionMap: versionMap) {
    const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
    return new Promise<number>(async (resolve, reject) => {
        if(!versionMap){
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }

        const fetchUrl = [];
        let latestVersion: string = ResourcesDownloaded.music.version;
        let downloadCount = 0;
        let downloadSize = 0;
        if(!JSON.parse(localStorage.getItem("ResourcesDownloaded")!).music.initialized) fetchUrl.push(versionMap.initialResources);
        
        for(const version in versionMap){
            if(version == "initialResources") continue;
            if(compareVersions(version, latestVersion) == 1) fetchUrl.push(versionMap[version]);
        }

        if(fetchUrl.length == 0){
            resolve(0);
            return;
        }

        for(let i = 0; i<fetchUrl.length; i++){
            const version = fetchUrl[i];
            await fetch(version,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                mode: "cors"
            }).then(res=>{if(res.ok) return res.arrayBuffer(); else throw new Error(res.statusText);}).then(res => {
                downloadCount++;
                downloadSize += res.byteLength;
                JSZip.loadAsync(res).then(async zip => {

                    if(!zip.file("FileMap.json")){
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.music.noFileMap"} />);
                        reject("Error fetching resources update: FileMap.json not found");
                    }
                    else {
                        try {
                            const fileMap = JSON.parse(await zip.file("FileMap.json").async("string"));
                            await parseMusiccollection(zip);
                            if(i == fetchUrl.length - 1){
                                ResourcesDownloaded.music = {
                                    initialized: true,
                                    version: compareVersions(fileMap.version, latestVersion) == 1 ? fileMap.version : latestVersion
                                }
                                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                                resolve(downloadSize);
                            }
                        } catch (error) {
                            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.music.extractFailed"}/>);
                            console.log(error);
                            reject(error);
                        }
                    }
                });
            })
            .catch(err => {
                console.log(err);
                toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} end={err} />);
            })
        }


    });
}


export default fetchResourcesUpdate;
