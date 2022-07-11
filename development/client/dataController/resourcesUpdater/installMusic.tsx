import getMimeFromFileName from "functions/getMime/getMime";
import JSZip from "jszip";
import {match} from "ts-pattern"
import databaseInfo from "../../global/databaseInfo.json";

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

interface DirectingTextMap{
    type: "text"
    lngfiles:{
        [key:string]:string;
    }
    fallback:string;
}

interface musicMap{
    name:string;
    src:string;
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
    demo:{
        start:number;
        end:number;
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


interface musicData{
    name:string;
    data:ArrayBuffer;
    mime: string;
}

interface difficultyData {
    name: difficulties;
    level: number;
    constant: number;
    chartDesigner: string;
}
interface chartData{
    name: difficulties;
    data: string;
}
interface DirectingText{
    type:"text";
    data: {
        [key:string]:string;
    };
    fallback:string;
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
        demo:{
            start:number;
            end:number;
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
    directing: Array<directings>|null;
    behavior: ArrayBuffer | null;
    music: Array<musicData>
    chart: Array<chartData>
}


async function parseMusiccollection(zip: JSZip) {
    return new Promise<void>(async (resolve, reject) => {
        const folders = JSON.parse(await zip.file("FileMap.json").async("string"))
        let promises = [];
        for (const folder of folders.folders) {
            const zipFilter = zip.filter(path => path.startsWith(folder));
            const zipFolder = new JSZip();
            for (const file of zipFilter) {
                if (file.dir) continue;

                zipFolder.file(file.name.replace(folder + "/", ""), await file.async("arraybuffer"));
            }
            promises.push(installMusic(zipFolder));
        }
        await Promise.all(promises);
        resolve();
    })
}


async function installMusic(zip: JSZip) {
    return new Promise<void>(async (resolve, reject) => {
        if (!zip.file("FileMap.json")) {
            console.error("Error installing music: FileMap.json not found");
            resolve();
        }

        const fileMapJsonData:MusicAssetMap = JSON.parse(await zip.file("FileMap.json").async("string"));

        const musicData: MusicAssetContents = {
            metadata: {
                title: fileMapJsonData.title,
                composer: fileMapJsonData.composer,
                bpm: fileMapJsonData.bpm,
                time: fileMapJsonData.time,
                demo: fileMapJsonData.demo,
                license: fileMapJsonData.license,
                thumbnail: {
                    data: await zip.file(fileMapJsonData.thumbnail).async("arraybuffer"),
                    mime: getMimeFromFileName(fileMapJsonData.thumbnail)
                },
                selectedMusic: fileMapJsonData.defaultMusic,
                defaultMusic: fileMapJsonData.defaultMusic,
                background: fileMapJsonData.backgroundData && fileMapJsonData.defaultBackground ?
                    {
                        type: fileMapJsonData.defaultBackground,
                        data: await zip.file(fileMapJsonData.backgroundData).async("arraybuffer"),
                        mime: getMimeFromFileName(fileMapJsonData.backgroundData)
                    } : null,
                difficulties: [],
            },
            behavior: fileMapJsonData.behavior ? await zip.file(fileMapJsonData.behavior).async("arraybuffer") : null,
            music: [],
            chart: [],
            directing: []

        }

        for (const music of fileMapJsonData.music) {
            const musicFile = await zip.file(music.src).async("arraybuffer");
            musicData.music.push({
                name: music.name,
                data: musicFile,
                mime: getMimeFromFileName(music.src)
            })
        }

        for (const difficulty of fileMapJsonData.difficulties) {
            const chartFile = await zip.file(difficulty.chartFile).async("string");
            musicData.chart.push({
                name: difficulty.name,
                data: chartFile
            })

            const metadata = difficulty
            delete metadata.chartFile;
            musicData.metadata.difficulties.push(metadata);
        }
        if(fileMapJsonData.directing){
            for (const directing of fileMapJsonData.directing) {
                if(directing.type == "text"){
                    const data:DirectingText = {
                        type: directing.type,
                        data: {},
                        fallback: directing.fallback
                    }
                    for (const file in directing.lngfiles) {
                        data.data[file] = await zip.file(directing.lngfiles[file]).async("string");
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
            put.onsuccess =  e => {
                console.log("Successfully installed music: " + musicData.metadata.title);
                resolve();
            }
        }
        
    })
}

export { parseMusiccollection, installMusic };
export type {MusicAssetContents};