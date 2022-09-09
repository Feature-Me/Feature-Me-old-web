import Head from "Block/head/head";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";
import { useRecoilValue } from "recoil";
import { musicGameModeState, musicGameValueState } from "State/musicGame/musicGameState";
import musicSelectorState from "State/musicSelector/musicSelectorState";

import style from "./resultPage.scss";

const ResultPage:React.FC = () =>{
    const scenechange = useSeneChangeNavigation();
    const musicGameValue = useRecoilValue(musicGameValueState);
    const musicGameMode = useRecoilValue(musicGameModeState);
    const selectedMusic = useRecoilValue(musicSelectorState);
    const musicData = selectedMusic.selectedData as MusicAssetContents;
    const chartMetaData = musicData.metadata.difficulties.find(diff => diff.name == musicGameMode.difficulty)

    
    return(
    <div className={style.resultPage}>
            <Head title="Reslut" backFunc={() => scenechange(-3)} />
            <div className={style.resultData}>
                <div className={style.title}>
                    <p>{`${chartMetaData?.name} ${chartMetaData?.level}`} - {chartMetaData?.chartDesigner}</p>
                    <h1>{musicData.metadata.title}</h1>
                </div>
                <div className={style.selector}>
                    Summary
                </div>
                <div className={style.summary}>
                    <div className={style.bigvalue}>
                        <span>Score</span>
                        <h1>{musicGameValue.score}</h1>
                    </div>
                    <div className={style.bigvalue}>
                        <span>Rank</span>
                        <h1> - </h1>
                    </div>
                    <div className={style.bigvalue}>
                        <span>Max Chain</span>
                        <h1>{musicGameValue.maxChain}</h1>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default ResultPage