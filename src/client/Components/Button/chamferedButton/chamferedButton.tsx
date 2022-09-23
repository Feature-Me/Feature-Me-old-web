import React from "react";

import style from "./chamferedButton.scss";

type buttonPropsType = JSX.IntrinsicElements["button"] & {
    accentColor?: string
}

const ChamferdButton: React.FC<buttonPropsType> = (props) => {

    const chamferedButtonRef = React.useRef<HTMLButtonElement>(null);

    //if there is custom accent color,set lisner to override color
    React.useEffect(() => {
        if (!chamferedButtonRef.current || !props.accentColor) return;
        chamferedButtonRef.current.addEventListener("mouseenter", () => setHoverAction(true));
        chamferedButtonRef.current.addEventListener("mouseleave", () => setHoverAction(false));
        return () => {
            if (!chamferedButtonRef.current) return;
            chamferedButtonRef.current.removeEventListener("mouseenter", () => setHoverAction(true));
            chamferedButtonRef.current.removeEventListener("mouseleave", () => setHoverAction(false));
        }
    }, [])

    function setHoverAction(active: boolean) {
        if (!chamferedButtonRef.current || !props.accentColor) return;
        if (active) chamferedButtonRef.current.style.backgroundColor = props.accentColor;
        else chamferedButtonRef.current.style.backgroundColor = "";
    }

    return (
        <button onClick={props.onClick} className={`${style.chamferedbutton} ${props.className || ""}`} ref={chamferedButtonRef} >
            {props.children}
        </button>
    )
}

export default ChamferdButton;