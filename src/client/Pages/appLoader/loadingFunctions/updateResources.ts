import * as solid from "solid-js";
import i18next from "i18next";
import JSZip from "jszip";
import fetchResourcesUpdate from "Utils/Storage/resources/fetchUpdate/fetchUpdate";
import downloadResourceFile from "Utils/Storage/resources/downloadResources/downloadFile";
import getVersionMapInfo from "Utils/getVersionMapInfo/getVersionMapInfo";
import fileSize from "filesize";
import { offlineMode } from "State/network/offlineMode";


function uptdateResourcesFromLoader(setTitle: solid.Setter<string>, setDescription: solid.Setter<string>) {
    const [download, setDownload] = solid.createSignal({
        type: "",
        count: 0,
        size: 0,
        totalSize: 0
    });
    let versionMapInfo: { count: any; size: any; };
    return new Promise<void>(async (resolve, reject) => {

        if (offlineMode()) {
            resolve();
            return;
        }
        const downloadFunctions = [
            { key: "background", func: () => { } },
            { key: "behavior", func: () => { } },
            { key: "music", func: () => { } }
        ]
        setTitle(i18next.t("appLoader.resources.title").toString());
        setDescription(i18next.t("appLoader.resources.fetchUpdate").toString());
        const versionMap = await fetchResourcesUpdate();
        versionMapInfo = getVersionMapInfo(versionMap);
        console.log(versionMapInfo);


        for (const type in downloadFunctions) {
            if (Object.prototype.hasOwnProperty.call(downloadFunctions, type)) {
                const element = downloadFunctions[type];
                const key = element.key as keyof updateMap;
                const versions = versionMap[key];
                if (!versions) continue;
                setDownload(ct => Object.assign(ct, { type: key }));
                for (const version in versions) {
                    if (Object.prototype.hasOwnProperty.call(versions, version)) {
                        const data = versions[version];
                        await downloadResourceFile(data.url, data.hash).then(async zip => {

                            setDownload(ct => Object.assign(ct, { count: ct.count + 1, size: ct.size + data.size }));
                        }).catch(error => {
                            versionMapInfo.count--;
                            versionMapInfo.size -= data.size;
                            console.error(error);
                        })
                        setDescription(`${i18next.t("appLoader.resources.installUpdate")} - ${download().type} \n ${download().count} / ${versionMapInfo.count} , ${fileSize(download().size)} / ${fileSize(versionMapInfo.size)}`);
                    }
                }
            }
        }
        resolve();
    });

}

export default uptdateResourcesFromLoader;