import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import style from "./musicSelect.scss"

import gameData from 'dataController/gameData/gameData';
import musicSelectVar from '../musicSelectVariables';

import Head from 'global/head/head';
import switchPage from 'global/sceneChanger/swtchPage';
import MusicListContent from 'musicSelect/listContent/musicListContent';

const SelectMusic: React.FC<{ backFunc?: Function }> = (props) => {
    const [translation,i18n] = useTranslation();
    const backFunc = props.backFunc || function () { switchPage("play") }
    const [musicSelectVariables,setMusicSelectVariables] = useRecoilState(musicSelectVar);
    const musicListRef = React.useRef<HTMLDivElement>();
    
    window.addEventListener("scroll",updateX);
    React.useEffect(()=>{
        updateX();
        setMusicSelectVariables({...musicSelectVariables,musicList:gameData.musicData.all})
    },[])
    React.useEffect(()=>{
        updateX();
        setMusicSelectVariables({...musicSelectVariables,musicList:gameData.musicData.all.filter(data=>data.toLowerCase().includes(musicSelectVariables.search))})
    },[musicSelectVariables.search])
    function updateX() {
        musicListRef.current.querySelectorAll("div").forEach((e)=>{
            e.style.left = -e.offsetTop*0.16 + "px";
        });
    }
    return (
        <div className={style.musicselect}>
            <Head title='Select Music' backFunc={backFunc} />
            <div className={style.selectorcontainer}>
                <div className={style.listcontainer}>
                    <div className={style.search}>
                        <label htmlFor='musicselect-search'>{translation("musicSelect.search")}</label>
                        <input id='musicselect-search' type="text" value={musicSelectVariables.search} onChange={(e) => { setMusicSelectVariables({ ...musicSelectVariables, search: e.target.value }) }} />
                    </div>
                    <div className={style.musiclist} ref={musicListRef}>
                        {
                            musicSelectVariables.musicList.map(data => {
                                return(
                                <MusicListContent title={data} key={data}/>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={style.details}>
                    Music Details here
                </div>
            </div>
        </div>
    )
}


export default SelectMusic;