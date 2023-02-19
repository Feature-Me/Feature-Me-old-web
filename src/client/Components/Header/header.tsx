import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsBatteryFull, BsChatLeftDots, BsGear, BsGithub, BsGrid3x3Gap, BsLink45deg, BsVolumeUp, BsWifi } from "solid-icons/bs";

import playAudio from "Utils/PlayAudio/playAudio";
import timeDegitFormat from "Utils/timeFormat/timeDigitFormat";
import TranslateText from "Components/TranslateText/translateText";

import defaultUrl from "Assets/StaticInfo/defaultUrl.json";

import style from "./header.module.scss";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            headerIconModel: boolean;
        }
    }
}

const HomeHeader: solid.Component = () => {
    let containerRef: HTMLDivElement | undefined;

    const [clock, setClock] = solid.createSignal(new Date());

    const [elapsedTime, setElapsedTime] = solid.createSignal(performance.now());
    const [elapsedHours, setElapsedHours] = solid.createSignal(0);
    const [elapsedMinutes, setElapsedMinutes] = solid.createSignal(0);

    let clockInterval: NodeJS.Timer;

    const userName = JSON.parse(localStorage.getItem("userData") || '{"userInfo":{"name":""}}').userInfo.name

    const icons = [
        { element: <BsVolumeUp />, onClick: () => { } },
        { element: <BsGear />, onClick: () => { } },
        { element: <BsLink45deg />, onClick: () => { } },
        { element: <BsGithub />, onClick: () => { open(defaultUrl.github.repo) } },
        { element: <BsGrid3x3Gap />, onClick: () => { } },
    ]

    solid.onMount(() => {
        clockInterval = setInterval(updateClock, 1000);
    });

    solid.onCleanup(() => {
        clearInterval(clockInterval);
    });

    function updateClock() {
        const elapsed = performance.now()
        setClock(new Date());
        setElapsedTime(elapsed);
        const hr = elapsed / 3600000;
        const min = elapsed / 60000;
        setElapsedHours(Math.floor(hr));
        setElapsedMinutes(Math.floor(min - Math.floor(hr) * 60));

    }

    function handleClick() {
        playAudio(clickSound);
        navigator.vibrate(50);
    }

    function handleHover() {
        playAudio(selectSound);
    }

    function headerIconModel(el: HTMLButtonElement) {
        solid.onMount(() => {
            el.addEventListener("click", handleClick);
            el.addEventListener("pointerenter", handleHover);
            el.addEventListener("focusin", handleHover);
        });
        solid.onCleanup(() => {
            el.removeEventListener("click", handleClick);
            el.removeEventListener("pointerenter", handleHover);
            el.removeEventListener("focusin", handleHover);
        })
    }

    return (
        <header class={style.header} ref={containerRef} >
            <h1 class="shadowTitle">{<TranslateText key="menu.title" />}</h1>
            <div class={style.spacer} />

            <div class={style.userInfo}>
                <span>@{userName}</span>
            </div>
            <div class={style.clock}>
                {timeDegitFormat(clock().getHours())}:{timeDegitFormat(clock().getMinutes())}
                (
                {timeDegitFormat(elapsedHours())}:{timeDegitFormat(elapsedMinutes())}
                <TranslateText key="head.sessionTime" />
                )
            </div>
            <div class={style.icons}>
                <solid.For each={icons}>
                    {
                        content => {
                            return (
                                <button class={style.icon} onClick={content.onClick} use:headerIconModel>
                                    {content.element}
                                </button>
                            )
                        }
                    }
                </solid.For>
            </div>
        </header >
    )
}

export default HomeHeader;