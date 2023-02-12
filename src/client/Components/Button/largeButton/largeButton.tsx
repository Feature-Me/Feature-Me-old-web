import * as solid from "solid-js";

import style from "./largeButton.module.scss";


interface buttonPropsType extends solid.JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    accentColor?: string
}

const LargeButton: solid.Component<buttonPropsType> = (props) => {

    let buttonRef: HTMLButtonElement | undefined;

    const buttonProps = props;
    delete buttonProps.accentColor;

    function vibration() {
        navigator.vibrate(50);
    }

    return (
        <button tabIndex={0} ref={buttonRef} onClick={vibration} {...buttonProps} class={`${style.largeButton} ${props.class || ""}`}>
            <h2>{props.children}</h2>
        </button>
    )
}

export default LargeButton;