import Head from "Block/head/head";
import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";
import React from "react";

const ResultPage:React.FC = () =>{
    const scenechange = useSeneChangeNavigation();
    return(
    <div>
            <Head title="Reslut" backFunc={() => scenechange(-3)} />
    </div>
    )
}

export default ResultPage