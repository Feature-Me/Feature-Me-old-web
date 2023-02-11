import { Setter } from "solid-js";
import { io } from "socket.io-client"
import { setUserData, setUserOnline, setUserWebSocket } from "State/network/webSocket/userSocker";
import i18next from "i18next";
import { offlineMode } from "State/network/offlineMode";

interface loginData extends webSocketReturnValue {
    data: wsUser
}

function connectToWebSocket(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {

        if (offlineMode()) {
            resolve();
            return;
        }
        setTitle(i18next.t("appLoader.websocket.title"));
        setDescription(i18next.t("appLoader.websocket.connecting"));
        const socket = io("/user");
        setUserWebSocket(socket);
        setDescription(i18next.t("appLoader.websocket.fetchingData"));

        const connectionTimeout = setTimeout(() => {
            console.log("timeout");
            reject("connection timed out");
        }, 30000);

        socket.on("connect", () => {
            clearTimeout(connectionTimeout);
            const environment = JSON.parse(localStorage.getItem("environment") || "{}");
            const userData = { name: "", id: "", ...environment.userData }
            setUserOnline(true);
            setDescription(i18next.t("appLoader.websocket.login"));
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