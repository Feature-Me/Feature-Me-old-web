import React from "react";

import style from "./docs.scss";

const ChartEditorDocs:React.FC = () =>{

    React.useEffect(() => {
        document.title = "Editor - Docs - Feature Me"
    }, [])

    return(
        <div className={style.docs}>
            <iframe src="https://feature-me-wiki.vercel.app" />
        </div>
    )
}

export default ChartEditorDocs;