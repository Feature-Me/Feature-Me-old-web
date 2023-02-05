import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { BsArrowUp, BsArrowUpLeft, BsGear } from "solid-icons/bs";

import GlitchImage from "Components/GlitchImage/glitchImage";

import version from "Assets/StaticInfo/version.json";

import style from "./title.module.scss";

import background from "Assets/Images/tidal_wreck_far_camera.png";

const Title: solid.Component = () => {
    const navigate = useNavigate();

    function closeWindow() {
        window.close();
        //location.href = "https://feature-me-.onrender.com/"
        history.back()
    }

    function navigateHome() {
        navigate("/home");
    }


    return (
        <div class={style.title}>
            <div class={style.background}>
                <GlitchImage src={background} />
            </div>
            <div class={style.titleText}>
                <h1>Feature Me</h1>
                <div class={style.buttons}>
                    <p data-color="#03a7eb" onClick={closeWindow}>
                        <BsArrowUpLeft />
                        Exit
                    </p>
                    <p data-color="#149610" onClick={navigateHome}>
                        <BsArrowUp />
                        Begin
                    </p>
                </div>
            </div>
            <div class={style.footer}>
                <p>Feature Me {version.version} Mksk and Rae the Feature Me Project <br /> ©{new Date().getFullYear()} Feature Me All rights reserved.</p>
                <div class={`iconWrapper ${style.settings}`} onClick={()=>{}}>
                    <BsGear class={style.settingsIcon} />
                </div>
            </div>
        </div>
    )
}

export default Title;