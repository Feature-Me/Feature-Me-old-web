import React from "react";
import { motion, useAnimation } from "framer-motion";
import Proton from "Proton-engine";
import sleep from "Utils/sleep/sleep";
import TranslateText from "Components/TranslateText/TranslateText";
import { useNavigate } from "react-router";
import { BsChevronDoubleRight } from "react-icons/bs";
import { Howl } from "howler";
import style from "./splashScreen.scss";

import splashImage1 from "Assets/Images/splash-logo-1.png";
import slpashImage2 from "Assets/Images/splash-logo-2.png";
import startup from "Assets/Sounds/startup.mp3";

const SplashScreen: React.FC = () => {
    const navigate = useNavigate();
    const logoRef = React.useRef<HTMLDivElement>(null);
    const cautionTextRef = React.useRef<HTMLDivElement>(null);
    const skipRef = React.useRef<HTMLDivElement>(null);
    const particleCanvasRef = React.useRef<HTMLCanvasElement>(null);

    const logoImages = [splashImage1, slpashImage2];

    const startupAudio = new Howl({
        src: startup,
        volume: 0.5,
    })

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

    //particle
    const proton = new Proton();
    const emitter = new Proton.Emitter();

    emitter.rate = new Proton.Rate(
        new Proton.Span(1, 2),
        new Proton.Span(0.1, 0.5)
    );
    emitter.addInitialize(new Proton.Mass(0.25));
    emitter.addInitialize(new Proton.Radius(1, 2));
    emitter.addInitialize(new Proton.Life(2, 5));
    emitter.addInitialize(
        new Proton.Velocity(
            new Proton.Span(0.5, 0.5),
            new Proton.Span(-90, 90),
            "polar"
        )
    );

    //add Behaviour
    emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, "easeInSine"))
    emitter.addBehaviour(new Proton.Color("efedc9"));
    emitter.addBehaviour(new Proton.Force(0, -1));
    emitter.addBehaviour(new Proton.Scale(1, 2))
    //set emitter position
    emitter.p.x = window.innerWidth / 2;
    emitter.p.y = window.innerHeight;
    emitter.emit();

    //add emitter to the proton
    proton.addEmitter(emitter);

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
        });
    }, [])

    React.useEffect(() => {
        let renderInterval: NodeJS.Timer;
        if (particleCanvasRef.current) {
            const renderer = new Proton.CanvasRenderer(particleCanvasRef.current);
            proton.addRenderer(renderer);
            renderInterval = setInterval(() => {
                proton.update();
            }, 30)

        }

        if (sessionStorage.getItem("splashScreen") && skipRef.current) {
            skipRef.current.style.visibility = "visible";
        }

        return () => {
            clearInterval(renderInterval)
        }
    }, [])

    return (
        <div className={style.splashScreen} >
            <canvas className={style.background} ref={particleCanvasRef} height={window.innerHeight} width={window.innerWidth} />
            <div className={style.content}>
                <motion.div className={style.logo} ref={logoRef} animate={logoAnimationController} initial={initial} />
                <motion.div className={style.cautionText} ref={cautionTextRef} animate={cautionTextAnimationController} initial={initial} >
                    <h1><TranslateText content="splashScreen.caution.title" /></h1>
                    <p><TranslateText content="splashScreen.caution.description" /></p>
                </motion.div>
                <div className={style.skip} ref={skipRef} onClick={() => navigate("../title")}>
                    <h2>skip</h2> <div className={style.iconWrapper}><BsChevronDoubleRight /></div>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen