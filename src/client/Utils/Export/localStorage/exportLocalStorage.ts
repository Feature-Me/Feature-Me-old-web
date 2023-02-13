import version from "Assets/StaticInfo/version.json";

interface exportDataType {
    metaData: {
        version: string
        applicationVersion: string
        exportDate: number
    },
    data: { [key: string]: object }
}

function exportLocalStorage() {
    const exportData: exportDataType = {
        metaData: {
            version: "0.7.0",
            applicationVersion: version.version,
            exportDate: Date.now()
        },
        data: {}
    };

    for (let i = 0; i < localStorage.length; i++) {
        const element = localStorage.key(i);
        if (!element) continue;
        exportData.data[element] = JSON.parse(localStorage.getItem(element) || "{}");
    }

    return JSON.stringify(exportData);
}

export default exportLocalStorage;