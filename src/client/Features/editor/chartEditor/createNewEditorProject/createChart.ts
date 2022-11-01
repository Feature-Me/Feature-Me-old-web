import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import databaseInfo from "Config/databaseinfo.json";

function createNewProject() {
    const uuid = uuidv5(String(Date.now()), uuidv4());

    const newChartProject: chartProjectType = {
        name: `Untitled Project ${uuid}`,
        type: "chart",
        id: uuid,
        metadata: {
            bpm: 0,
            composer: "",
            license: "",
            thumbnail: {
                data:new ArrayBuffer(0),
                mime:"image/png"
            },
            time: 0,
            demo: {
                start: 0,
                end: 0
            },
            created: Date.now(),
            saved: Date.now(),
            defaultMusic: ""
        },
        music: [],
        chart: [
            { name: "memory", level: 0, constant: 0, data: "", id: uuidv5(String(Date.now()), uuidv4()) },
            { name: "advance", level: 0, constant: 0, data: "", id: uuidv5(String(Date.now()), uuidv4()) },
            { name: "prospects", level: 0, constant: 0, data: "", id: uuidv5(String(Date.now()), uuidv4()) },
            { name: "ozma", level: 0, constant: 0, data: "", id: uuidv5(String(Date.now()), uuidv4()) }
        ]
    }

    return new Promise<string>((resolve, reject) => {
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName)
        dbOpenRequest.onsuccess = () => {
            const db = dbOpenRequest.result;
            const editorStore = db.transaction(databaseInfo.editorStore, "readwrite").objectStore(databaseInfo.editorStore)
            const put = editorStore.put(newChartProject)
            put.onsuccess = () => {
                resolve(newChartProject.id)
            }
        }
        dbOpenRequest.onerror = () => {
            reject();
        }
    })
}

export default createNewProject;