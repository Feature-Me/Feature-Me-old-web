import * as solid from "solid-js";
import playAudio from "Utils/PlayAudio/playAudio";

import style from "./gradientButton.module.scss";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";

interface buttonPropsType extends solid.JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    accentColor?: string
}


const GradientButton: solid.Component<buttonPropsType> = (props) => {

    let buttonRef: HTMLButtonElement | undefined;

    solid.onMount(() => {
        if (!buttonRef) return;
        buttonRef.addEventListener("click", handleClick);
        buttonRef.addEventListener("pointerenter", handleHover);
        buttonRef.addEventListener("focusin", handleHover);
    })

    solid.onCleanup(() => {
        if (!buttonRef) return
        buttonRef.removeEventListener("click", handleClick);
        buttonRef.removeEventListener("pointerenter", handleHover);
        buttonRef.removeEventListener("focusin", handleHover);
    })

    function handleClick() {
        playAudio(clickSound);
        navigator.vibrate(50);
    }

    function handleHover() {
        playAudio(selectSound);
    }

    const buttonProps = props;
    delete buttonProps.accentColor;

    return (
        <button tabIndex={0} ref={buttonRef} {...buttonProps} class={`${style.gradientButton} ${props.class || ""}`} >
            {props.children}
        </button>
    )
}

export default GradientButton;