import * as solid from "solid-js";
import { offlineMode } from "State/network/offlineMode";
import { useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate } from "@solidjs/router";
import path from "path-browserify";

import version from "Assets/StaticInfo/version.json";

import style from "./navigatorOverlay.module.scss";


const NavigatorOverlay: solid.Component = () => {
    const [showOverlay, setShowOverlay] = solid.createSignal(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [_, intl] = useTransContext()

    let urlInputRef: HTMLInputElement | undefined

    solid.onMount(() => {
        window.addEventListener("keydown", handleKey)
        if (solid.DEV) setShowOverlay(true);
    })
    solid.onCleanup(() => {
        window.removeEventListener("keydown", handleKey);
    })

    function handleKey(e: KeyboardEvent) {
        if (e.key == "F2") {
            e.preventDefault();
            e.stopPropagation();
            setShowOverlay(s => !s)
        }
    }

    function navigateUrl() {
        if (!urlInputRef) return;
        navigate(urlInputRef.value);
    }

    return (
        <div class={style.navigatorOverlay}>
            <solid.Show when={showOverlay()}>
                <p>Feature Me Navigator Debug Overlay (press F2 to toggle)</p>
                <p>Current location : {location.pathname}</p>
                <input type="text" name="" id="" ref={urlInputRef} />
                <button onClick={() => navigateUrl}>
                    Navigate URL
                </button>
                <button onClick={() => navigate(-1)}>
                    Navigate Back
                </button>
                <button onClick={() => navigate(1)}>
                    Navigate Next
                </button>
                <button onClick={() => setShowOverlay(false)}>
                    Click Here or focus with Tab to hide Overlay
                </button>
            </solid.Show>
        </div>
    )
}

export default NavigatorOverlay;