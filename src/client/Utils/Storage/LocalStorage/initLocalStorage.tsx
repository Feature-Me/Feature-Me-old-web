import { environment, resourcesDownloaded, DBVersion, gameConfig, musicSelect, userConfig } from "./defaultValue";

function initLocalStorage(): void {
    try {
        localStorage.setItem("environment", JSON.stringify({ ...environment, ...(JSON.parse(localStorage.getItem("environment") || "{}")) }));
        localStorage.setItem("resourcesDownloaded", JSON.stringify({ ...resourcesDownloaded, ...(JSON.parse(localStorage.getItem("resourcesDownloaded") || "{}")) }));
        localStorage.setItem("DBVersion", JSON.stringify({ ...DBVersion, ...(JSON.parse(localStorage.getItem("DBVersion") || "{}")) }));
        localStorage.setItem("gameConfig", JSON.stringify({ ...gameConfig, ...(JSON.parse(localStorage.getItem("gameConfig") || "{}")) }));
        localStorage.setItem("musicSelect", JSON.stringify({ ...musicSelect, ...(JSON.parse(localStorage.getItem("musicSelect") || "{}")) }));
        localStorage.setItem("userData", JSON.stringify({ ...userConfig, ...(JSON.parse(localStorage.getItem("userData") || "{}")) }));
    } catch (error) {
        console.error(error);
    }
}

export default initLocalStorage;