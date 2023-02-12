import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsGear } from "solid-icons/bs";

import GlitchImage from "Components/GlitchImage/glitchImage";
import ModernModal from "Components/Modal/ModernModal/ModernModal";
import TranslateText from "Components/TranslateText/TranslateText";

import { showModal, setShowModal } from "./titleState";

import { useI18n } from "intl/intlContext";
import SettingsModal from "./settingsModal";

import version from "Assets/StaticInfo/version.json";

import background from "Assets/Images/tidal_wreck_far_camera.png";

import style from "./title.module.scss";




const Title: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useI18n();

    let containerRef: HTMLDivElement | undefined;

    const settingsContent = [
        { label: t("title.settings.clear"), func: () => { } }
    ]

    function closeWindow() {
        window.close();
        //location.href = "https://feature-me-.onrender.com/"
        history.back()
    }

    function navigateHome() {
        navigate("/home");
    }

    useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        if (!containerRef) return;
        containerRef.style.animation = "fadeOut 0.3s linear forwards";
        setTimeout(() => {
            e.retry(true);
        }, 3000)
    })

    return (
        <div class={style.title} ref={containerRef}>
            <div class={style.background}>
                <GlitchImage src={background} />
            </div>
            <div class={style.titleText}>
                <h1 class="shadowTitle">Feature Me</h1>
                <div class={style.buttons}>
                    <button data-color="#03a7eb" onClick={closeWindow}>
                        <BsArrowUpLeft />
                        Exit
                    </button>
                    <button data-color="#149610" onClick={navigateHome}>
                        <BsArrowUp />
                        Begin
                    </button>
                </div>
            </div>
            <div class={style.footer}>
                <p>Feature Me {version.version} Mksk and Rae the Feature Me Project <br /> ©{new Date().getFullYear()} Feature Me All rights reserved.</p>
                <span><TranslateText content="title.language" /></span>
                <button class={`iconWrapper ${style.settings}`} onClick={() => { setShowModal(m => !m) }}>
                    <BsGear class={style.settingsIcon} />
                </button>
            </div>
            <SettingsModal />
        </div >
    )
}

export default Title;