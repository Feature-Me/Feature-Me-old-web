import { createSignal } from "solid-js";

export const [offlineMode, setOfflineMode] = createSignal<boolean>(false);