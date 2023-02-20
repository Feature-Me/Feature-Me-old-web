import { useTransContext } from "@mbarzda/solid-i18next";
import i18next from "i18next";
import * as solid from "solid-js";
import { getEnvironment } from "Utils/getConfig/getConfig";

const LanguageHelper: solid.Component = () => {

    const [t, intl] = useTransContext();

    function changeLanguage() {
        console.log(`Language : ${intl.getI18next().language}`);
        console.log(`All avaliable languages : ${intl.getI18next().languages}`);

        const environment = getEnvironment();
        environment.language = intl.getI18next().language;
        localStorage.setItem("environment", JSON.stringify(environment));
    }

    solid.onMount(() => {
        intl.getI18next().on("languageChanged", changeLanguage);
    });
    solid.onCleanup(() => {
        intl.getI18next().off("languageChanged", changeLanguage);
    });

    return (<></>)
}

export default LanguageHelper;