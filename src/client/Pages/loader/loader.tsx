import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { setRenderBackground } from "State/backgroundState";

import style from "./loader.module.scss"

const Loader: solid.Component = () => {
    const navigate = useNavigate();

    solid.onMount(() => {
        setRenderBackground(true);
    });

    return (
        <div class={style.loader}>

        </div>
    )
}

export default Loader;