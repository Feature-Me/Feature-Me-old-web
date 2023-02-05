import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import { BsChevronDoubleRight } from "solid-icons/bs";
import * as solid from "solid-js";
import { Transition } from "solid-transition-group";
import sleep from "Utils/sleep/sleep";

import style from "./splashScreen.module.scss";

import splashImage1 from "Assets/Images/splash-logo-1.png";
import slpashImage2 from "Assets/Images/splash-logo-2.png";
import TranslateText from "Components/TranslateText/TranslateText";

const SplashScreen: solid.Component = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hideSkip, setHideSkip] = solid.createSignal(true);
    let logoRef: HTMLDivElement | undefined;
    let textRef: HTMLDivElement | undefined;
    let containerRef: HTMLDivElement | undefined;

    const logoImages = [splashImage1];

    solid.onMount(async () => {
        const data = JSON.parse(sessionStorage.getItem("splashScreen") || "false");
        if (data) setHideSkip(false);
        for (const image of logoImages) {
            if (!logoRef) return;

            logoRef.style.backgroundImage = `url(${image})`;
            logoRef.style.animation = `${style.logoAnimation} 3s ease`;
            await sleep(3000)
        }
        if (textRef) textRef.style.animation = `${style.fadeInStopOut} 5s ease`
        await sleep(5000);
        if (location.pathname == "/splash") navigate("/load");

    })

    solid.onCleanup(() => {
        sessionStorage.setItem("splashScreen", "true");
    })

    useBeforeLeave(async (e) => {
        if (location.pathname != "/splash") return;
        if (!e.defaultPrevented) e.preventDefault();
        if (!containerRef) return;
        containerRef.style.animation = "fadeOut 0.3s linear forwards";
        await sleep(300);
        e.retry(true);
    })

    return (
        <div class={style.splashScreen} ref={containerRef}>
            <div class={style.content}>
                <div class={style.logo} ref={logoRef} />
                <div class={style.cautionText} ref={textRef}>
                    <h1><TranslateText content="splashScreen.caution.title" /></h1>
                    <p><TranslateText content="splashScreen.caution.description" /></p>
                </div>
                <div class={style.skip} classList={{ hide: hideSkip() }} onClick={() => { navigate("/load") }}>
                    <h2>skip</h2> <div class="iconWrapper"><BsChevronDoubleRight /></div>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen;