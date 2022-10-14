import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import databaseInfo from "Config/databaseinfo.json";

function createNewProject() {
    const ns = uuidv4()
    const uuid = uuidv5(String(Date.now()), ns);

    const newChartProject: chartProjectType = {
        name: `Untitled Project ${uuid}`,
        type: "chart",
        id: uuid,
        metadata: {
            bpm: 0,
            composer: "",
            license: "",
            thumbnail: new ArrayBuffer(0),
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
            { name: "memory", level: 0, constant: 0, data: "" },
            { name: "advance", level: 0, constant: 0, data: "" },
            { name: "prospects", level: 0, constant: 0, data: "" },
            { name: "ozma", level: 0, constant: 0, data: "" }
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