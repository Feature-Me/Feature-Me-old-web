import React from "react";
import { toast } from "react-toastify";
import TranslateText from "global/TranslateText/translateText";

function initLocalStorage(): void {
    const toastId = toast.info(<TranslateText contentData="resourcesManager.cache.notifications.initializing"></TranslateText>);
    let fixedCount = 0;
    try {
        if (!localStorage.getItem("environment")) {
            const enviroment = {
                "language": navigator.language.toLowerCase().replace(/-/g, "_"),
                "termsVersion": "0.0.0",
                "termsAccepted": false
            }
            localStorage.setItem("environment", JSON.stringify(enviroment));
            fixedCount++;
        }
        if (!localStorage.getItem("ResourcesDownloaded")) {
            const resourcesDownloaded = {
                model: {
                    initialized: false,
                    version: "0.0.0"
                },
                music: {
                    initialized: false,
                    version: "0.0.0"
                }
            }
            localStorage.setItem("ResourcesDownloaded", JSON.stringify(resourcesDownloaded));
            fixedCount++;
        }
        if (!localStorage.getItem("DBVersion")) {
            const DBVersion = {
                version: 0,
                initialized: false,
                updated: new Date().getDate()
            }
            localStorage.setItem("DBVersion", JSON.stringify(DBVersion));
            fixedCount++;
        }
        toast.success(<TranslateText contentData={"resourcesManager.cache.notifications.initialized"} end={<TranslateText contentData={"resourcesManager.cache.notifications.fixed"} start={fixedCount.toString()} />} />);
        //toast.success(<TranslateText contentData={"resourcesManager.cache.notifications.fixed"} />);
    } catch (error) {
        console.error(error);
        toast.error(`${<TranslateText contentData={"resourcesManager.cache.notifications.initializingFailed"} />} : ${error}`);
    }
}

export default initLocalStorage;