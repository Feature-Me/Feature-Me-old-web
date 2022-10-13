import React from "react";
import { useNavigate } from "react-router";


const Initializer:React.FC  = ()=>{
    const navigate = useNavigate();


    React.useEffect(()=>{
        if(sessionStorage.getItem("splashScreen")){
            navigate("./title");
        }else{
            sessionStorage.setItem("splashScreen","true");
            navigate("./splash");
        }
    })
    return(
        <div></div>
    )

}

export default Initializer;