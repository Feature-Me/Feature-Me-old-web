import * as solid from "solid-js";

import style from "./chamferedButton.module.scss";

interface buttonPropsType extends solid.JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    accentColor?: string
}


const ChamferedButton: solid.Component<buttonPropsType> = (props) => {

    let chamferedButtonRef: HTMLButtonElement | undefined;

    //if there is custom accent color,set lisner to override color
    solid.createEffect(() => {
        if (!chamferedButtonRef) return;
        chamferedButtonRef.addEventListener("mouseenter", () => setHoverAction(true));
        chamferedButtonRef.addEventListener("mouseleave", () => setHoverAction(false));
    });

    solid.onCleanup(() => {
        if (!chamferedButtonRef) return;
        chamferedButtonRef.removeEventListener("mouseenter", () => setHoverAction(true));
        chamferedButtonRef.removeEventListener("mouseleave", () => setHoverAction(false));
    })

    function setHoverAction(active: boolean) {
        if (!chamferedButtonRef || !props.accentColor) return;
        if (active) chamferedButtonRef.style.backgroundColor = props.accentColor;
        else chamferedButtonRef.style.backgroundColor = "";
    }

    const buttonProps = props;
    delete buttonProps.accentColor;

    return (
        <button {...buttonProps} class={`${style.chamferedbutton} ${props.class || ""}`} ref={chamferedButtonRef} >
            {props.children}
        </button>
    )
}

export default ChamferedButton;