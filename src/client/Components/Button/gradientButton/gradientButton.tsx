import * as solid from "solid-js";

import style from "./chamferedButton.module.scss";

interface buttonPropsType extends solid.JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    accentColor?: string
}


const GradientButton: solid.Component<buttonPropsType> = (props) => {

    let buttonRef: HTMLButtonElement|undefined;

    //if there is custom accent color,set lisner to override color
    solid.createEffect(() => {
    })

    function setHoverAction(active: boolean) {

    }

    return (
        <button onClick={props.onClick} class={`${style.gradientButton} ${props.class || ""}`} ref={buttonRef} >
            {props.children}
        </button>
    )
}

export default GradientButton;