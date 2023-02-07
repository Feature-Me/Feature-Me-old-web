import { Setter } from "solid-js";

import { useI18n } from "intl/intlContext";

import initLocalStorage from "Utils/Storage/LocalStorage/initLocalStorage";
import initDatabase from "Utils/Storage/database/initDatabase";

function initStorageFromLoader(setTitle: Setter<string>, setDescription: Setter<string>) {
    const [t, intl] = useI18n();
    return new Promise<void>(async (resolve, reject) => {
        try {
            setTitle(t("appLoader.storage.title"));

            setDescription(t("appLoader.storage.localStorage"));
            initLocalStorage();

            setDescription(t("appLoader.storage.database"));
            initDatabase().then(resolve).catch(reject);

        } catch (error) {
            reject();
        }
    })

}

export default initStorageFromLoader;