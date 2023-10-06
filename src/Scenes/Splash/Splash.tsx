import * as solid from "solid-js";
import { createMotion } from "@motionone/solid";
import { useNavigate } from "@solidjs/router";

import { useI18nContext } from "Global/Intl/i18n-solid";

import easing from "Global/Utils/easing/easing";
import sleep from "Global/Utils/sleep/sleep";
import BudouXWrapper from "Global/Components/BudouXWrapper/BudouXWrapper";

import style from "./Splash.module.scss";


const Splash = () => {

    const { LL, locale } = useI18nContext();

    const navigate = useNavigate();

    const [display, setDisplay] = solid.createSignal("image");

    let containerRef: HTMLDivElement | undefined;
    let noticeTitleRef: HTMLDivElement | undefined;
    let noticeSpacerRef: HTMLDivElement | undefined;

    let timeout: NodeJS.Timeout;

    solid.onCleanup(() => {
        clearTimeout(timeout);
    })


    solid.onMount(async () => {
        await sleep(4000);
        setDisplay("notice");
        setNoticeTitleAnimation();
    });

    async function setNoticeTitleAnimation() {
        if (!noticeTitleRef) return;
        const currentBoundingBox = noticeTitleRef.getBoundingClientRect();
        const initalPosition = ((containerRef?.clientHeight || window.innerHeight) / 2) - currentBoundingBox.height / 2;

        const rectTiles = noticeTitleRef.getElementsByClassName(style.rect);
        for (let i = 0; i < rectTiles.length; i++) {
            const elem = rectTiles.item(i);
            if (elem instanceof HTMLDivElement) {
                const baseDelay = i < 3 ? 200 : 300;
                elem.style.animation = `${style.slideTile} 0.3s cubic-bezier(0.33, 1, 0.68, 1) forwards`;
                elem.style.animationDelay = `${50 * (i + 1) + baseDelay}ms`;
            }
        }

        noticeTitleRef.style.position = "absolute";
        noticeTitleRef.style.height = `${currentBoundingBox.height}px`;

        if (noticeSpacerRef) {
            noticeSpacerRef.style.height = `${currentBoundingBox.height}px`;
        }

        await sleep(1500);

        createMotion(noticeTitleRef, {
            animate: {
                top: [`${initalPosition}px`, `${currentBoundingBox.top}px`]
            },
            transition: {
                duration: 0.75,
                easing: easing.easeOutQuart
            }
        });
        timeout = setTimeout(() => {
            navigate("/title");
        }, 5750)
    }

    return (
        <div class={style.splash} ref={containerRef} onClick={() => navigate("/title")}>
            <solid.Switch>
                <solid.Match when={display() == "image"}>
                    <div class={style.title}>
                        <div class={style.inner}>
                            <span class={style.the}>
                                The
                            </span>
                            <span class={style.title}>
                                Feature Me
                            </span>
                            <span class={style.project}>
                                Project Team Present
                            </span>
                        </div>
                    </div>
                </solid.Match>
                <solid.Match when={display() == "notice"}>
                    <div class={style.notice}>
                        <div class={style.header} ref={noticeTitleRef}>
                            <div class={style.rect}></div><div class={style.rect}></div><div class={style.rect}></div>
                            <h1>{LL().Scenes.Splash.Notice.title()}</h1>
                            <div class={style.rect}></div><div class={style.rect}></div><div class={style.rect}></div>
                        </div>
                        <div class={style.spacer} ref={noticeSpacerRef}></div>
                        <p>
                            <BudouXWrapper lang="ja">
                                {LL().Scenes.Splash.Notice.content()}
                            </BudouXWrapper>
                        </p>
                    </div>
                </solid.Match>
            </solid.Switch>
        </div >
    )
}

export default Splash;