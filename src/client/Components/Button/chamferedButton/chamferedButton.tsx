import React from "react";

import style from "./chamferedButton.scss";

const ChamferdButton: React.FC<{className?:string,children?:React.ReactNode,onClick?:React.MouseEventHandler<HTMLButtonElement>,color?:"red"}> = (props) => {

    return (
        <button onClick={props.onClick} className={`${style.button} ${props.className||""}`} data-color={props.color} >
            {props.children}
        </button>
    )
}

export default ChamferdButton;