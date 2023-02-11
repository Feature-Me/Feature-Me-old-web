import * as solid from "solid-js";
import { offlineMode } from "State/network/offlineMode";

import style from "./generalOverlay.module.scss";
const GeneralOverlay: solid.Component = () => {
    const [showOverlay, setShowOverlay] = solid.createSignal(true);

    solid.createEffect(() => {
    })

    return (
        <div class={style.generalOverlay}>
            <solid.Show when={showOverlay()} ><p>Feature Me Debug Overlay (Press F1 to toggle)</p></solid.Show>
            <solid.Show when={offlineMode()}><p>Offline Mode</p></solid.Show>
            <solid.Show when={showOverlay()}>
                <p>{process.env.NODE_ENV == "production" ? "Production Build" : "Development Build"}</p>
            </solid.Show>
        </div>
    )
}

export default GeneralOverlay;