import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import databaseInfo from "Config/databaseinfo.json"
import { useSetRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";

const ChartLoader: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params["id"];
    const setChartProject = useSetRecoilState(chartProjectState);


    const getChart = React.useMemo(async () => {
        let chartProject: chartProjectType = {
            name: "",
            type: "chart",
            metadata: {
                bpm: 0,
                composer: "",
                license: "",
                thumbnail: new ArrayBuffer(0),
                time: 0,
                demo:{
                    start:0,
                    end:0
                },
                created: 0,
                saved: 0,
                defaultMusic:""
            },
            music: [],
            chart: [],
            id: ""
        };
        if (!id) throw new Error("chart id is invalid.")
        await new Promise<void>((resolve, reject) => {
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = () => {
                const db = dbOpenRequest.result;
                const editorStore = db.transaction(databaseInfo.editorStore, "readonly").objectStore(databaseInfo.editorStore);
                const get = editorStore.get(id)
                get.onsuccess = () => {
                    chartProject = get.result as chartProjectType;
                    resolve()
                }
                get.onerror = () => {
                    reject("could not load project.")
                }
            }
        })
        return chartProject;
    }, []);

    React.useEffect(() => {
        getChart.then(project => {
            setChartProject({project,page:"overview"});
            navigate("../edit/overview")
        }).catch((error) => {
            console.error(error);
            navigate(-1)
        })
    }, [])

    return <span>Loading</span>
}

export default ChartLoader;