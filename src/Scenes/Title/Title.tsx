import * as solid from "solid-js";
import { createMotion } from "@motionone/solid";
import { useNavigate } from "@solidjs/router";

import { useI18nContext } from "Global/Intl/i18n-solid";


import style from "./Title.module.scss";


const Title = () => {

    const { LL, locale } = useI18nContext();

    const navigate = useNavigate();

    let containerRef: HTMLDivElement | undefined;

    return (
        <div class={style.title} ref={containerRef}>
            <h1>Feature ME</h1>
        </div >
    )
}

export default Title;