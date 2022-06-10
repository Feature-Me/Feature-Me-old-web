//@ts-nocheck
import JSZip, { version } from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../database/databaseInfo.json";
import compareVersions from "compare-versions";
import { response } from "express";
import React from "react";
import TranslateText from "../TranslateText/translateText";

type typeSets = {
    id: string,
    contents: Array<contentsData>
}

type contentsData = {
    name: string,
    data: ArrayBuffer
}

function fetchResourcesUpdate() {
    return new Promise<string>((resolve, reject) => {
        toast.info(<TranslateText contentData={ "resourcesManager.resources.notifications.downloading" } />);
        fetch("/update/map", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            Promise.all([fetchModelUpdate(res.model), fetchMusicUpdate(res.music)]).then(() => {
                toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.initialized"} />);
                resolve();
            })
        }).catch(err => {
            console.log(err);
            toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.downloadingFailed"} />}: ${err.message}`);
            reject(err);
        })
    })

}

function fetchModelUpdate(versionMap: object) {
   return new Promise((resolve, reject) => {

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
                resolve();
                return;
         }

         

       for (const version of fetchUrl) {
           fetch(version!, {
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
                                           ModelStore.put(typeSets);
                                       }
                                   }
                                   db.close();
                                   toast.success(<TranslateText contentData={"resourcesManager.resources.notifications.model.updated"} />);
                                   const ResourcesDownloaded = JSON.parse(localStorage.getItem("ResourcesDownloaded")!);
                                   
                                   const newVersion = compareVersions(map.version, ResourcesDownloaded.model.version) == 1 ? map.version : ResourcesDownloaded.model.version;
                                   ResourcesDownloaded.model = {
                                       initialized: true,
                                       version: newVersion,
                                   }
                                   localStorage.setItem("ResourcesDownloaded", JSON.stringify(ResourcesDownloaded));
                                   resolve();
                               } catch (error) {
                                   console.error(error);
                                   toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.model.savingFailed"} />} : ${error}`);
                                      reject(error);
                               }
                           }
                       });
                   } else {
                       toast.error(<TranslateText contentData={"resourcesManager.resources.notificationsmodel.noFileMap"} />);
                       reject("Error fetching resources update: FileMap.json not found");
                   }
               }).catch(err => {
                   console.log(err);
                   toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.model.extractFailed"} />} : ${err}`);
                     reject(err);
               });
           }).catch(err => {
               console.log(err);
               toast.error(`${<TranslateText contentData={"resourcesManager.resources.notifications.model.downloadingFailed"} />} : ${err}`);
                reject(err);
           });
       }
    });
}
function fetchMusicUpdate(versionMap: string) {

}


export default fetchResourcesUpdate;