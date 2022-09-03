import React from "react";

import style from "./rangeInput.scss";

const RangeInput: React.FC<{ className?: string, children?: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement>,min?:number,max?:number,step?:number,value:number}> = (props) => {

    const [value,setValue] = React.useState(props.value||50);

    function handleChange(value:number){
        if(value) {
            setValue(Number(value))
        }
    }
    return (
        <>
            <input type="range" className={`${style.chamferedbutton} ${props.className || ""}`} min={props.min || 0} max={props.max || 100} step={props.step || 1} value={value} onChange={(e) => {handleChange(Number(e.target.value))}} />
            <input type="number" min={props.min} max={props.max || 100} step={props.step || 1} value={value} onChange={(e) => {handleChange(Number(e.target.value))}} />
        </>
    )
}

export default RangeInput;