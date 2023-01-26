import { Setter } from "solid-js";
import i18next from "i18next";
import JSZip from "jszip";


function uptdateResourcesFromLoader(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {
        setTitle(i18next.t("appLoader.resources.title"));
        setDescription(i18next.t("appLoader.resources.fetchUpdate"));
    })
}

export default uptdateResourcesFromLoader;