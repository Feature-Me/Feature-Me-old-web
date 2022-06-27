import * as React from 'react';
import TitleBackground from '../background/titleBackground';
import TitleText from '../titleText/titleText';
import SettingsWindow from '../settingsWindow/settingsWindow';
import style from './title.scss';
import TermsWindow from '../../global/terms/termsWindow';
import gameData from 'dataController/gameData/gameData';



const Title: React.FC<{titleBackgroundOpened:boolean,setTitleBackgroundOpened:React.Dispatch<React.SetStateAction<boolean>>}> = (props) => {
    const [showSettingsWindow, setShowSettingsWindow] = React.useState(false);
    const [showTermsWindow, setShowTermsWindow] = React.useState(false);
    const backgroundRef = React.useRef<HTMLDivElement>();

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

    React.useEffect(() => {
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

    }, [gameData.titleBackgroundOpened])

    return (
        <div className={style.titlepage} ref={backgroundRef}>
            <TitleBackground />
            <TitleText showSettingsWindow={showSettingsWindow} setShowSettingsWindow={setShowSettingsWindow} />
            <SettingsWindow showSettingsWindow={showSettingsWindow} setShowSettingsWindow={setShowSettingsWindow} showTermsWindow={showTermsWindow} setShowTermsWindow={setShowTermsWindow} />
            <TermsWindow showTermsWindow={showTermsWindow} setShowTermsWindow={setShowTermsWindow} />
        </div>
    )
}

export default Title;