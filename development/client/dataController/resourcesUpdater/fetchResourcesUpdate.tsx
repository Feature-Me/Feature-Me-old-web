import JSZip from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../../global/databaseInfo.json";
import compareVersions from "compare-versions";
import React from "react";
import TranslateText from "../../global/TranslateText/translateText";
import filesize from "filesize";

type versionMap = {
    [key: string]: string;
    version: string
}

type assets = {
    [key: string]: Array<modelAssetContents>;
}

type modelAssetContents = {
    name: string,
    data: ArrayBuffer | { [key: string]: ArrayBuffer },
    size: number
    alt?: ArrayBuffer,
}

type modelContentData = {
    [key: string]: string | {};
    name: string;
    src: string | { [key: string]: string };
    alt?: string;
}

type Musiccollection = {
    folders: Array<string>;
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
                                    version: compareVersions(versionMap.version, latestVersion) == 1 ? versionMap.version : latestVersion
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

async function installModel(zip:JSZip) {
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
                    console.log(key, content.src[key],dataContent);
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

            await new Promise<void>((resolve, reject) => {
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

                    }
                }
                savedModel.onerror = e => {
                    toast.error(<TranslateText contentData={"resourcesManager.resources.notifications.model.saveFailed"} />);
                    reject("Error merging resources update: ModelStore.put failed");
                }

            })

        }
        db.close();
    }
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
                            await parseMusiccollection(zip);
                            if(i == fetchUrl.length - 1){
                                ResourcesDownloaded.music = {
                                    initialized: true,
                                    version: compareVersions(versionMap.version, latestVersion) == 1 ? versionMap.version : latestVersion
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

async function parseMusiccollection(zip:JSZip){
    return new Promise<void>(async (resolve, reject) => {
            const folders = JSON.parse(await zip.file("FileMap.json").async("string"))
            let promises = [];
            for (const folder of folders.folders) {
                const zipFilter = zip.filter(path => path.startsWith(folder));
                const zipFolder = new JSZip();
                for (const file of zipFilter) {
                    if(file.dir) continue;

                    zipFolder.file(file.name.replace(folder+"/",""), await file.async("arraybuffer"));
                }
                promises.push(installMusic(zipFolder));
            }
            await Promise.all(promises);
    })
}

async function installMusic(zip:JSZip){
    return new Promise<void>(async (resolve, reject) => {
        console.log(zip);
        if(!zip.file("FileMap.json")){
            console.error("Error installing music: FileMap.json not found");
            resolve();
        }

        const fileMapJsonData = JSON.parse(await zip.file("FileMap.json").async("string"));

        const musicData = {
            name: fileMapJsonData.name,
            composer: fileMapJsonData.composer,
            bpm: fileMapJsonData.bpm,
            time: fileMapJsonData.time,
            license: fileMapJsonData.license,
            thumbnail: await zip.file(fileMapJsonData.thumbnail).async("arraybuffer"),
            behavior: fileMapJsonData.behavior ? await zip.file(fileMapJsonData.behavior).async("arraybuffer") : null,
            music: {} as { [key: string]: ArrayBuffer },
            difficulties: {
                memory:null,
                advance:null,
                prospects:null,
                ozma:null,
            } as { [key: string] :{}}


        }

        for (const musicName in fileMapJsonData.music){
            const musicFile = await zip.file(fileMapJsonData.music[musicName]).async("arraybuffer");
            musicData.music[musicName] = musicFile;
        }
        for (const chart in fileMapJsonData.difficulties){
            console.log(chart);
            
            const chartData = {
                level: fileMapJsonData.difficulties[chart].level,
                constant : fileMapJsonData.difficulties[chart].constant,
                chartDesigner: fileMapJsonData.difficulties[chart].chartDesigner,
                offset : fileMapJsonData.difficulties[chart].offset,
                chart: await zip.file(fileMapJsonData.difficulties[chart].chartFile).async("string"),
            }
            musicData.difficulties[chart] = chartData;
        }

    })
}

export default fetchResourcesUpdate;
export { installModel,parseMusiccollection,installMusic };