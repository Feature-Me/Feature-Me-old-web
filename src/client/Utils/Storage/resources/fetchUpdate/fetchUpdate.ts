import defaultUrl from "Assets/StaticInfo/defaultUrl.json";
import compareVersions, { validate } from "compare-versions";

function fetchResourcesUpdate() {
    return new Promise<updateMap>((resolve, reject) => {
        fetch(defaultUrl.resources.updateMap, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        }).then(res => res.json()).then((res: updateMap) => {
            const resourcesInfo = JSON.parse(localStorage.getItem("resourcesDownloaded") || "{}");
            const updates: updateMap = {
                background: {},
                behavior: {},
                music: {},
            }
            for (const i in res) {
                const key = i as keyof updateMap
                if (!resourcesInfo[key]) continue;
                if (!resourcesInfo[key].initialized) updates[key] = res[key];
                else {
                    for (const j in res[key]) {
                        if (!validate(j)) continue;
                        if (compareVersions(j, resourcesInfo[key].version) == 1) updates[key][j] = res[key][j];
                    }
                }
            }
            resolve(updates);
        }).catch(error => {
            console.error(error);
            resolve({ background: {}, behavior: {}, music: {} });
        })
    })
}

export default fetchResourcesUpdate;