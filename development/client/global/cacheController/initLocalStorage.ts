import { toast } from "react-toastify";

function initLocalStorage(): void {
    const toastId = toast.info("Initializing local storage...");
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
                    verison: "0.0.0"
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
        toast.success(`Local storage initialized ${fixedCount?`and ${fixedCount} data fixed.`:`.`}`);
    } catch (error) {
        console.error(error);
        toast.error(`Error in saving resources: ${error}`);
    }
}

export default initLocalStorage;