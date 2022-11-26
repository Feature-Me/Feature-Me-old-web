import React from "react";
import { toast } from "react-toastify";
import TranslateText from "Components/TranslateText/TranslateText";
import { enviroment, resourcesDownloaded, DBVersion, gameConfig, musicSelect } from "./defaultValue";

function initLocalStorage(): void {
    try {
        
        localStorage.setItem("environment", JSON.stringify({ ...enviroment, ...(JSON.parse(localStorage.getItem("environment")||"{}")) }));
        localStorage.setItem("resourcesDownloaded", JSON.stringify({ ...resourcesDownloaded, ...(JSON.parse(localStorage.getItem("resourcesDownloaded") || "{}")) }));
        localStorage.setItem("DBVersion", JSON.stringify({ ...DBVersion, ...(JSON.parse(localStorage.getItem("DBVersion") || "{}")) }));
        localStorage.setItem("gameConfig", JSON.stringify({ ...gameConfig, ...(JSON.parse(localStorage.getItem("gameConfig") || "{}")) }));
        localStorage.setItem("musicSelect", JSON.stringify({ ...musicSelect, ...(JSON.parse(localStorage.getItem("musicSelect") || "{}")) }));
    
} catch (error) {
    console.error(error);
    toast.error(`${error}`);
    }
}

export default initLocalStorage;