import * as solid from "solid-js";
import { offlineMode } from "State/network/offlineMode";
import { useI18n } from "intl/intlContext";
import { useLocation } from "@solidjs/router";
import path from "path-browserify";

import version from "Assets/StaticInfo/version.json";

import style from "./generalOverlay.module.scss";


const GeneralOverlay: solid.Component = () => {
    const [showOverlay, setShowOverlay] = solid.createSignal(false);
    const location = useLocation();
    const [_, intl] = useI18n()
    const [screen, setScreen] = solid.createSignal([0, 0]);
    const [mouse, setMouse] = solid.createSignal([0, 0]);

    solid.onMount(() => {
        window.addEventListener("keydown", handleKey)
        if (process.env.NODE_ENV == "development") setShowOverlay(true);
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouse);

        handleResize();
    })
    solid.onCleanup(() => {
        window.removeEventListener("keydown", handleKey);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouse);
    })

    function handleKey(e: KeyboardEvent) {
        if (e.key == "F1") {
            e.preventDefault();
            e.stopPropagation();
            setShowOverlay(s => !s)
        }
    }
    function handleResize() {
        setScreen([window.innerWidth, window.innerHeight]);
    }
    function handleMouse(e: MouseEvent) {
        setMouse([e.x, e.y]);
    }

    return (
        <div class={style.generalOverlay}>
            <solid.Show when={showOverlay()} ><p>Feature Me Debug Overlay (Press F1 to toggle)</p></solid.Show>
            <solid.Show when={offlineMode()}><p>Offline Mode</p></solid.Show>
            <solid.Show when={showOverlay()}>
                <p>{process.env.NODE_ENV == "production" ? "Production Build" : "Development Build"}</p>
                <p>Version : {version.version}</p>
                <p>URL {path.join(window.location.href, location.pathname)}</p>
                <p>Session Started : {new Date().toLocaleString()}</p>
                <p>Network Status : {String(navigator.onLine)}</p>
                <p>Service Worker Status : {navigator.serviceWorker.controller?.state}</p>
                <p>Device languages : {navigator.languages.toString()}</p>
                <p>Avaliable languages : {intl.languages.toString()}</p>
                <p>Selected languages : {intl.language}</p>
                <p>Page Resolution : {screen()[0]} x {screen()[1]}</p>
                <p>Aspect ratio : {screen()[0] / screen()[1]}</p>
                <p>Mouse Position : ({mouse()[0]} , {mouse()[1]}) </p>
                <button onDblClick={() => setShowOverlay(false)}>
                    Double click to hide Overlay
                </button>
            </solid.Show>
        </div>
    )
}

export default GeneralOverlay;