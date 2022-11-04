import { Howl } from "howler";
import { cloneDeep } from "lodash";
import React from "react";
import { MdDeleteOutline, MdPause, MdPlayArrow } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import gameConfigState from "State/gameConfig/gameConfig";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import msToStringTime from "Utils/msToStringTime/msToStringTime";

import style from "./music.scss";

const MusicCard: React.FC<{ music: chartEditorMusic }> = (props) => {
    const gameConfig = useRecoilValue(gameConfigState);
    const setChartEditorProject = useSetRecoilState(chartProjectState);
    const inputNameRef = React.useRef<HTMLInputElement>(null)

    const [playing, setPlaying] = React.useState<boolean>(false);

    const audio = React.useRef<Howl>(new Howl({
        src: `data:${props.music.mime};base64,${arrayBufferToBase64(props.music.data)}`,
        autoplay: false,
        loop: false,
        volume: gameConfig.audio.masterVolume * gameConfig.audio.musicVolume
    }))

    function deleteMusic() {
        setChartEditorProject(proj => {
            const musicList = cloneDeep(proj.project.music);
            const index = musicList.findIndex(m => m.id == props.music.id);

            if (index == -1) return proj;
            musicList.splice(index, 1);

            return {
                ...proj,
                project: {
                    ...proj.project,
                    music: musicList
                }
            }
        })
    }

    React.useEffect(() => {
        if (!inputNameRef.current) return;
        inputNameRef.current.value = props.music.name;
    }, [props.music])

    React.useEffect(() => {
        audio.current.on("end", () => setPlaying(false));
        return () => {
            audio.current.off("end");
            audio.current.stop();
            audio.current.unload();
        }
    }, [])

    React.useEffect(() => {
        if (playing) audio.current.play();
        else audio.current.pause();
    }, [playing])

    return (
        <div className={style.musicListContent}>
            <div className={style.title}>
                <input type="text" className={style.nameInput} defaultValue={props.music.name} ref={inputNameRef} />
                <span className={style.id} >UUID : {props.music.id} , Time : {msToStringTime(props.music.time)}</span>
            </div>
            <div className={style.buttons}>
                <div className={`${style.iconWrapper} ${style.player}`} data-playing={String(playing)}>
                    <MdPlayArrow onClick={() => setPlaying(true)} className={`${style.icon} ${style.play}`} />
                    <MdPause onClick={() => setPlaying(false)} className={`${style.icon} ${style.pause}`} />
                </div>
                <div className={style.iconWrapper}>
                    <MdDeleteOutline onClick={deleteMusic} className={`${style.icon} ${style.danger}`} />
                </div>
            </div>

        </div>
    )
}
export default MusicCard;