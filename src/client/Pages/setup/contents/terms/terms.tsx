import * as solid from "solid-js";

import style from "./terms.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import { useNavigate } from "@solidjs/router";


const SetupTerms: solid.Component = () => {

    const navigate = useNavigate();
    const [timer, setTimer] = solid.createSignal(15);
    const [agreeTerms, setAgreeTerms] = solid.createSignal(false);

    let interval: NodeJS.Timer;

    function navigation() {
        if (timer() !== 0) return;
        navigate("../import")
    }


    solid.onMount(() => {
        if (process.env.NODE_ENV == "production") {
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
            <h1 class="shadowTitle"><TranslateText content="terms.title" /></h1>
            <div class={style.contents} tabIndex={0}>
                <p><TranslateText content="terms.content" /></p>
                <hr />
                <label class={style.termsCheck}>
                    <input type="checkbox" onChange={(e) => setAgreeTerms(Boolean(e.currentTarget.checked))} tabIndex={0} />
                    <TranslateText content="terms.agree" />
                </label>
            </div>
            <div class={style.interactions}>
                <GradientButton onClick={navigation} class={style.button} disabled={Boolean(timer()) || !agreeTerms()}>
                    <TranslateText content="setup.next" end={timer() && `(${timer()})`} />
                </GradientButton>
            </div>
        </div>
    )
}

export default SetupTerms;