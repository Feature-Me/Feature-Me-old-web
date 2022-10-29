import { cloneDeep } from "lodash";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { chartProjectState } from "State/editor/chartProjectState";

import style from "./music.scss";

const MusicCard: React.FC<{ music: chartEditorMusic }> = (props) => {

    const setChartEditorProject = useSetRecoilState(chartProjectState);
    const inputNameRef = React.useRef<HTMLInputElement>(null)

    function deleteMusic(){
        setChartEditorProject(proj=>{
            const musicList = cloneDeep(proj.project.music);
            const index = musicList.findIndex(m => m.id == props.music.id);
            
            if(index==-1) return proj;
            musicList.splice(index,1);
            
            return{
                ...proj,
                project:{
                    ...proj.project,
                    music:musicList
                }
            }
        })
    }

    React.useEffect(()=>{
        if(!inputNameRef.current)return;
        inputNameRef.current.value = props.music.name;
    },[props.music])

    return (
        <div className={style.musicListContent}>
            <div className={style.title}>
                <input type="text" className={style.nameInput} defaultValue={props.music.name} ref={inputNameRef}/>
                <span className={style.id} >{props.music.id}</span>
            </div>
            <div className={style.buttons}>
                <div className={style.iconWrapper}>
                    <MdDeleteOutline  onClick={deleteMusic} className={`${style.icon} ${style.danger}`} />
                </div>
            </div>

        </div>
    )
}
export default MusicCard;