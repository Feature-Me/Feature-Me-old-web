import * as solid from "solid-js";
/* import { offlineMode } from "State/network/offlineMode";
import { useTransContext } from "@mbarzda/solid-i18next"; */
import { useLocation, useNavigate } from "@solidjs/router";

import style from "./navigatorOverlay.module.scss";


const NavigatorOverlay: solid.Component = () => {
    const [showOverlay, setShowOverlay] = solid.createSignal(false);
    const location = useLocation();
    const navigate = useNavigate();

    let urlInputRef: HTMLInputElement | undefined

    solid.onMount(() => {
        window.addEventListener("keydown", handleKey)
        if (import.meta.env.DEV) setShowOverlay(true);
    })
    solid.onCleanup(() => {
        window.removeEventListener("keydown", handleKey);
    })

    function handleKey(e: KeyboardEvent) {
        if (!e.shiftKey) return;
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
                <p>Feature Me Navigator Debug Overlay (press Shift + F2 to toggle)</p>
                {/*<p>Current location : {location.pathname}</p> */}
                <div class={style.navigator}>
                    <input type="text" ref={urlInputRef} />
                    <button onClick={navigateUrl}>
                        Go
                    </button>
                    <button onClick={() => navigate(-1)}>
                        &larr;
                    </button>
                    <button onClick={() => navigate(1)}>
                        &rarr;
                    </button>
                    <button onClick={() => window.location.reload()}>
                        ↻
                    </button>
                </div>
                {/* <button onClick={() => setShowOverlay(false)}>
                    Click Here to hide
                </button> */}
            </solid.Show>
        </div>
    )
}

export default NavigatorOverlay;