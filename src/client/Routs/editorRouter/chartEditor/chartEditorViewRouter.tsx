import ChartEditorChartEditPage from "Pages/editor/chartEditor/chart/chart";
import ChartEditor from "Pages/editor/chartEditor/chartEditor";
import ChartLoader from "Pages/editor/chartEditor/chartLoader/chartLoader";
import ChartEditorDocs from "Pages/editor/chartEditor/docs/docs";
import ChartEditorMetadata from "Pages/editor/chartEditor/metadata/metadata";
import ChartEditorMusic from "Pages/editor/chartEditor/music/music";
import ChartEditorOverView from "Pages/editor/chartEditor/overview/overview";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
const ChartEditorViewRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/overview" element={<ChartEditorOverView />} />
            <Route path="/metadata" element={<ChartEditorMetadata />} />
            <Route path="/music" element={<ChartEditorMusic />} />
            <Route path="/chart" element={<ChartEditorChartEditPage />} />
            <Route path="/docs" element={<ChartEditorDocs />} />
        </Routes>
    )
}

export default ChartEditorViewRouter;