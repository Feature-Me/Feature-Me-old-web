//@ts-nocheck
import JSZip from "jszip";
import { toast } from "react-toastify";
import databaseInfo from "../database/databaseInfo.json";

type typeSets = {
    id: string,
    contents: Array<contentsData>
}

type contentsData = {
    name: string,
    data: ArrayBuffer
}

function fetchResourcesUpdate(){
    fetch("/update/map",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res=>res.json()).then(res=>{
        
        fetchModelUpdate(res.model);
        fetchMusicUpdate(res.music);
    }).catch(err=>{
        console.log(err);
        toast.error(`Error fetching resources update: ${err.message}`);
    })

}

function fetchModelUpdate(url:string) {
     if(!url) {
        toast.error("No model update available");
        return;
    }
    const fetchUrl = [];
    if (!JSON.parse(localStorage.getItem("ResourcesDownloaded")!).model) fetchUrl.push(`resources/model/${url.initial}.fm3d`);
     for(const url of fetchUrl){
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
                         const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
                         dbOpenRequest.onsuccess = () => {
                         }
                         dbOpenRequest.onupgradeneeded = () => {
                             const db = dbOpenRequest.result;
                             const ModelStore = db.createObjectStore(databaseInfo.modelStore, { keyPath: "id" });
                             for (const type in map) {
                                 if (type == "version") continue;
                                 let typeSets: typeSets = {
                                     id: type,
                                     contents!: []
                                 }
                                 for (const content of map[type]) {
                                     zip.file(content.src)!.async("arraybuffer").then(res => res).then(res => {
                                         typeSets.contents.push({
                                             name: content.name,
                                             data: res
                                         });
                                     })
                                 }
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
function fetchMusicUpdate(url:string) {
    
}


export default fetchResourcesUpdate;