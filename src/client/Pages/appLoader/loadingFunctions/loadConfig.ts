import { Setter } from "solid-js";
import i18next from "i18next";
import { setGameConfigStore } from "State/gameCondigStore";
import { gameConfig } from "Utils/Storage/LocalStorage/defaultValue";

interface loginData extends webSocketReturnValue {
    data: wsUser
}

function loadConfigFromLoader(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {

        try {
            setTitle(i18next.t("appLoader.loadConfig.title").toString());
            setDescription(i18next.t("appLoader.loadConfig.connecting").toString());

            const config: gameConfig = JSON.parse(localStorage.getItem("gameConfig") || JSON.stringify(gameConfig));

            setGameConfigStore("data", config);
            setGameConfigStore("ready", true);
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

export default loadConfigFromLoader;