import { motion , useAnimation} from "framer-motion"
import React from "react"
import style from "./scenechanger.scss"

import gameData from "dataController/gameData/gameData";
const SceneChanger:React.FC = ()=>{
    const BlueAnimationController = useAnimation();
    const GreenAnimationController = useAnimation();
    const sceneChangerRef = React.useRef<HTMLDivElement>();
    const BlueAnimationOpen = {
        x: "-100%",
        transition: {
            duration: 0.5,
            ease: "easeIn"
        }
    }
    const GreenAnimationOpen = {
        x: "100%",
        transition: {
            duration: 0.5,
            ease: "easeIn"
        }
    }

    const BlueAnimationClose = {
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
    const GreenAnimationClose = {
        x: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
    React.useEffect(()=>{
        console.log(gameData.sceneChangerOpened.value);
        
        if(gameData.sceneChangerOpened.value){
            BlueAnimationController.start(BlueAnimationOpen);
            GreenAnimationController.start(GreenAnimationOpen);
            setTimeout(() => sceneChangerRef.current.style.display = "none", 500);
        }else{
            sceneChangerRef.current.style.display = "";
            BlueAnimationController.start(BlueAnimationClose);
            GreenAnimationController.start(GreenAnimationClose);
        }
    },[gameData.sceneChangerOpened.value])
    return(
        <div className={style.scenechanger} ref={sceneChangerRef}>
            <motion.div className={style.blue} animate={BlueAnimationController}></motion.div>
            <motion.div className={style.green} animate={GreenAnimationController}></motion.div>
        </div>
    )
}

export default SceneChanger;