import databaseInfo from "Config/databaseinfo.json";
import { cloneDeep } from "lodash";

function saveChartProject (project:chartProjectType) {
    project = cloneDeep(project);
    const saveTime = Date.now();
    project.metadata.saved = saveTime;
    return new Promise<number>((resolve,reject) =>{
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName)
        dbOpenRequest.onsuccess = () => {
            const db = dbOpenRequest.result;
            const editorStore = db.transaction(databaseInfo.editorStore, "readwrite").objectStore(databaseInfo.editorStore)
            const put = editorStore.put(project)
            put.onsuccess = () => {
                resolve(saveTime)
            }
        }
        dbOpenRequest.onerror = () => {
            reject();
        }
    })
}

export default saveChartProject;