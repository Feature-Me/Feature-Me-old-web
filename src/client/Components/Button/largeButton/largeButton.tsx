import * as solid from "solid-js";
import playAudio from "Utils/PlayAudio/playAudio";

import style from "./largeButton.module.scss";

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";


interface buttonPropsType extends solid.JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    accentColor?: string
}

const LargeButton: solid.Component<buttonPropsType> = (props) => {

    let buttonRef: HTMLButtonElement | undefined;

    const buttonProps = props;
    delete buttonProps.accentColor;

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

    return (
        <button tabIndex={0} ref={buttonRef} {...buttonProps} class={`${style.largeButton} ${props.class || ""}`}>
            <h2>{props.children}</h2>
        </button>
    )
}

export default LargeButton;