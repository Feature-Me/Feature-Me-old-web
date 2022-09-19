import Head from "Block/head/head";
import React from "react";

import databaseInfo from "Config/databaseinfo.json";

import style from "./musicRoom.scss"
import { useRecoilState } from "recoil";
import musicRoomState from "State/musicRoom/musicRoom";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";


const MusicRoom:React.FC<{}> =  () =>{
    const [musicRoom,setMusicRoom] = useRecoilState(musicRoomState)
    

    const musics = React.useMemo(async ()=>{
        let musicData:Array<MusicRoomCategories> = []
        await new Promise<void>((resolve,reject)=>{
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = (e) => {
                const db = dbOpenRequest.result;
                const musicStore = db.transaction(databaseInfo.musicStore,"readonly").objectStore(databaseInfo.musicStore);
                const musics = musicStore.getAllKeys();
                musics.onsuccess = e => {
                    const musicNames = musics.result;
                    if (musicNames) {
                        for (let i = 0; i < musicNames.length; i++) {
                            const data = musicStore.get(musicNames[i]);
                            data.onsuccess = e => {
                                const musicAsset = data.result as { name: string, data: MusicAssetContents };
                                if (musicAsset) {
                                    const category:MusicRoomCategories = {
                                        data: [],
                                        thumbnail: musicAsset.data.metadata.thumbnail,
                                        title: musicAsset.data.metadata.title,
                                        composer:musicAsset.data.metadata.composer
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

    },[]).then(musicData=>musicData);

    React.useEffect(()=>{
        musics.then(music=>{
            music.splice(music.findIndex(m => m.title == "Tutorial"), 1)
            setMusicRoom(room=>{
                return{
                    ...room,
                    musicList:music
                }
            })
        })
    },[])

    return(
    <div className={style.musicroom}>
        <Head title={"Music room"}/>
        <div className={style.musicList}>
            <div className={style.categories}>
                {
                    musicRoom.musicList.map((music,categoryIndex)=>{
                        
                        return(
                        <div className={style.category} key={categoryIndex}>
                            <h3>{music.title} - {music.composer}</h3>
                            <hr />
                            <div className={style.categorycontent}>
                                    <div className={style.thumbnail} style={{ backgroundImage: `url(data:${music.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(music.thumbnail.data)})`}}></div>
                                <div>
                                        {
                                            music.data.map((data, musicIndex) => {
                                                return (
                                                    <p key={musicIndex}>{data.name}</p>
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

        </div>

    </div>
    )
}

export default MusicRoom;