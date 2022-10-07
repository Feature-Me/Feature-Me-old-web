
import ChartConverter from "Pages/editor/chartConverter/chartConverter";
import EditorStartPage from "Pages/editor/start/startPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ChartEditorRouter from "./chartEditor/chartEditorRouter";
const EditorRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<EditorStartPage />} />
            <Route path="/charteditor/*" element={<ChartEditorRouter />} />
            <Route path="/chartconverter" element={<ChartConverter />} />
        </Routes>
    )
}

export default EditorRouter;