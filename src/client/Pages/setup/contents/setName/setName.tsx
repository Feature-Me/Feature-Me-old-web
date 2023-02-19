import * as solid from "solid-js";

import TranslateText from "Components/TranslateText/translateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";
import { useTransContext } from "@mbarzda/solid-i18next";

import NormalInput from "Components/TextInput/NormalInput/NormalInput";

import style from "./setName.module.scss"

const SetupSetName: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useTransContext();

    let inputRef: HTMLInputElement | undefined;

    const defaultName = JSON.parse(localStorage.getItem("userData") || '{"userInfo":{"name":""}}').userInfo.name

    const imports = [
        { label: "Feature Me Alpha (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.6 (.fmcfg)", func: () => { } },
        { label: "Feature Me 0.7 (.fmcfg)", func: () => { } },
        { label: t("setup.skip"), func: navigation }
    ]

    function navigation() {
        navigate("../settings");
    }

    function setName() {
        if (!inputRef) return;
        let name = inputRef.value;
        const userData = JSON.parse(localStorage.getItem("userData") || "{initializedSettings:false}");
        userData.userInfo.name = name;
        localStorage.setItem("userData", JSON.stringify(userData));
        navigation();
    }

    return (
        <div class={style.setName} >
            <h1 class="shadowTitle"><TranslateText key="setup.setName.title" /></h1>
            <div class={style.content}>
                <p><TranslateText key="setup.setName.description" /></p>
                <NormalInput ref={inputRef} value={defaultName} maxLength={15} />
                <GradientButton onClick={setName}><TranslateText key="setup.next" /></GradientButton>
            </div>
        </div>
    )
}

export default SetupSetName;