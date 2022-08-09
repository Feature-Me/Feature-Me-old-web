import React from "react";

import style from "./chamferedTextInput.scss";

const ChamferdTextInput: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
    return (
        <div contentEditable className={style.chamferdTextInput}>
            {props.children}
        </div>
    )
}

export default ChamferdTextInput;