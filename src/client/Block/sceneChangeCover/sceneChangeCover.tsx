import React from "react";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { motion, useAnimation } from "framer-motion";

import sceneChangerState from "State/sceneChanger/sceneChangerstate";
import sleep from "Utils/sleep/sleep";

import style from "./sceneChangeCover.scss";



const SceneChangeCover: React.FC = () => {

    const location = useLocation();
    const sceneChanger = useRecoilValue(sceneChangerState);
    const BlueAnimationController = useAnimation();
    const GreenAnimationController = useAnimation();
    const sceneChangerRef = React.useRef<HTMLDivElement>(null);

    const BlueAnimationInitial = { x: "-100%" };
    const GreenAnimationInitial = { x: "100%" };

    const BlueAnimationOpen = { x: "-100%", transition: { duration: 0.5, ease: "easeIn" } };
    const GreenAnimationOpen = { x: "100%", transition: { duration: 0.5, ease: "easeIn" } };

    const BlueAnimationClose = { x: 0, transition: { duration: 0.5, ease: "easeOut" } };
    const GreenAnimationClose = { x: 0, transition: { duration: 0.5, ease: "easeOut" } };

    let initialized = React.useRef<boolean>(false);



    React.useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    React.useEffect(() => {
        
        if (!initialized.current) {
            initialized.current = true;
            return;
        }
        new Promise<void>(async (resolve) => {
            if (sceneChangerRef.current) {
                sceneChangerRef.current.style.display = "block";
                sceneChangerRef.current.style.pointerEvents = "all";
            }
            BlueAnimationController.start(BlueAnimationClose);
            GreenAnimationController.start(GreenAnimationClose);
            await sleep(1000);
            BlueAnimationController.start(BlueAnimationOpen);
            GreenAnimationController.start(GreenAnimationOpen);
            await sleep(500);
            if (sceneChangerRef.current) {
                sceneChangerRef.current.style.display = "none";
                sceneChangerRef.current.style.pointerEvents = "none";
            }
            resolve();
        })
    }, [sceneChanger]);

    return (
        <div className={style.sceneChangerWrapper} ref={sceneChangerRef}>
            <motion.div className={style.blue} animate={BlueAnimationController} initial={BlueAnimationInitial} ></motion.div>
            <motion.div className={style.green} animate={GreenAnimationController} initial={GreenAnimationInitial} ></motion.div>
        </div>
    );
}

export default SceneChangeCover;
