import { useBeforeLeave, useLocation, useNavigate } from "@solidjs/router";
import { BsChevronDoubleRight } from "solid-icons/bs";
import * as solid from "solid-js";
import { Transition } from "solid-transition-group";
import sleep from "Utils/sleep/sleep";

import style from "./splashScreen.module.scss";

import splashImage1 from "Assets/Images/splash-logo-1.png";
import slpashImage2 from "Assets/Images/splash-logo-2.png";
import TranslateText from "Components/TranslateText/TranslateText";

const Title: solid.Component = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div class={style.splashScreen}>
            
        </div>
    )
}

export default Title;