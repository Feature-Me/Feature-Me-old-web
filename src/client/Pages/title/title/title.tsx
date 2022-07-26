import * as React from 'react';
import { motion } from 'framer-motion'

import style from './title.scss';

import TitleText from '../titleText/titleText';
import GlitchImage from '../../../Components/glitchImage/glitchImage';
import background from '../../../Assets/Images/tidal wreck.png';
import TermsWindow from '../../../Block/TermsWindow/termsWindow';
import SettingsWindow from '../../../Block/settingsWindow/settingsWindow';


const Title: React.FC = () => {
    

    const backgroundInitialAnimation = {
        y: "5%",
        scale: 1.5,
        transition: {
            duration: 5,
            ease: "easeOut",
        }
    }

    const backgroundAniamtion = {
        y: 0,
        scale: 1.5,
        transition: {
            duration: 5,
            ease: "easeOut",
        }
    }

        /* React.useEffect(() => {
            let hideBg: NodeJS.Timeout;
            if (props.titleBackgroundOpened) {
                hideBg = setTimeout(() => {
                    backgroundRef.current.style.display = "none";
                }, 500);
            }
            else {
                backgroundRef.current.style.display = "block";
            }
            return () => {
                clearTimeout(hideBg);
            }
    
        }, [props.titleBackgroundOpened]) */

        /*     React.useEffect(() => {
                let hideBg: NodeJS.Timeout;
                if (gameData.titleBackgroundOpened.value) {
                    hideBg = setTimeout(() => {
                        backgroundRef.current.style.display = "none";
                    }, 500);
                }
                else {
                    backgroundRef.current.style.display = "block";
                }
                return () => {
                    clearTimeout(hideBg);
                }
        
            }, [gameData.titleBackgroundOpened]) */

    return (
        <div className={style.titlepage} /* ref={backgroundRef} */>
            <motion.div className={style.background} animate={backgroundAniamtion} initial={backgroundInitialAnimation}>
                <GlitchImage background={background} />
            </motion.div>
            <TitleText />
            <SettingsWindow />
            <TermsWindow />
        </div>
    )
}

export default Title;