import React from "react";

const ChartEditorDocs:React.FC = () =>{

    React.useEffect(() => {
        document.title = "Editor - Docs - Feature Me"
    }, [])

    return(
        <div>
            Docs for Feature Me editor
        </div>
    )
}

export default ChartEditorDocs;