import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import SelectBox from "Components/SelectBox/selectBox";
import TranslateText from "Components/TranslateText/TranslateText";
import { Howl } from "howler";
import { cloneDeep } from "lodash";
import React from "react";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { useRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import getMime from "Utils/getMime/getMime";

import style from "./music.scss";
import MusicCard from "./musicCard";

const ChartEditorMusic: React.FC = () => {
    const [chartEditorProject, setChartEditorProject] = useRecoilState(chartProjectState);
    const music = chartEditorProject.project.music;
    const metadata = chartEditorProject.project.metadata;

    const defaultBoxList = music.map(m=>{return{label:m.name,value:m.id}})
    

    async function addMusic(files: FileList | null) {
        if (!files) return;
        const file = files[0];
        if (!file) return;
        file.arrayBuffer().then(bf => {
            const audioData = new Howl({ src:`data:${file.type};base64,${arrayBufferToBase64(bf)}`})
            
            audioData.once("load",()=>{
                
                const music: chartEditorMusic = {
                    name: file.name,
                    data: bf,
                    mime: file.type,
                    time: audioData.duration(),
                    id:uuidv5(String(Date.now()), uuidv4())
                }
                
                setChartEditorProject(proj => {
                    const musicList = cloneDeep(proj.project.music);
                    musicList.push(music);
                    const defaultMusic = musicList.length==1?musicList[0].id:proj.project.metadata.defaultMusic;
                    return {
                        ...proj,
                        project: {
                            ...proj.project,
                            metadata:{
                                ...proj.project.metadata,
                                defaultMusic:defaultMusic
                            },
                            music: musicList
                        },
                    }
                })
            })
            audioData.load();
        })

    }
    return (
        <div className={style.music}>
            <h1><TranslateText content="editor.chartEditor.music.title" /></h1>
            <div className={style.view}>
                {/* Default Music Selector */}
                <div className={style.interaction}>
                    <h2><TranslateText content="editor.chartEditor.music.default" /></h2>
                    <SelectBox contents={defaultBoxList} value={defaultBoxList.find(m=>m.value==metadata.defaultMusic)||defaultBoxList[0]||{value:"",label:""}} />
                </div>
                {/*Head text and add button*/}
                <div className={style.interaction}>
                    <h2><TranslateText content="editor.chartEditor.music.all" /> ({chartEditorProject.project.music.length})</h2>
                    <ChamferedButton><label htmlFor="editorMusicAddFileInput"><TranslateText content="editor.chartEditor.music.add" /></label></ChamferedButton>
                    <input type="file" id="editorMusicAddFileInput" accept="audio/*" hidden onChange={e => addMusic(e.target.files)} />
                </div>
                <div className={style.musicList}>
                    {
                        music.map((music, index) => {
                            return (
                                <MusicCard music={music} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ChartEditorMusic;