import getMimeFromFileName from "../../getMime/getMime";
import JSZip from "jszip";
import { match } from "ts-pattern"
import databaseInfo from "../../../Config/databaseinfo.json";

type Musiccollection = {
    folders: Array<string>;
}

type difficulties = "memory" | "advance" | "prospects" | "ozma"

interface MusicAssetMapDifficulty {
    name: difficulties;
    chartFile: string;
    level: number;
    constant: number;
    chartDesigner: string;
}
interface MusicAssetMapMetadata {
    name: difficulties;
    chartFile?: string;
    level: number;
    constant: number;
    chartDesigner: string;
}

interface DirectingTextMap {
    type: "text"
    lngfiles: {
        [key: string]: string;
    }
    fallback: string;
}

interface musicMap {
    name: string;
    src: string;
}

type directingsMap = DirectingTextMap;

interface MusicAssetMap {
    title: string;
    composer: string;
    bpm: {
        max: number;
        min: number;
        display: string;
    }
    time: {
        ms: number;
        display: string;
    }
    demo: {
        start: number;
        end: number;
    }
    backgroundData?: string | null;
    defaultBackground?: string;
    behavior?: string | null;
    license?: string;
    thumbnail: string;
    defaultMusic?: string;
    music: Array<musicMap>
    directing?: Array<directingsMap>
    difficulties: Array<MusicAssetMapDifficulty>


}


interface musicData {
    name: string;
    data: ArrayBuffer;
    mime: string;
}

interface difficultyData {
    name: difficulties;
    level: number;
    constant: number;
    chartDesigner: string;
}
interface chartData {
    name: difficulties;
    data: string;
}
interface DirectingText {
    type: "text";
    data: {
        [key: string]: string;
    };
    fallback: string;
}
type directings = DirectingText

interface MusicAssetContents {
    metadata: {
        title: string;
        composer: string;
        bpm: {
            max: number;
            min: number;
            display: string;
        }
        time: {
            ms: number;
            display: string;
        }
        demo: {
            start: number;
            end: number;
        }
        license: string;
        thumbnail: {
            data: ArrayBuffer;
            mime: string;
        }
        defaultMusic: string;
        selectedMusic: string;
        background: {
            type: string,
            data: ArrayBuffer;
            mime: string;
        } | null

        difficulties: Array<difficultyData>;
    }
    directing: Array<directings> 
    behavior: ArrayBuffer
    music: Array<musicData>
    chart: Array<chartData>
}




function installMusic(zip: JSZip) {
    return new Promise<void>(async (resolve, reject) => {
        if (!zip.file("FileMap.json")) {
            console.error("Error installing music: FileMap.json not found");
            resolve();
        }

        const fileMapJsonData: MusicAssetMap = JSON.parse(await zip.file("FileMap.json")!.async("string"));


        const musicData: MusicAssetContents = {
            metadata: {
                title: fileMapJsonData.title,
                composer: fileMapJsonData.composer,
                bpm: fileMapJsonData.bpm,
                time: fileMapJsonData.time,
                demo: fileMapJsonData.demo,
                license: fileMapJsonData.license||"",
                thumbnail: {
                    data: await zip.file(fileMapJsonData.thumbnail)?.async("arraybuffer") || new ArrayBuffer(0),
                    mime: getMimeFromFileName(".png"/* fileMapJsonData.thumbnail */)||"image/png",
                },
                defaultMusic: fileMapJsonData.defaultMusic || fileMapJsonData.music[0].name,
                selectedMusic: fileMapJsonData.defaultMusic || fileMapJsonData.music[0].name,
                background: fileMapJsonData.backgroundData && fileMapJsonData.defaultBackground ?
                    {
                        type: fileMapJsonData.defaultBackground,
                        data: await zip.file(fileMapJsonData.backgroundData)?.async("arraybuffer") || new ArrayBuffer(0),
                        mime: getMimeFromFileName(".png"/* fileMapJsonData.backgroundData */) || "image/png"
                    } : null,
                difficulties: [],
            },
            behavior: fileMapJsonData.behavior ? await zip.file(fileMapJsonData.behavior)?.async("arraybuffer") || new ArrayBuffer(0): new ArrayBuffer(0),
            music: [],
            chart: [],
            directing: []

        }

        for (const music of fileMapJsonData.music) {
            musicData.music.push({
                name: music.name,
                data: await zip.file(music.src)?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMimeFromFileName(".mp3"/* music.src */)
            })
        }

        for (const difficulty of fileMapJsonData.difficulties) {
            const chartFile = await zip.file(difficulty.chartFile)?.async("string") || "";
            musicData.chart.push({
                name: difficulty.name,
                data: chartFile
            })

            const metadata:MusicAssetMapMetadata = difficulty
            delete metadata.chartFile;
            musicData.metadata.difficulties.push(metadata);
        }
        if (fileMapJsonData.directing) {
            for (const directing of fileMapJsonData.directing) {
                if (directing.type == "text") {
                    const data: DirectingText = {
                        type: directing.type,
                        data: {},
                        fallback: directing.fallback
                    }
                    for (const file in directing.lngfiles) {
                        data.data[file] = await zip.file(directing.lngfiles[file])?.async("string") || "";
                    }
                    musicData.directing.push(data)
                }
            }
        }

        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = async e => {
            const db = dbOpenRequest.result;
            const musicStore = db.transaction(databaseInfo.musicStore, "readwrite").objectStore(databaseInfo.musicStore);

            const put = musicStore.put({
                id: musicData.metadata.title,
                data: musicData
            });
            put.onsuccess = e => {
                console.log("Successfully installed music: " + musicData.metadata.title);
                resolve();
            }
        }

    })
}

export { installMusic };
export type { MusicAssetContents };