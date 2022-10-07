import React from "react";
import { toast } from "react-toastify";
import TranslateText from "../../Components/TranslateText/TranslateText";
import { enviroment, resourcesDownloaded, DBVersion, gameConfig, musicSelect } from "./defaultValue";



function initLocalStorage(): void {
    let fixedCount = 0;
    try {
        if (!localStorage.getItem("environment")) {
            
            localStorage.setItem("environment", JSON.stringify(enviroment));
            fixedCount++;
        }

        if (!localStorage.getItem("ResourcesDownloaded")) {
            
            localStorage.setItem("ResourcesDownloaded", JSON.stringify(resourcesDownloaded));
            fixedCount++;
        }

        if (!localStorage.getItem("DBVersion")) {
            
            localStorage.setItem("DBVersion", JSON.stringify(DBVersion));
            fixedCount++;
        }

        if (!localStorage.getItem("gameConfig")) {
            
            localStorage.setItem("gameConfig", JSON.stringify(gameConfig));
            fixedCount++;
        }
        if (!localStorage.getItem("musicSelect")) {
            
            localStorage.setItem("musicSelect", JSON.stringify(musicSelect));
        }
        if(fixedCount > 0) toast.success(<TranslateText content = { "resourcesManager.cache.notifications.fixed"} start = { fixedCount.toString() } />);
    //toast.success(<TranslateText contentData={"resourcesManager.cache.notifications.fixed"} />);
} catch (error) {
    console.error(error);
    toast.error(`${error}`);
    }
}

export default initLocalStorage;