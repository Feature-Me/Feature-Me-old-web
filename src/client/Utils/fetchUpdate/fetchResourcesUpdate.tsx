import JSZip from "jszip";
import { toast } from "react-toastify";
import compareVersions from "compare-versions";
import React from "react";
import filesize from "filesize";

import TranslateText from "../../Components/TranslateText/TranslateText";
import { installBackground } from "../installResources/backgroundResources/installBackground";
import databaseInfo from "../../Config/databaseInfo.json";
import { parseMusicCollection } from "../installResources/musicResources/parseMusicCollection";
import { installBehavior } from "../installResources/behaviorResources/installBehavior";


type versionMap = {
    [key: string]: { url: string, size: number, hash: string }
}

interface updateMap {
    background: versionMap
    behavior: versionMap
    music: versionMap
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
        }).then(res => res.json() as Promise<updateMap>).then(res => {
            Promise.all([
                fetchBackgroundUpdate(res.background),
                fetchBehaviorUpdate(res.behavior),
                fetchMusicUpdate(res.music)
            ]).then(values => {
                const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
                for (const name of values) {
                    if (name[2]) {
                        ResourcesDownloaded[name[2]] = {
                            initialized: true,
                            version: name[1]
                        }
                    }
                }
                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));

                resolve("Successfully initialized resources");
            }).catch(err => {
                console.error(err);
            })
        }).catch(err => {
            console.log(err);
            toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} />}: ${err.message}`);
            reject(err);
        })
    })

}


function fetchBackgroundUpdate(versionMap: versionMap) {
    const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
    return new Promise<[number, string, string]>(async (resolve, reject) => {
        if (!versionMap) {
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }

        //download update from url list
        const fetchUrl = [];
        let latestVersion: string = ResourcesDownloaded.background.version;
        let downloadCount = 0;
        let downloadSize = 0;
        for (const version in versionMap) {
            //compare and download if newer
            if (version == "initialResources") continue;
            if (compareVersions(version, JSON.parse(localStorage.getItem("ResourcesDownloaded")!).background.version) == 1) fetchUrl.push(versionMap[version]);
        }

        if (fetchUrl.length == 0) {
            //if there is no update, resolve
            resolve([0, latestVersion, "background"]);
            return;
        }

        //const version of fetchUrl
        for (let i = 0; i < fetchUrl.length; i++) {
            const version = fetchUrl[i];
            await fetch(version.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/zip",
                },
                redirect: "follow",
                mode: "cors"
            }).then(res => { if (res.ok) return res.arrayBuffer(); else { throw new Error(res.statusText) } })
                .then(async res => {
                    //get hash
                    const hash = await window.crypto.subtle.digest("SHA-256", res);
                    const hashString = Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, "0")).join("");
                    if (hashString != version.hash) {
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.model.hashMismatch"} />);
                        return;
                    }

                    downloadCount++;
                    downloadSize += res.byteLength;

                    JSZip.loadAsync(res).then(async zip => {
                        //
                        if (!zip.file("FileMap.json")) {
                            toast.error(<TranslateText contentData={"resourcesManager.resources.notificationsmodel.music.noFileMap"} />);
                            //reject("Error fetching resources update: FileMap.json not found");
                            return;
                        }
                        else {
                            try {
                                const fileMap = JSON.parse(await zip.file("FileMap.json")!.async("string"));
                                await installBackground(zip)
                                if (i == fetchUrl.length - 1) {
                                    resolve([downloadSize, compareVersions(fileMap.version, latestVersion) == 1 ? fileMap.version : latestVersion, "background"]);
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
        }
    })
}

//below, logic is the same as background. Just changed the some variables and some other things.

function fetchBehaviorUpdate(versionMap: versionMap) {
    const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
    return new Promise<[number, string, string]>(async (resolve, reject) => {

        if (!versionMap) {
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }

        const fetchUrl = [];
        let latestVersion: string = ResourcesDownloaded.behavior.version;
        let downloadCount = 0;
        let downloadSize = 0;
        for (const version in versionMap) {
            if (version == "initialResources") continue;
            if (compareVersions(version, JSON.parse(localStorage.getItem("ResourcesDownloaded")!).behavior.version) == 1) fetchUrl.push(versionMap[version]);
        }

        if (fetchUrl.length == 0) {
            resolve([0, latestVersion, "behavior"]);
            return;
        }

        //const version of fetchUrl
        for (let i = 0; i < fetchUrl.length; i++) {
            const version = fetchUrl[i];
            await fetch(version.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/zip",
                },
                redirect: "follow",
                mode: "cors"
            }).then(res => { if (res.ok) return res.arrayBuffer(); else { throw new Error(res.statusText) } }).then(async res => {
                //get hash
                console.log(res);

                const hash = await window.crypto.subtle.digest("SHA-256", res);
                const hashString = Array.from(new Uint8Array(hash)).map(x => x.toString(16).padStart(2, "0")).join("");
                if (hashString != version.hash) {
                    toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.model.hashMismatch"} />);
                    return;
                }

                downloadCount++;
                downloadSize += res.byteLength;
                JSZip.loadAsync(res).then(async zip => {

                    if (!zip.file("FileMap.json")) {
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notificationsmodel.music.noFileMap"} />);
                        console.error("Error fetching resources update: FileMap.json not found");
                        reject("Error fetching resources update: FileMap.json not found");
                    }
                    else {
                        try {
                            const fileMap = JSON.parse(await zip.file("FileMap.json")!.async("string"));
                            await installBehavior(zip)
                            if (i == fetchUrl.length - 1) {
                                resolve([downloadSize, compareVersions(fileMap.version, latestVersion) == 1 ? fileMap.version : latestVersion, "behavior"]);
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
        }
    })
}

function fetchMusicUpdate(versionMap: versionMap) {
    const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
    return new Promise<[number, string, string]>(async (resolve, reject) => {
        if (!versionMap) {
            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.noMap"} />);
            reject();
            return;
        }

        const fetchUrl = [];
        let latestVersion: string = ResourcesDownloaded.music.version;
        let downloadCount = 0;
        let downloadSize = 0;

        for (const version in versionMap) {
            if (version == "initialResources") continue;
            if (compareVersions(version, latestVersion) == 1) fetchUrl.push(versionMap[version]);
        }

        if (fetchUrl.length == 0) {
            resolve([0, latestVersion, "music"]);
            return;
        }

        for (let i = 0; i < fetchUrl.length; i++) {
            const version = fetchUrl[i];
            await fetch(version.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                mode: "cors"
            }).then(res => { if (res.ok) return res.arrayBuffer(); else throw new Error(res.statusText); }).then(res => {
                downloadCount++;
                downloadSize += res.byteLength;
                JSZip.loadAsync(res).then(async zip => {

                    if (!zip.file("FileMap.json")) {
                        toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.music.noFileMap"} />);
                        reject("Error fetching resources update: FileMap.json not found");
                    }
                    else {
                        try {
                            const fileMap = JSON.parse(await zip.file("FileMap.json")!.async("string"));
                            await parseMusicCollection(zip);
                            if (i == fetchUrl.length - 1) {
                                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                                resolve([downloadSize, compareVersions(fileMap.version, latestVersion) == 1 ? fileMap.version : latestVersion, "music"]);
                            }
                        } catch (error) {
                            toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.music.extractFailed"} />);
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