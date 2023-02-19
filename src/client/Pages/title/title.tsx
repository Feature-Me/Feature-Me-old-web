import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsGear } from "solid-icons/bs";
import { useTransContext } from "@mbarzda/solid-i18next";

import GlitchImage from "Components/GlitchImage/glitchImage";
import ModernModal from "Components/Modal/ModernModal/ModernModal";
import TranslateText from "Components/TranslateText/translateText";

import { showModal, setShowModal, canBegin } from "./titleState";

import playAudio from "Utils/PlayAudio/playAudio";

import SettingsModal from "./settingsModal/settingsModal";

import version from "Assets/StaticInfo/version.json";

import background from "Assets/Images/tidal_wreck_far_camera.png";

import style from "./title.module.scss";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";


declare module "solid-js" {
    namespace JSX {
        interface Directives {
            titleButtonModel: boolean;
        }
    }
}

const Title: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useTransContext();
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);

    let containerRef: HTMLDivElement | undefined;

    function closeWindow() {
        window.close();
        //location.href = "https://feature-me-.onrender.com/"
        history.back()
    }

    function navigateHome() {
        navigate("/home");
    }

    function handleClick() {
        playAudio(clickSound);
        navigator.vibrate(50);
    }

    function handleHover() {
        playAudio(selectSound);
    }

    function titleButtonModel(el: Element) {
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

    useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        if (!containerRef) return;
        setFadeOut(true);
        setTimeout(() => {
            e.retry(true);
        }, 1000)
    })

    return (
        <div class={style.title} ref={containerRef} classList={{ blackOut: fadeOut() }}>
            <div class={style.background}>
                <GlitchImage src={background} />
            </div>
            <div class={style.titleText}>
                <h1 class="shadowTitle">Feature Me</h1>
                <div class={style.buttons}>
                    <button data-color="#03a7eb" onClick={closeWindow} use:titleButtonModel>
                        <BsArrowUpLeft />
                        Exit
                    </button>
                    <solid.Show when={canBegin()} fallback={<button use:titleButtonModel><TranslateText key="title.needReload" /></button>}>
                        <button data-color="#149610" onClick={navigateHome} use:titleButtonModel>
                            <BsArrowUp />
                            Begin
                        </button>
                    </solid.Show>
                </div>
            </div>
            <div class={style.footer}>
                <p>Feature Me {version.version} Mksk and Rae the Feature Me Project <br /> ©{new Date().getFullYear()} Feature Me All rights reserved.</p>
                <span><TranslateText key="title.language" /></span>
                <button class={`iconWrapper ${style.settings}`} onClick={() => { setShowModal(m => !m) }} use:titleButtonModel >
                    <BsGear class={style.settingsIcon} />
                </button>
            </div>
            <SettingsModal />
        </div >
    )
}

export default Title;