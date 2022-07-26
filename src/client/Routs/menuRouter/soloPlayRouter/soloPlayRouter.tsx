import MusicSelector from "Pages/musicSelector/musicSelector";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SoloPlayRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/select" element={<MusicSelector />}/>
            <Route path="/relay/:diff" element={<></>}/>
        </Routes>
    )
}

export default SoloPlayRouter;