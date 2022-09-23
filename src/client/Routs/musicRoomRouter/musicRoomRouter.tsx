import MusicRoom from "Pages/musicroom/musicRoom";
import React from "react";

import { Routes, Route, Link } from "react-router-dom";

const MusicRoomRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MusicRoom />} />
        </Routes>
    )
}

export default MusicRoomRouter;