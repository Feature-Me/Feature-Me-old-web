import ChartEditor from "Pages/editor/chartEditor/chartEditor";
import ChartLoader from "Pages/editor/chartEditor/chartLoader/chartLoader";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
const ChartEditorPageRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ChartLoader />} />
            <Route path="/edit/*" element={<ChartEditor />} />
            <Route path="/export" element={<>Export</>} />
        </Routes>
    )
}

export default ChartEditorPageRouter;