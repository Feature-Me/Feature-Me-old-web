import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsBatteryFull, BsChatLeftDots, BsGear, BsGithub, BsGrid3x3Gap, BsLink45deg, BsVolumeUp, BsWifi } from "solid-icons/bs";
import { useTransContext } from "@mbarzda/solid-i18next";

import TranslateText from "Components/TranslateText/TranslateText";

import playAudio from "Utils/PlayAudio/playAudio";

import style from "./header.module.scss";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";


const HomeHeader: solid.Component = () => {
    let containerRef: HTMLDivElement | undefined;

    const [clock, setClock] = solid.createSignal(new Date());

    const [elapsedTime, setElapsedTime] = solid.createSignal(performance.now());
    const [elapsedHours, setElapsedHours] = solid.createSignal(0);
    const [elapsedMinutes, setElapsedMinutes] = solid.createSignal(0);

    let clockInterval: NodeJS.Timer;

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

    return (
        <header class={style.header} ref={containerRef} >
            <h1 class="shadowTitle"><TranslateText key="menu.title" /></h1>
            <div>
                {clock().getHours().toString().padStart(2, "0")}:{clock().getMinutes()}
                (
                {elapsedHours().toString().padStart(2, "0")}:{elapsedMinutes().toString().padStart(2, "0")}
                <TranslateText key="head.sessionTime" />
                )
            </div>
            <div class={style.icons}>
                <BsWifi />
                <BsChatLeftDots />
                <BsVolumeUp />
                <BsBatteryFull />
                <BsGear />
                <BsLink45deg />
                <BsGithub />
                <BsGrid3x3Gap />
            </div>
        </header >
    )
}

export default HomeHeader;