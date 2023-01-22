import * as solid from "solid-js";

import style from "./loading.module.scss"

const Loading: solid.Component = () => {

    return (
        <div class={style.loading}>
            <h4>Loading...</h4>
        </div>
    );
}

export default Loading