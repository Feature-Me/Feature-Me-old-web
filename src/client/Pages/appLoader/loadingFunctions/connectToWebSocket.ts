import { Setter } from "solid-js";
import { io } from "socket.io-client"

import { useI18n } from "intl/intlContext";

import { setUserData, setUserOnline, setUserWebSocket } from "State/webSocket/userSocker";

interface loginData extends webSocketReturnValue {
    data: wsUser
}

function connectToWebSocket(setTitle: Setter<string>, setDescription: Setter<string>) {
    const [t, intl] = useI18n();

    return new Promise<void>((resolve, reject) => {
        setTitle(t("appLoader.websocket.title"));
        setDescription(t("appLoader.websocket.connecting"));
        const socket = io("/user");
        setUserWebSocket(socket);
        setDescription(t("appLoader.websocket.fetchingData"));

        const connectionTimeout = setTimeout(() => {
            console.log("timeout");
            reject("connection timed out");
        }, 30000);

        socket.on("connect", () => {
            clearTimeout(connectionTimeout);
            const environment = JSON.parse(localStorage.getItem("environment") || "{}");
            const userData = { name: "", id: "", ...environment.userData }
            setUserOnline(true);
            setDescription(t("appLoader.websocket.login"));
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