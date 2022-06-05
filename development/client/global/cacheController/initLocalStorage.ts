function initLocalStorage(): void {
    if (!localStorage.getItem("environment")) {
        const enviroment = {
            "language": navigator.language.toLowerCase().replace(/-/g, "_"),
            "termsVersion": "0.0.0",
            "termsAccepted": false
        }
        localStorage.setItem("environment", JSON.stringify(enviroment));
    }
    if (!localStorage.getItem("ResourcesDownloded")) {
        const resourcesDownloaded = {
            model: false,
            music: false
        }
        localStorage.setItem("ResourcesDownloded", JSON.stringify(resourcesDownloaded));
    }
}

export default initLocalStorage;