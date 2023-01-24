import { useLocation, useNavigate } from "@solidjs/router";
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
    let logoRef: HTMLDivElement | undefined = undefined;

    const logoImages = [splashImage1, slpashImage2];

    solid.onMount(async () => {
        const data = JSON.parse(sessionStorage.getItem("splashScreen") || "false");
        if (data) setHideSkip(false);
        for (const image of logoImages) {
            if (!logoRef) return;
            logoRef.style.backgroundImage = `url(${image})`;
            await sleep(3000)
        }
        await sleep(5000);
        if (location.pathname.includes("/splash")) navigate("/title");

    })

    solid.onCleanup(() => {
        sessionStorage.setItem("splashScreen", "true");
    })

    function exitAnimation(el: Element, done: () => void) {
        const animate = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200
        });
        animate.finished.then(done);
    }

    return (
        <div class={style.splashScreen}>
            <div class={style.content}>
                <div class={style.logo} ref={logoRef} />
                <div class={style.cautionText} >
                    <h1><TranslateText content="splashScreen.caution.title" /></h1>
                    <p><TranslateText content="splashScreen.caution.description" /></p>
                </div>
                <div class={style.skip} classList={{ hide: hideSkip() }} onClick={() => { navigate("/title") }}>
                    <h2>skip</h2> <div class="iconWrapper"><BsChevronDoubleRight /></div>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen;