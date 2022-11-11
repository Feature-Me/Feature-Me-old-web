import React from "react";

import style from "./toggleSwitch.scss"
const ToggleSwitch: React.FC<{ checked: boolean, onChange?: FunctionWithTypedProps<boolean> }> = (props) =>{

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        if(props.onChange) props.onChange(e.target.checked)
    }

    return(
        <label className={style.wrapper}>
            <input type="checkbox" className={style.toggle} defaultChecked={props.checked} onChange={handleChange} />
        </label>
    )
}

export default ToggleSwitch