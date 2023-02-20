import { createStore } from "solid-js/store";

export const [gameConfigStore, setGameConfigStore] = createStore({ ready: false, data: {} });