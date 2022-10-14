
import ChartConverter from "Pages/editor/chartConverter/chartConverter";
import EditorStartPage from "Pages/editor/start/startPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ChartEditorPageRouter from "./chartEditor/chartEditorPageRouter";
const EditorRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<EditorStartPage />} />
            <Route path="/charteditor/:id/*" element={<ChartEditorPageRouter />} />
            <Route path="/chartconverter" element={<ChartConverter />} />
            <Route path="/settings" element={<>Settings</>} />
        </Routes>
    )
}

export default EditorRouter;