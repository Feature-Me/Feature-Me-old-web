import { io, Socket } from "socket.io-client";
import { createSignal } from "solid-js";

export const [userWebSocket, setUserWebSocket] = createSignal<Socket | undefined>(undefined);
export const [userOnline, setUserOnline] = createSignal<boolean>(false);
export const [userData, setUserData] = createSignal<wsUser>({ name: "", id: "", connection: "" });