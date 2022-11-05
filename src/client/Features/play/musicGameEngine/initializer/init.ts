import version from "Config/versions.json";
import { useRecoilValue, useSetRecoilState } from "recoil";
import gameConfigState from "State/gameConfig/gameConfig";
import musicSelectorState from "State/play/musicSelector/musicSelectorState";
import EventHandler from "Utils/EventHandler/eventHandler";
import loadBehavior from "Utils/Storage/resourcesLoader/loadBehavior";
import loadFont from "Utils/Storage/resourcesLoader/loadFont";
import loadSoundEffect from "Utils/Storage/resourcesLoader/loadSoundEffect";
import * as musicGame from "State/play/game/musicGame/musicGameState"
import parseChart from "Features/play/parseChart/parseChart";
import acceptBehavior from "Features/play/acceptBehavior/acceptBehavior";
import { fontAssetContents } from "Types/resources/fontResources";
import { gameProps } from "Types/play/game/gameProps";
import { chartType } from "Features/play/parseChart/chartSample";
import React from "react";
import { cloneDeep } from "lodash";

function useGameLoader() {
    const selectedMusic = useRecoilValue(musicSelectorState);
    const musicGameMode = useRecoilValue(musicGame.musicGameModeState);
    const setMusicGameValue = useSetRecoilState(musicGame.musicGameValueState);
    const setMusicGameNotesJudge = useSetRecoilState(musicGame.musicGameNotesJudgeState);
    const setMusicGameTime = useSetRecoilState(musicGame.musicGameTimeState);
    const setMusicGamePause = useSetRecoilState(musicGame.musicGamePauseState);
    const musicData = selectedMusic.selectedData as MusicAssetContents;
    const rawChart = musicData.chart.find((c) => c.name === musicGameMode.difficulty);
    const rawMusic = musicData.music.find((m) => m.name === musicData.metadata.selectedMusic);
    const gameConfig = useRecoilValue(gameConfigState);
    const event = new EventHandler();

    let propsData: gameProps = {
        ready: false,
        data: {
            chart: undefined,
            music: rawMusic
        }
    }

    const [data,setData] = React.useState(propsData);

    

    function getBehavior() {
        return new Promise<getBehaviorReturns>(async (resolve) => {
            const behaviorName = {
                model: gameConfig.gameplay.behavior.model == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.model,
                sound: gameConfig.gameplay.behavior.sound == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.sound,
                font: gameConfig.gameplay.behavior.font == "default" ? version.defaultBehavior : gameConfig.gameplay.behavior.font,
            }

            const behaviordata = await loadBehavior(behaviorName.model);

            if (behaviorName.sound == "default" || behaviorName.sound == "auto") {
                behaviorName.sound = behaviordata.soundEffect || version.defaultBehavior;
            }
            if (behaviorName.font == "default" || behaviorName.font == "auto") {
                behaviorName.font = behaviordata.fontName || version.defaultFont;
            }

            const soundEffectdata = await loadSoundEffect(behaviorName.sound);
            const fontdata = await loadFont(behaviorName.font);

            resolve({
                model: behaviordata,
                sound: soundEffectdata,
                font: fontdata
            })
        })
    }
    function setStates(chartData: chartType) {
        setMusicGameValue(value => {
            return {
                ...value,
                bpm: chartData.metadata.initialBpm,

            }
        })
        setMusicGamePause(pause => {
            return {
                ...pause,
                ready: true,
                paused: false
            }
        })
        setMusicGameNotesJudge(judge => {
            return {
                ...judge,
                notesCount: {
                    current: 0,
                    all: chartData.metadata.chain,
                }
            }
        })
    }

    function load() {
        getBehavior().then((behavior) => {
            parseChart(rawChart!.data, gameConfig.gameplay.scrollSpeed).then(async (chartData) => {
                const volume = (gameConfig.audio.masterVolume * gameConfig.audio.effectVolume) || 1;
                const newData = cloneDeep(data);
                newData.data.chart = await acceptBehavior(chartData, behavior.model, behavior.font, behavior.sound, volume);
                newData.ready = true;
                setStates(chartData);
                setData(newData)
                //event.dispatch("loadData",data);
            })
        })
    }

    return {
        event,
        data,
        load
    }

}

export default useGameLoader;