import JSZip from "jszip";
import json5 from "json5";

import databaseInfo from "Config/databaseinfo.json";
import getMimeFromFileName from "Utils/getMime/getMime";

function installMusic(zip: JSZip) {
    return new Promise<void|Error>(async (resolve, reject) => {

        //if there are any errors, resolve with error
        if (!zip.file("FileMap.json")) {
            console.error("Error installing music: FileMap.json not found");
            resolve(new Error("Error installing music: FileMap.json not found"));
        }

        const fileMapJsonData: MusicAssetMap = json5.parse(await zip.file("FileMap.json")!.async("string"));

        const musicData: MusicAssetContents = {
            metadata: {
                title: fileMapJsonData.title,
                composer: fileMapJsonData.composer,
                bpm: fileMapJsonData.bpm,
                time: fileMapJsonData.time,
                demo: fileMapJsonData.demo,
                license: fileMapJsonData.license || "",
                thumbnail: {
                    data: await zip.file(fileMapJsonData.thumbnail)?.async("arraybuffer") || new ArrayBuffer(0),
                    mime: getMimeFromFileName(fileMapJsonData.thumbnail) || "image/png",
                },
                defaultMusic: fileMapJsonData.defaultMusic || fileMapJsonData.music[0].name,
                selectedMusic: fileMapJsonData.defaultMusic || fileMapJsonData.music[0].name,
                background: fileMapJsonData.backgroundData && fileMapJsonData.backgroundType ?
                    {
                        type: fileMapJsonData.backgroundType,
                        data: await zip.file(fileMapJsonData.backgroundData)?.async("arraybuffer") || new ArrayBuffer(0),
                        mime: getMimeFromFileName(fileMapJsonData.backgroundData) || "image/png"
                    } : null,
                difficulties: [],
            },
            behavior: fileMapJsonData.behavior ? await zip.file(fileMapJsonData.behavior)?.async("arraybuffer") || new ArrayBuffer(0) : new ArrayBuffer(0),
            music: [],
            chart: [],
            directing: [],
            version: fileMapJsonData.version,
            made: fileMapJsonData.made,
            installedAt: Date.now()
        }

        for (const music of fileMapJsonData.music) {
            musicData.music.push({
                name: music.name,
                data: await zip.file(music.src)?.async("arraybuffer") || new ArrayBuffer(0),
                mime: getMimeFromFileName(music.src)
            })
        }

        for (const difficulty of fileMapJsonData.difficulties) {
            const chartFile = await zip.file(difficulty.chartFile)?.async("string") || "";
            musicData.chart.push({
                
                name: difficulty.name,
                data: chartFile
            })

            const metadata: MusicAssetMetadataMap = difficulty
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
        dbOpenRequest.onsuccess = e => {
            const db = dbOpenRequest.result;
            const musicStore = db.transaction(databaseInfo.musicStore, "readwrite").objectStore(databaseInfo.musicStore);

            const put = musicStore.put({
                name: musicData.metadata.title,
                data: musicData
            });
            put.onsuccess = e => {
                console.log("Successfully installed music: " + musicData.metadata.title);
                resolve();
            }
            put.onerror = e => {
                console.error("Error installing music: " + musicData.metadata.title);
                reject(new Error("Error installing music: " + musicData.metadata.title));
            }
        }

    })
}

export { installMusic };