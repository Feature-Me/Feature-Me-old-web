import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsGear } from "solid-icons/bs";
import { useTransContext } from "@mbarzda/solid-i18next";

import playAudio from "Utils/PlayAudio/playAudio";

import style from "./home.module.scss";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";
import Header from "../../Components/Header/header";
import HomePageFooter from "./footer/homePageFooter";


const Home: solid.Component = () => {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);

    let containerRef: HTMLDivElement | undefined;

    useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        if (!containerRef) return;
        setFadeOut(true);
        setTimeout(() => {
            e.retry(true);
        }, 1000)
    })

    return (
        <div class={style.home} ref={containerRef} classList={{ blackOut: fadeOut() }}>
            <Header />
            <main class={style.main}>
            </main>
            <HomePageFooter/>
        </div >
    )
}

export default Home;