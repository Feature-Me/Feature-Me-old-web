import React from "react";
import {Routes,Route } from "react-router-dom";

import Title from "../Pages/title/title/title";
import EditorRouter from "./editorRouter/editorRouter";
import PlayMenuRouter from "./menuRouter/menuRouter";
import MusicRoomRouter from "./musicRoomRouter/musicRoomRouter";

const PageRouter: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<Title />} />
                <Route path="/play/*" element={<PlayMenuRouter />} />
                <Route path="/musicroom/*" element={<MusicRoomRouter />} />
                <Route path="/editor/*" element={<EditorRouter />} />
            </Routes>
        )
}

export default PageRouter;