//@ts-nocheck
import JSZip, { version } from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../database/databaseInfo.json";
import compareVersions from "compare-versions";

type typeSets = {
    id: string,
    contents: Array<contentsData>
}

type contentsData = {
    name: string,
    data: ArrayBuffer
}

function fetchResourcesUpdate() {
    toast.info("Downloading resources update...");
    fetch("/update/map", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(res => {
        fetchModelUpdate(res.model);
        fetchMusicUpdate(res.music);
    }).catch(err => {
        console.log(err);
        toast.error(`Error downloading resources update: ${err.message}`);
    })

}

function fetchModelUpdate(versionMap: object) {
    console.log(versionMap);
    
    toast.info("Downloading model update...");
    if (!versionMap) {
        toast.error("No model update available");
        return;
    }
    const fetchUrl = [];
    if (!JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model) fetchUrl.push(`resources/model/${versionMap.initial}.fm3d`);
    for(const version in versionMap){
        if (version ==  "initial") continue;
        if (compareVersions(versionMap[version], JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model.version) == 1) fetchUrl.push(`resources/model/${versionMap[version]}.fm3d`);
    }
    for (const versionMap of fetchUrl) {
        fetch(fetchUrl!, {
            method: "GET",
            headers: {
                "Content-Type": "application/zip"
            }
        }).then(res => res.blob()).then(res => {
            JSZip.loadAsync(res).then(zip => {
                if (zip.file("FileMap.json")) {
                    zip.file("FileMap.json")!.async("string").then(res => {
                        const map = JSON.parse(res);
                        //let DBVersion = (localStorage.getItem("DBVersion") && Number(localStorage.getItem("DBVersion"))+1) || 1;
                        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
                        dbOpenRequest.onsuccess = (e) => {
                            //  localStorage.setItem("DBVersion", DBVersion.toString());
                            console.log("Database Connected");
                            try {
                                const db = dbOpenRequest.result;
                                const ModelStore = db.transaction(databaseInfo.modelStore, "readwrite").objectStore(databaseInfo.modelStore);

                                for (const type in map) {
                                    if (type == "version") continue;
                                    let typeSets: typeSets = {
                                        id: type,
                                        contents: []
                                    }
                                    for (const content of map[type]) {
                                        zip.file(content.src)!.async("arraybuffer").then(res => res).then(res => {
                                            typeSets.contents.push({
                                                name: content.name,
                                                data: res
                                            });
                                        })
                                        console.log(typeSets);
                                        ModelStore.put(typeSets);
                                    }
                                }
                                db.close();
                                toast.success("Model update downloaded");
                                const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
                                const newVersion = compareVersions(map.verison, ResourcesDownloaded.model.version) == 1 ? map.version : ResourcesDownloaded.model.version;
                                ResourcesDownloaded.model = {
                                    initialized: true,
                                    version: newVersion,
                                }
                                localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                            } catch (error) {
                                console.error(error);
                                toast.error(`Error in saving resources: ${error.message}`);
                            }
                        }
                    });
                } else {
                    toast.error("Error fetching resources update: FileMap.json not found");
                }
            }).catch(err => {
                console.log(err);
                toast.error(`Error extracting model package : ${err.message}`);
            });
        }).catch(err => {
            console.log(err);
            toast.error(`Error fetching model update: ${err.message}`);
        });
    }
}
function fetchMusicUpdate(versionMap: string) {

}


export default fetchResourcesUpdate;