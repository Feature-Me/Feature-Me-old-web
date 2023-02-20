import * as solid from "solid-js";
import { useNavigate } from "@solidjs/router";

import TranslateText from "Components/TranslateText/translateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";

import playAudio from "Utils/PlayAudio/playAudio";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import cancelSound from "Assets/Sounds/uiFallBack/cancel.m4a";

import style from "./terms.module.scss"

const SetupTerms: solid.Component = () => {

    const navigate = useNavigate();
    const [timer, setTimer] = solid.createSignal(15);
    const [agreeTerms, setAgreeTerms] = solid.createSignal(false);

    let interval: NodeJS.Timer;

    function navigation() {
        if (timer() !== 0) return;
        navigate("../import")
    }

    function handleChagneCheckBox(e: Event & { currentTarget: HTMLInputElement, target: Element }) {
        setAgreeTerms(Boolean(e.currentTarget.checked));
        if (e.currentTarget.checked) playAudio(clickSound);
        else playAudio(cancelSound);
    }


    solid.onMount(() => {
        if (!solid.DEV) {
            interval = setInterval(() => {
                setTimer(t => t - 1);
            }, 1000);
        } else {
            setTimer(0);
            setAgreeTerms(true);
        }

    })

    solid.createEffect(() => {
        if (timer() === 0) clearInterval(interval);
    })

    solid.onCleanup(() => {
        clearInterval(interval);
    })

    return (
        <div class={style.terms} >
            <h1 class="shadowTitle"><TranslateText key="terms.title" /></h1>
            <div class={style.contents} tabIndex={0}>
                <p><TranslateText key="terms.content" /></p>
                <hr />
                <label class={style.termsCheck}>
                    <input type="checkbox" onChange={(e) => handleChagneCheckBox(e)} tabIndex={0} />
                    <TranslateText key="terms.agree" />
                </label>
            </div>
            <div class={style.interactions}>
                <GradientButton onClick={navigation} class={style.button} disabled={Boolean(timer()) || !agreeTerms()}>
                    <TranslateText key="setup.next" end={timer() && `(${timer()})`} />
                </GradientButton>
            </div>
        </div>
    )
}

export default SetupTerms;