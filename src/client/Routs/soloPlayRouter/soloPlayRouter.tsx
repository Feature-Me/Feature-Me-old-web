import MusicGame from "Pages/musicGame/musicGame";
import MusicSelector from "Pages/musicSelector/musicSelector";
import SoloRelay from "Pages/relay/soloRelay";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SoloPlayRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/select" element={<MusicSelector />}/>
            <Route path="/relay/:diff" element={<SoloRelay />}/>
            <Route path="/game" element={<MusicGame />} />
        </Routes>
    )
}

export default SoloPlayRouter;