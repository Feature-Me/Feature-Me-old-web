import * as solid from "solid-js";

import style from "./gradientButton.module.scss";

interface buttonPropsType extends solid.JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    accentColor?: string
}


const GradientButton: solid.Component<buttonPropsType> = (props) => {

    let buttonRef: HTMLButtonElement | undefined;

    //if there is custom accent color,set lisner to override color
    solid.createEffect(() => {
    })

    function setHoverAction(active: boolean) {

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