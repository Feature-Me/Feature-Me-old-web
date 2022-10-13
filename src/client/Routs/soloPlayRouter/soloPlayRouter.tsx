import SoloMusicGame from "Pages/play/musicGame/solo/soloMusicGame";
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
            <Route path="/game" element={<SoloMusicGame />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    )
}

export default SoloPlayRouter;