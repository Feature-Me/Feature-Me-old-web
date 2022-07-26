import JSZip from "jszip";
import React from "react";
import { toast } from "react-toastify";
import TranslateText from "../../../Components/TranslateText/TranslateText";
import { installMusic } from "./installMusic";

function parseMusicCollection(zip: JSZip) {
    return new Promise<void>(async (resolve, reject) => {
        if (!zip.file("FileMap.json")) {
            toast.error(<TranslateText contentData={"resourcesManager.database.notifications.installFailed"} />);
            resolve();
        }
        const folders = JSON.parse(await zip.file("FileMap.json")!.async("string"))
        let promises = [];
        for (const folder of folders.folders) {
            const zipFilter = zip.filter(path => path.startsWith(folder));
            const zipFolder = new JSZip();
            for (const file of zipFilter) {
                if (file.dir) continue;

                zipFolder.file(file.name.replace(folder + "/", ""), await file.async("arraybuffer"));
            }
            promises.push(installMusic(zipFolder));
        }
        await Promise.all(promises);
        resolve();
    })
}

export { parseMusicCollection }