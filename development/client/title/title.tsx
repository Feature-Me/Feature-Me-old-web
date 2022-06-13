import * as React from 'react';
import Background from '../title/background';
import TitleText from '../title/titleText';
import SettingsWindow from './settingsWindow';
import style from './title.scss';
import TermsWindow from '../global/terms/termsWindow';



const Title: React.FC = () => {
    const [showSettingsWindow, setShowSettingsWindow] = React.useState(false);
    const [showTermsWindow, setShowTermsWindow] = React.useState(false);
    const [titleBackgroundOpened, setTitleBackgroundOpened] = React.useState(false);
    return (
        <div className={style.titlepage} >
            <Background titleBackgroundOpened={titleBackgroundOpened} setTitleBackgroundOpened={setTitleBackgroundOpened} />
            <TitleText showSettingsWindow={showSettingsWindow} setShowSettingsWindow={setShowSettingsWindow} titleBackgroundOpened={titleBackgroundOpened} setTitleBackgroundOpened={setTitleBackgroundOpened} />
            <SettingsWindow showSettingsWindow={showSettingsWindow} setShowSettingsWindow={setShowSettingsWindow} showTermsWindow={showTermsWindow} setShowTermsWindow={setShowTermsWindow} />
            <TermsWindow showTermsWindow={showTermsWindow} setShowTermsWindow={setShowTermsWindow} />

        </div>
    )
}

export default Title;