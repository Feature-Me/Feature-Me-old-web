import * as solid from "solid-js";

import style from "./setName.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";
import { useTransContext } from "@mbarzda/solid-i18next";

const SetupSetName: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useTransContext();

    const imports = [
        { label: "Feature Me Alpha (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.6 (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.7 (.fmcfg)", func: () => { } },
        { label: t("setup.skip"), func: navigation }
    ]

    function navigation() {
        navigate("../settings");
    }

    return (
        <div class={style.setName} >
            <h1 class="shadowTitle"><TranslateText key="setup.setName.title" /></h1>
            <div class={style.content}>
                <p><TranslateText key="setup.setName.description" /></p><br />
                
                <GradientButton><TranslateText key="setup.next" /></GradientButton>
            </div>
        </div>
    )
}

export default SetupSetName;