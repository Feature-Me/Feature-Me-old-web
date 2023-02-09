import * as solid from "solid-js";

import style from "./import.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";

const SetupImportConfig: solid.Component = () => {
    const navigate = useNavigate();


    function navigation() {
        navigate("../settings");
    }

    return (
        <div class={style.terms} >
            <h1><TranslateText content="setup.import.title" /></h1>
        </div>
    )
}

export default SetupImportConfig;