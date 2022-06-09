import * as React from "react";
import style from './title.scss';
import { motion, useAnimation } from 'framer-motion';


const Background: React.FC<{ titleBackgroundOpened: boolean, setTitleBackgroundOpened: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
    const BlueAnimationController = useAnimation();
    const GreenAnimationController = useAnimation();

    const BlueAnimation = {
        x: "-100%",
        transition: {
            duration: 0.5,
            ease: "easeIn",
        }
    }
    const GreenAnimation = {
        x: "100%",
        transition: {
            duration: 0.5,
            ease: "easeIn",
        }
    }

    React.useEffect(() => {
        console.log(props.titleBackgroundOpened);
        
        if(props.titleBackgroundOpened){
            BlueAnimationController.start(BlueAnimation);
            GreenAnimationController.start(GreenAnimation);
        }
    }, [props.titleBackgroundOpened]);




    return (
        <div className={style.background}>
            <motion.div className={style.background_blue} animate={BlueAnimationController}></motion.div>
            <motion.div className={style.background_green} animate={GreenAnimationController}></motion.div>
        </div>
    )
}

export default Background;
