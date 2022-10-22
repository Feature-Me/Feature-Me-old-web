import React from "react";
import { useNavigate } from "react-router";

import style from "./initializer.scss";

const Initializer:React.FC  = ()=>{
    const navigate = useNavigate();


    React.useEffect(()=>{
        navigate("./splash");
    })
    return(
        <div className={style.initializer}></div>
    )

}

export default Initializer;