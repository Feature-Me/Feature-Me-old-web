import React from "react";
import style from './style.scss';
import { VscClose } from 'react-icons/vsc';
import { motion, useAnimation } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import version from "../versions.json";
import compareVersions from "compare-versions";
import Window from "../window/window";
import deleteCache from "global/cacheController/deleteCache"; "../cacheController/deleteData";



const TermsWindow: React.FC<{ showTermsWindow: boolean, setShowTermsWindow: React.Dispatch<React.SetStateAction<boolean>> }> = (props): JSX.Element => {
    const [translation, i18n] = useTranslation();
    const animationController = useAnimation();
    function closeTermsWindow(): void {
        props.setShowTermsWindow(false);
    }
    function acceptTerms(): void {
        const environment = JSON.parse(localStorage.getItem("environment")!);
        environment.termsVersion = version.TermsVersion;
        environment.termsAccepted = true;
        localStorage.setItem("environment", JSON.stringify(environment));
        closeTermsWindow();
    }
    function declineTerms(): void {
        closeTermsWindow();
        document.body.innerHTML = translation("terms.termsMessage.decline");
        deleteCache.enviroment();
    }

    React.useEffect(() => {
            setTimeout(() => {
                const { termsVersion, termsAccepted } = JSON.parse(localStorage.getItem("environment")!);
                if (!termsAccepted || termsVersion == null || compareVersions(termsVersion, version.TermsVersion) === -1) props.setShowTermsWindow(true);
            }, 350);
    }, []);

    return (
        <Window title={translation("terms.title")} className={style.terms_window} showWindow={props.showTermsWindow} setShowWindow={props.setShowTermsWindow}>
            <div>
                <pre>
                    {translation("terms.content")}
                </pre>
                <div className={style.interaction}>
                    <button className={style.redbtn} onClick={declineTerms}>
                        {translation("terms.button.decline")}
                    </button>
                    <button onClick={acceptTerms}>
                        {translation("terms.button.accept")}
                    </button>
                </div>
            </div>
        </Window>
    )
}

export default TermsWindow;