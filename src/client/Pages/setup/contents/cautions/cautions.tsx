import * as solid from "solid-js";
import { BsChatLeftHeartFill, BsEmojiSmileFill, BsMusicNote } from "solid-icons/bs";
import { useNavigate } from "@solidjs/router";

import TranslateText from "Components/TranslateText/translateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";

import SetupCautionCard from "./cautionCard";

import style from "./cautions.module.scss"


const SetupCautions: solid.Component = () => {

    const navigate = useNavigate();

    const cautionsContent: Array<{ icon: solid.JSXElement, textKey: string }> = [
        { icon: <BsMusicNote />, textKey: "first" },
        { icon: <BsChatLeftHeartFill />, textKey: "second" },
        { icon: <BsEmojiSmileFill />, textKey: "third" }
    ]


    function navigation() {
        navigate("../terms")
    }

    return (
        <div class={style.caution} >
            <h1 class="shadowTitle"><TranslateText key="setup.caution.title" /></h1>
            <p><TranslateText key="setup.caution.description" /></p>
            <div class={style.contents}>
                <solid.For each={cautionsContent}>
                    {item => <SetupCautionCard {...item} />}
                </solid.For>
            </div>
            <div class={style.interactions}>
                <GradientButton onClick={navigation}>
                    <TranslateText key="setup.accept" />
                </GradientButton>
            </div>

        </div>
    )
}

export default SetupCautions;