import React from "react";
import style from "./head.scss";
import gameData from "dataController/gameData/gameData";
import { MdOutlineArrowBackIosNew } from "react-icons/md"

const Head: React.FC<{ title: string,backFunc?:Function }> = (props) => {
    const [clock, setClock] = React.useState(new Date().toLocaleTimeString());
    let nowTime:Date = new Date();
    const hr = React.useRef<number>()
    const min = React.useRef<number>()
    setInterval(() => {
        nowTime = new Date();
        
        hr.current = Math.floor((nowTime.getTime() - gameData.startedTime.getTime() )/ 3600000)
        min.current = Math.floor(((nowTime.getTime() - gameData.startedTime.getTime()) / 60000) - hr.current*60)
        setClock(nowTime.toLocaleTimeString());
    }, 1000);
    
    return(
        <div className={style.head}>
            <div className={style.backicon_wrapper} onClick={()=>{if(props.backFunc) props.backFunc()}}>
                <MdOutlineArrowBackIosNew className={style.backicon} />
            </div>
            <h4>
                {props.title}
            </h4>
            <div></div>
            <h4>
                {clock} ({hr.current}hr:{min.current}min in this session)
            </h4>
        </div>
    )
}

export default Head;