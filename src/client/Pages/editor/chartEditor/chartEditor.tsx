import Header from "Block/head/head";
import React from "react";
import { Route, useParams } from "react-router";

import style from "./chartEditor.scss"

const ChartEditor:React.FC = () =>{
    const params = useParams()
    return(
        <div>
            <Header title="Chart Editor" />
            {params["id"]}
        </div>
    )
}

export default ChartEditor