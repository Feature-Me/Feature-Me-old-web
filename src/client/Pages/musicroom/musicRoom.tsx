import Head from "Block/head/head";
import React from "react";

import databaseInfo from "Config/databaseinfo.json";

import style from "./musicRoom.scss"
import { useRecoilState, useRecoilValue } from "recoil";
import musicRoomState from "State/musicRoom/musicRoom";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import { MdQueue } from "react-icons/md";
import { Howl } from "howler";
import gameConfigState from "State/gameConfig/gameConfig";


const MusicRoom: React.FC<{}> = () => {
    const [musicRoom, setMusicRoom] = useRecoilState(musicRoomState)
    const gameConfig = useRecoilValue(gameConfigState);


    const musics = React.useMemo(async () => {
        let musicData: Array<MusicRoomCategories> = []
        await new Promise<void>((resolve, reject) => {
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = (e) => {
                const db = dbOpenRequest.result;
                const musicStore = db.transaction(databaseInfo.musicStore, "readonly").objectStore(databaseInfo.musicStore);
                const musics = musicStore.getAllKeys();
                musics.onsuccess = e => {
                    const musicNames = musics.result;
                    if (musicNames) {
                        for (let i = 0; i < musicNames.length; i++) {
                            const data = musicStore.get(musicNames[i]);
                            data.onsuccess = e => {
                                const musicAsset = data.result as { name: string, data: MusicAssetContents };
                                if (musicAsset) {
                                    const category: MusicRoomCategories = {
                                        data: [],
                                        thumbnail: musicAsset.data.metadata.thumbnail,
                                        title: musicAsset.data.metadata.title,
                                        composer: musicAsset.data.metadata.composer
                                    }
                                    for (const music of musicAsset.data.music) {
                                        category.data.push({
                                            data: {
                                                data: music.data,
                                                mime: music.mime,
                                            },
                                            name: music.name,
                                            category: category
                                        })
                                    }
                                    musicData.push(category)
                                    if (i == musicNames.length - 1) resolve();
                                }
                            }
                        }
                    }
                }
            }
        })
        return musicData

    }, []).then(musicData => musicData);

    React.useEffect(() => {
        musics.then(music => {
            music.splice(music.findIndex(m => m.title == "Tutorial"), 1)
            setMusicRoom(room => {
                return {
                    ...room,
                    musicList: music
                }
            })
        })
    }, [])

    React.useEffect(() => {
        const musicAudio = new Howl({
            src: `data:${musicRoom.playing?.data.mime || "audio/mp3"};base64,${arrayBufferToBase64(musicRoom.playing?.data.data || new ArrayBuffer(0))}`,
            volume: (gameConfig.audio.masterVolume * gameConfig.audio.musicVolume) || 1,
        })
        musicAudio.play();

        return () => {
            musicAudio.stop();
            musicAudio.unload();
        }
    }, [musicRoom.playing])

    function setQueue(music: MusicRoomContents, overwrite: boolean) {
        if (musicRoom.playList.length == 0) overwrite = true;
        if (overwrite) {
            setMusicRoom(room => {
                return {
                    ...room,
                    playList: [music],
                    playing: music,
                    playingIndex: 0
                }
            })
        } else {
            setMusicRoom(room => {
                return {
                    ...room,
                    playList: [...room.playList, music]
                }
            })
        }
    }

    return (
        <div className={style.musicroom}>
            <Head title={"Music room"} />
            <div className={style.musicList}>
                <div className={style.categories}>
                    {
                        musicRoom.musicList.map((music, categoryIndex) => {

                            return (
                                /* categories (Title and Composer will shown)*/
                                <div className={style.category} key={categoryIndex}>
                                    <h3>{music.title} - {music.composer}</h3>
                                    <hr />
                                    <div className={style.categorycontent}>
                                        {/* image */}
                                        <div className={style.thumbnail} style={{ backgroundImage: `url(data:${music.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(music.thumbnail.data)})` }}></div>

                                        {/* music name wrapper */}
                                        <div>
                                            {
                                                music.data.map((data, musicIndex) => {
                                                    return (
                                                        //music name. click to play
                                                        <div className={style.music} key={musicIndex} onClick={() => setQueue(data, true)}>
                                                            {data.name}
                                                            <div className={style.addQueue} onClick={(e) => { e.stopPropagation(); setQueue(data, false) }}>
                                                                <MdQueue />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className={style.playqueue}>
                    <h1>Play Queue</h1>
                </div>
            </div>
            <div className={style.musicController}>
                <div className={style.thumbnail} style={{ backgroundImage: `url(data:${musicRoom.playing?.category.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(musicRoom.playing?.category.thumbnail.data || new ArrayBuffer(0))})` }}></div>
                <div className={style.title}>
                    <span className={style.name}>{musicRoom.playing?.category.title||""} - {musicRoom.playing?.name||""}</span>
                    <span className={style.composer}>{musicRoom.playing?.category.composer||""}</span>
                </div>
            </div>

        </div>
    )
}

export default MusicRoom;