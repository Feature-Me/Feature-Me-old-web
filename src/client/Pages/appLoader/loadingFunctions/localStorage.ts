import { Setter } from "solid-js";
import i18next from "i18next";
import initLocalStorage from "Utils/Storage/LocalStorage/initLocalStorage";
import initDatabase from "Utils/Storage/database/initDatabase";

function initStorageFromLoader(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            setTitle(i18next.t("appLoader.storage.title").toString());

            setDescription(i18next.t("appLoader.storage.localStorage").toString());
            initLocalStorage();

            setDescription(i18next.t("appLoader.storage.database").toString());
            initDatabase().then(resolve).catch(reject);

        } catch (error) {
            reject();
        }
    })

}

export default initStorageFromLoader;