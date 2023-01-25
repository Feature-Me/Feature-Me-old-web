import { Setter } from "solid-js";
import i18next from "i18next";
import initLocalStorage from "Utils/Storage/LocalStorage/initLocalStorage";
import initDatabase from "Utils/Storage/database/initDatabase";

function initStorageFromLoader(setTitle: Setter<string>, setDescription: Setter<string>) {
    setTitle(i18next.t("loader.storage.title"));

    setDescription(i18next.t("loader.storage.localStorage"));
    initLocalStorage();

    setDescription(i18next.t("loader.storage.database"));
    initDatabase();

}

export default initStorageFromLoader;