import { Setter } from "solid-js";
import { io } from "socket.io-client"
import { setUserData, setUserOnline, setUserWebSocket } from "State/webSocket/userSocker";
import i18next from "i18next";

interface loginData extends webSocketReturnValue {
    data: wsUser
}

function connectToWebSocket(setTitle: Setter<string>, setDescription: Setter<string>) {
    return new Promise<void>((resolve, reject) => {
        setTitle(i18next.t("appLoader.websocket.title"));
        setDescription(i18next.t("appLoader.websocket.connecting"));
        const socket = io("/user");
        setUserWebSocket(socket);
        setDescription(i18next.t("appLoader.websocket.fetchingData"));

        socket.on("connect", () => {
            const environment = JSON.parse(localStorage.getItem("environment") || "{}");
            const userData = { name: "", id: "", ...environment.userData }
            setUserOnline(true);
            setDescription(i18next.t("appLoader.websocket.login"));
            socket.emit("login", userData, (res: loginData) => {
                if (!res.success) reject("Login failed");
                setUserData(res.data);
                resolve();
            })
        })
    })
}

export default connectToWebSocket;