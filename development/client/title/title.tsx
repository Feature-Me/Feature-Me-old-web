import * as React from 'react';
import Background from '../title/background';
import TitleText from '../title/titleText';
import DisplayAspectCaution from '../title/directionCaution';
import SettingsWindow from './settingsWindow';
import style from './title.scss';
import TermsWindow from '../global/terms/termsWindow';


const Title: React.FC = () => {
    const [showSettingsWindow, setShowSettingsWindow] = React.useState(false);
    const [showTermsWindow, setShowTermsWindow] = React.useState(false);
    const [showResourcesDownloadWindow, setShowResourcesDownloadWindow] = React.useState(false);
    return (
        <div className={style.titlepage} >
            <Background />
            <TitleText showSettingsWindow={showSettingsWindow} setShowSettingsWindow={setShowSettingsWindow}showResourcesDownloadWindow={showResourcesDownloadWindow} setShowDownloadsWindow={setShowResourcesDownloadWindow} />
            <SettingsWindow showSettingsWindow={showSettingsWindow} setShowSettingsWindow={setShowSettingsWindow} showTermsWindow={showTermsWindow} setShowTermsWindow={setShowTermsWindow} />
            <TermsWindow showTermsWindow={showTermsWindow} setShowTermsWindow={setShowTermsWindow} />
            <DisplayAspectCaution />

        </div>
    )
}

export default Title;