import NoteProperties from "Pages/editor/chartEditor/chart/propertyEditor/noteProps";
import PropertyOverView from "Pages/editor/chartEditor/chart/propertyEditor/overView";
import ChartEditor from "Pages/editor/chartEditor/chartEditor";
import ChartLoader from "Pages/editor/chartEditor/chartLoader/chartLoader";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
const ChartEditorChartPropertyRouter: React.FC<{ current: chartEditorChart, setCurrent: React.Dispatch<React.SetStateAction<chartEditorChart>> }> = (props) => {
    return (
        <Routes>
            <Route path="/" element={<PropertyOverView {...props} />} />
            <Route path="/note" element={<NoteProperties {...props} />} />
        </Routes>
    )
}

export default ChartEditorChartPropertyRouter;