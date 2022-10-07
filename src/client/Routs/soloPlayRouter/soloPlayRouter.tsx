import MusicGame3D from "Pages/play/musicGame/3d/musicGame3d";
import MusicSelector from "Pages/play/musicSelector/musicSelector";
import SoloRelay from "Pages/play/relay/soloRelay";
import ResultPage from "Pages/play/result/resultPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SoloPlayRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/select" element={<MusicSelector />} />
            <Route path="/relay/:diff" element={<SoloRelay />} />
            <Route path="/game" element={<MusicGame3D />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    )
}

export default SoloPlayRouter;