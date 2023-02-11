import * as solid from "solid-js";
import { offlineMode } from "State/network/offlineMode";

import style from "./generalOverlay.module.scss";
const GeneralOverlay: solid.Component = () => {

    solid.createEffect(() => {
        console.log(offlineMode());
    })

    return (
        <div class={style.generalOverlay}>
            <p>{offlineMode() && "Offline Mode"}</p>

        </div>
    )
}

export default GeneralOverlay;