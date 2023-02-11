import * as solid from "solid-js";

import style from "./import.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";
import { useI18n } from "intl/intlContext";

const SetupImportConfig: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useI18n();

    const imports = [
        { label: "Feature Me Alpha (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.6 (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.7 (.fmcfg)", func: () => { } },
        { label: t("setup.skip"), func: navigation }
    ]

    function navigation() {
        navigate("../settings");
    }

    function importFile(callback: Function) {

    }

    return (
        <div class={style.import} >
            <h1 class="shadowTitle"><TranslateText content="setup.import.title" /></h1>
            <p><TranslateText content="setup.import.description" /></p>
            <solid.For each={imports}>
                {
                    data => (
                        <button class={style.content} onClick={data.func}>
                            <h2>{data.label}</h2>
                        </button>
                    )
                }
            </solid.For>
        </div>
    )
}

export default SetupImportConfig;