import * as solid from "solid-js";

import style from "./import.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";
import { useI18n } from "intl/intlContext";
import LargeButton from "Components/Button/largeButton/largeButton";

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
                        <LargeButton class={style.content} onClick={data.func}>
                            {data.label}
                        </LargeButton>
                    )
                }
            </solid.For>
        </div>
    )
}

export default SetupImportConfig;