import React from "react";
import {Routes,Route } from "react-router-dom";

import Title from "../Pages/title/title/title";
import PlayMenuRouter from "./menuRouter/menuRouter";

const PageRouter: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<Title />} />
                <Route path="/play/*" element={<PlayMenuRouter />} />
            </Routes>
        )
}

export default PageRouter;