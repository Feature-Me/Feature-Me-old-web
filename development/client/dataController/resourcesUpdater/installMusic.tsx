import JSZip from "jszip";
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
    file:{
        [key:string]:string;
    }
    fallback:string;
}

interface musicMap{
    name:string;
    src:string

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
    demo: number;
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
        license: string;
        thumbnail: ArrayBuffer;
        defaultMusic: string;
        background: {
            type: string,
            data: ArrayBuffer;
        } | null

        difficulties: Array<difficultyData>;
    }
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
        console.log(zip);
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
                license: fileMapJsonData.license,
                thumbnail: await zip.file(fileMapJsonData.thumbnail).async("arraybuffer"),
                defaultMusic: fileMapJsonData.defaultMusic,
                background: fileMapJsonData.backgroundData && fileMapJsonData.defaultBackground ?
                    {
                        type: fileMapJsonData.defaultBackground,
                        data: await zip.file(fileMapJsonData.backgroundData).async("arraybuffer")
                    } : null,
                difficulties: [],
            },
            behavior: fileMapJsonData.behavior ? await zip.file(fileMapJsonData.behavior).async("arraybuffer") : null,
            music: [],
            chart: [],

        }

        for (const music of fileMapJsonData.music) {
            const musicFile = await zip.file(music.src).async("arraybuffer");
            musicData.music.push({
                name: music.name,
                data: musicFile
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