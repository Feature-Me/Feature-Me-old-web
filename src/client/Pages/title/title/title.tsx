import * as React from 'react';
import { motion } from 'framer-motion'

import style from './title.scss';

import TitleText from '../titleText/titleText';
import GlitchImage from 'Components/glitchImage/glitchImage';
import background from 'Assets/Images/tidal wreck.png';
import TermsWindow from 'Pages/title/title/TermsWindow/termsWindow';
import SettingsWindow from 'Pages/title/title/settingsWindow/settingsWindow';


const Title: React.FC = () => {


    const backgroundInitialAnimation = { y: "5%", scale: 1.5, transition: { duration: 5, ease: "easeOut", } }

    const backgroundAniamtion = { y: 0, scale: 1.5, transition: { duration: 5, ease: "easeOut", } }

    return (
        <div className={style.titlepage} /* ref={backgroundRef} */>
            <motion.div className={style.background} animate={backgroundAniamtion} initial={backgroundInitialAnimation}>
                <GlitchImage src={background} />
            </motion.div>
            <TitleText />
            <SettingsWindow />
            <TermsWindow />
        </div>
    )
}

export default Title;