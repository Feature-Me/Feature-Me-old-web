import * as React from "react";
import style from './titleBackground.scss';
import { motion, useAnimation } from 'framer-motion';
import gameData from "dataController/gameData/gameData";

const TitleBackground: React.FC = () => {
    const BlueAnimationController = useAnimation();
    const GreenAnimationController = useAnimation();
    const BackgroundAnimationController = useAnimation();
    const backgroundRef = React.useRef<HTMLDivElement>();


    const BlueAnimationOpen = {
        x: "-100%",
        transition: {
            duration: 0.5,
            ease:"easeIn"
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
        x:0,
        transition:{
            duration:0.5,
            ease: "easeOut"
        }
    }
    const GreenAnimatonClose = {
        x: 0,
        transition: {
            duration: 0.5,
            ease:"easeOut"
        }
    }

    React.useEffect(() => {
        console.log(gameData.titleBackgroundOpened.value);
        
        if(gameData.titleBackgroundOpened.value){
            BlueAnimationController.start(BlueAnimationOpen);
            GreenAnimationController.start(GreenAnimationOpen);
            setTimeout(() => {
                backgroundRef.current.style.display = "none";
            }, 750);
        }else{
            backgroundRef.current.style.display = "";
            BlueAnimationController.start(BlueAnimationClose);
            GreenAnimationController.start(GreenAnimatonClose);
        }
    }, [gameData.titleBackgroundOpened.value]);




    return (
        <motion.div className={style.background} ref={backgroundRef} animate={BackgroundAnimationController}>
            <motion.div className={style.background_blue} animate={BlueAnimationController}></motion.div>
            <motion.div className={style.background_green} animate={GreenAnimationController}></motion.div>
        </motion.div>
    )
}

export default TitleBackground;
