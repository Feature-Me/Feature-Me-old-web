import * as solid from "solid-js";
import JSZip from "jszip";

import { useI18n } from "intl/intlContext";

import fetchResourcesUpdate from "Utils/Storage/resources/fetchUpdate/fetchUpdate";
import downloadResourceFile from "Utils/Storage/resources/downloadResources/downloadFile";
import getVersionMapInfo from "Utils/getVersionMapInfo/getVersionMapInfo";
import fileSize from "filesize";


function uptdateResourcesFromLoader(setTitle: solid.Setter<string>, setDescription: solid.Setter<string>) {
    const [t, intl] = useI18n();

    const [download, setDownload] = solid.createSignal({
        type: "",
        count: 0,
        size: 0,
        totalSize: 0
    });
    let versionMapInfo: { count: any; size: any; };
    return new Promise<void>(async (resolve, reject) => {
        const downloadFunctions = [
            { key: "background", func: () => { } },
            { key: "behavior", func: () => { } },
            { key: "music", func: () => { } }
        ]
        setTitle(t("appLoader.resources.title"));
        setDescription(t("appLoader.resources.fetchUpdate"));
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
                        setDescription(`${t("appLoader.resources.installUpdate")} - ${download().type} \n ${download().count} / ${versionMapInfo.count} , ${fileSize(download().size)} / ${fileSize(versionMapInfo.size)}`);
                    }
                }
            }
        }
        resolve();
    });

}

export default uptdateResourcesFromLoader;