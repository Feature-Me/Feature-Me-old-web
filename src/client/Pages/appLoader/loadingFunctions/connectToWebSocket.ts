import { Setter } from "solid-js";
import { io } from "socket.io-client"
import { setUserData, setUserOnline, setUserWebSocket } from "State/network/webSocket/userSocker";
import i18next from "i18next";
import { offlineMode } from "State/network/offlineMode";
import { environment, userConfig } from "Utils/Storage/LocalStorage/defaultValue";

interface loginData extends webSocketReturnValue {
    data: wsUser
}

function connectToWebSocket(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {

        if (offlineMode()) {
            resolve();
            return;
        }
        setTitle(i18next.t("appLoader.websocket.title").toString());
        setDescription(i18next.t("appLoader.websocket.connecting").toString());
        const socket = io("/user");
        setUserWebSocket(socket);
        setDescription(i18next.t("appLoader.websocket.fetchingData").toString());

        const connectionTimeout = setTimeout(() => {
            console.log("timeout");
            reject("connection timed out");
        }, 30000);

        socket.on("connect", () => {
            clearTimeout(connectionTimeout);
            const environmentSettings = JSON.parse(localStorage.getItem("environment") || JSON.stringify(environment));
            const userInfo = JSON.parse(localStorage.getItem("userData") || JSON.stringify(userConfig))
            const userData = { name: userInfo.userInfo.name, id: userInfo.userInfo.id, ...environmentSettings.userData }
            setUserOnline(true);
            setDescription(i18next.t("appLoader.websocket.login").toString());
            window.addEventListener("beforeunload", () => socket.disconnect());
            socket.emit("login", userData, (res: loginData) => {
                if (!res.success) reject("Login failed");
                setUserData(res.data);
                socket.off("disconnect");
                clearTimeout(loginTimeout);
                resolve();
            });
            const loginTimeout = setTimeout(() => {
                console.log("timeout");
                reject("socket timed out");
            }, 30000);
        });
        socket.on("disconnect", reject);
    })
}

export default connectToWebSocket;