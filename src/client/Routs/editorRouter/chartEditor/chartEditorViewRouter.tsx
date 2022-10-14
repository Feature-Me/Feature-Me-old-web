import ChartEditor from "Pages/editor/chartEditor/chartEditor";
import ChartLoader from "Pages/editor/chartEditor/chartLoader/chartLoader";
import ChartEditorMetadata from "Pages/editor/chartEditor/metadata/metadata";
import ChartEditorOverView from "Pages/editor/chartEditor/overview/overview";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
const ChartEditorViewRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/overview" element={<ChartEditorOverView />} />
            <Route path="/metadata" element={<ChartEditorMetadata />} />
            <Route path="/music" element={<>Music</>} />
            <Route path="/chart" element={<>Chart</>} />
        </Routes>
    )
}

export default ChartEditorViewRouter;