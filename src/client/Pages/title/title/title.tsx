import * as React from 'react';
import { motion } from 'framer-motion'

import style from './title.scss';

import TitleText from '../titleText/titleText';
import GlitchImage from 'Components/glitchImage/glitchImage';
import background from 'Assets/Images/tidal wreck.png';
import TermsWindow from 'Pages/title/title/TermsWindow/termsWindow';
import SettingsWindow from 'Pages/title/title/settingsWindow/settingsWindow';

//new years update
import Proton from "Proton-engine";

const Title: React.FC = () => {

    const backgroundInitialAnimation = { y: "5%", scale: 1.5, transition: { duration: 5, ease: "easeOut", } }

    const backgroundAniamtion = { y: 0, scale: 1.5, transition: { duration: 5, ease: "easeOut", } }

    //new years update
    const particleCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const proton = new Proton();
    const emitter = new Proton.Emitter();

    emitter.rate = new Proton.Rate(
        new Proton.Span(1, 2),
        new Proton.Span(0.1, 0.5)
    );
    emitter.addInitialize(new Proton.Mass(0.1,0.25));
    emitter.addInitialize(new Proton.Radius(1, 3));
    emitter.addInitialize(new Proton.Life(2, 100));
    emitter.addInitialize(
        new Proton.Velocity(
            new Proton.Span(0.5, 0.5),
            new Proton.Span(-180, 180),
            "polar"
        )
    );
    emitter.addBehaviour(new Proton.Alpha(1, 1, Infinity, "easeInSine"))
    emitter.addBehaviour(new Proton.Color("f5f5f5"));
    emitter.addBehaviour(new Proton.Force(0, -0.75));
    emitter.addBehaviour(new Proton.Scale(1, 2))
    emitter.p.x = window.innerWidth / 2;
    emitter.p.y = window.innerHeight;
    emitter.emit();
    proton.addEmitter(emitter);

    React.useEffect(() => {
        let renderInterval: NodeJS.Timer;
        if (particleCanvasRef.current) {
            const renderer = new Proton.CanvasRenderer(particleCanvasRef.current);
            proton.addRenderer(renderer);
            renderInterval = setInterval(() => {
                proton.update();
            }, 30)

        }
        return () => {
            clearInterval(renderInterval)
        }
    }, [])


    return (
        <div className={style.titlepage}>
            <motion.div className={style.background} animate={backgroundAniamtion} initial={backgroundInitialAnimation}>
                <GlitchImage src={background} />
            </motion.div>
            {
                /* new years update */
            <canvas className={style.canvas} ref={particleCanvasRef} height={window.innerHeight} width={window.innerWidth} />
            }
            <TitleText />
            <SettingsWindow />
            <TermsWindow />
        </div>
    )
}

export default Title;