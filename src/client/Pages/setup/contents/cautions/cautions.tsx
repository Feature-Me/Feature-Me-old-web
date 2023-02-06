import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import i18next from "i18next";

import sleep from "Utils/sleep/sleep";

import style from "./cautions.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";


const SetupCautions: solid.Component = () => {

    console.log(i18next.t("setup.caution.title"));
    return (
        <div class={style.setup} >
            <h1><TranslateText content="setup.caution.title" /></h1>
        </div>
    )
}

export default SetupCautions;