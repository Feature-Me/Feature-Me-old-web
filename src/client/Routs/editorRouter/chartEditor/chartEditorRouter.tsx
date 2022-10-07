
import ChartEditor from "Pages/editor/chartEditor/chartEditor";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
const ChartEditorRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/:id/*" element={<ChartEditor />} />
        </Routes>
    )
}

export default ChartEditorRouter;