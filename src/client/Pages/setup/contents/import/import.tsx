import * as solid from "solid-js";

import style from "./import.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";
import { useTransContext } from "@mbarzda/solid-i18next";
import LargeButton from "Components/Button/largeButton/largeButton";

const SetupImportConfig: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useTransContext();

    const imports = [
        { label: "Feature Me Alpha (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.6 (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.7 (.fmcfg)", func: () => { } },
        { label: t("setup.skip"), func: navigation }
    ]

    function navigation() {
        navigate("../setname");
    }

    function importFile(callback: Function) {

    }

    return (
        <div class={style.import} >
            <h1 class="shadowTitle"><TranslateText key="setup.import.title" /></h1>
            <p><TranslateText key="setup.import.description" /></p>
            <solid.For each={imports}>
                {
                    data => (
                        <LargeButton onClick={data.func}>
                            {data.label}
                        </LargeButton>
                    )
                }
            </solid.For>
        </div>
    )
}

export default SetupImportConfig;