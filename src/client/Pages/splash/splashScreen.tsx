import React from "react";
import { motion, useAnimation } from "framer-motion";

import style from "./splashScreen.scss";

import splashImage1 from "Assets/Images/splash-logo-1.png";

import slpashImage2 from "Assets/Images/splash-logo-2.png";
import sleep from "Utils/sleep/sleep";
import TranslateText from "Components/TranslateText/TranslateText";
import { useNavigate } from "react-router";
import { BsChevronDoubleRight } from "react-icons/bs";

const SplashScreen: React.FC = () => {
    const navigate = useNavigate();
    const logoRef = React.useRef<HTMLDivElement>(null);
    const cautionTextRef = React.useRef<HTMLDivElement>(null);
    const skipRef = React.useRef<HTMLDivElement>(null);

    const logoImages = [splashImage1, slpashImage2];

    const logoAnimationController = useAnimation();
    const cautionTextAnimationController = useAnimation();

    const initial = { opacity: 0 };

    const fadeInScaleFadeOut = {
        opacity: [0, 1, 0],
        scale: [1, 1.025, 1.1],
        transition: {
            duration: 2.5,
            times: [0, 0.75, 1]
        }
    }

    const fadeInOut = {
        opacity: [0, 1, 1, 0],
        transition: {
            duration: 5,
            times: [0, 0.2, 0.75, 1]
        }
    }

    React.useEffect(() => {

        new Promise<void>(async (resolve, reject) => {
            if (!logoRef.current || !cautionTextRef.current) return;
            logoRef.current.style.visibility = "visible";
            for (const image of logoImages) {
                if (!logoRef.current) return;
                logoRef.current.style.backgroundImage = `url(${image})`;
                logoAnimationController.start(fadeInScaleFadeOut);
                await sleep(3000)
            }
            logoRef.current.style.visibility = "hidden";
            cautionTextRef.current.style.visibility = "visible";
            cautionTextAnimationController.start(fadeInOut);
            await sleep(6000);
            sessionStorage.setItem("splashScreen", "true");
            navigate("../title");
            resolve();
        })
    }, [])

    React.useEffect(() => {
        if (sessionStorage.getItem("splashScreen") && skipRef.current) {
            skipRef.current.style.visibility = "visible";
        }
    }, [])

    return (
        <div className={style.splashScreen} >
            <motion.div className={style.logo} ref={logoRef} animate={logoAnimationController} initial={initial} />
            <motion.div className={style.cautionText} ref={cautionTextRef} animate={cautionTextAnimationController} initial={initial} >
                <h1><TranslateText content="splashScreen.caution.title" /></h1>
                <p><TranslateText content="splashScreen.caution.description" /></p>
            </motion.div>
            <div className={style.skip} ref={skipRef} onClick={() => navigate("../title")}>
                <h2>skip</h2> <div className={style.iconWrapper}><BsChevronDoubleRight /></div>
            </div>
        </div>
    )
}

export default SplashScreen