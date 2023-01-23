import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

import style from "./splashScreen.module.scss";
const SplashScreen: solid.Component = () => {
    const navigate = useNavigate();
    const [hideSkip, setHideSkip] = solid.createSignal(true);

    solid.onMount(() => {
        const data = JSON.parse(sessionStorage.getItem("splashScreen") || "false");
        if (data) setHideSkip(false);
    })


    return (
        <div class={style.splashScreen}>
            <div class={style.content}>

                <div class={style.skip} classList={{ hide: hideSkip() }}>
                    Skip
                </div>
            </div>
        </div>
    )
}

export default SplashScreen;