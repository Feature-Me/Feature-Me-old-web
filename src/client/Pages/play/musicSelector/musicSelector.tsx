import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

import sceneChangerState from "State/sceneChanger/sceneChangerstate";
import musicSelectorState from "State/musicSelector/musicSelectorState";
import Header from "Block/head/head";
import MusicListContent from "./musicListContent/musicListContent";

import databaseInfo from "Config/databaseinfo.json";

import style from "./musicSelector.scss";
import MusicDetails from "./musicDetailsPane/musicDetails";




const MusicSelector: React.FC = () => {
    const setSceneChanger = useSetRecoilState(sceneChangerState);
    const [musicSelector, setMusicSelector] = useRecoilState(musicSelectorState);
    const [translation, i18n] = useTranslation();
    const musicListRef = React.useRef<HTMLDivElement>(null);
    const [showList, setShowList] = React.useState<Array<MusicAssetContents>>([]);
    const [musicIndex, setMusicIndex] = React.useState<number>(0);
    let indexFlag = false;

    const musicData = React.useMemo(async () => {
        let musicData: Array<MusicAssetContents> = [];
        await new Promise<void>((resolve, reject) => {
            const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
            dbOpenRequest.onsuccess = (event) => {
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
                                    musicData.push(musicAsset.data);
                                    if (i == musicNames.length - 1) {
                                        musicData.sort();
                                        musicData.unshift(musicData.splice(musicData.findIndex(music => music.metadata.title == "Tutorial"), 1)[0])
                                        resolve();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return musicData;
    }, []).then(musicData => musicData);

    React.useEffect(() => {
        (async () => {
            const data = await musicData;
            if (data) {
                if (musicSelector.search == "") {
                    setShowList(data);
                } else {
                    setShowList(data.filter(music => music.metadata.title.toLowerCase().includes(musicSelector.search.toLowerCase())) || []);
                }
            }
        })()
    }, [musicSelector.search])

    React.useEffect(() => {
        if (!indexFlag) {
            indexFlag = true;
            return;
        }
        setMusicSelector(data => {
            return {
                ...data,
                selectedMusic: showList[musicIndex],
                selectedName: showList[musicIndex]?.metadata?.title
            }
        })
    }, [musicIndex])

    React.useEffect(() => {
        document.title = `Select Music - Feature Me`;
    }, [])



    return (
        <div className={style.musicselect}>
            <Header title="Select Music" />
            <div className={style.selector_container}>
                <div className={style.list_container}>
                    <div className={style.search}>
                        <label htmlFor='musicselect-search'>{translation("musicSelect.search")}</label>
                        <input id='musicselect-search' type="text" value={musicSelector.search} onChange={(e) => setMusicSelector(data => { return { ...data, search: e.target.value } })} />
                    </div>
                    <div className={style.musiclist} ref={musicListRef}>
                        {
                            showList.map(data => {
                                return (
                                    <MusicListContent data={data} key={data.metadata.title} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={style.details}>
                    <MusicDetails />
                </div>
            </div>
        </div>
    )
}

export default MusicSelector;