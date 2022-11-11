import SettingsPage from "Pages/settings/settingsPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MultiPlayRouter from "Routs/multiPlayRouter/multiPlayRouter";
import MenuPage from "../../Pages/play/menu/menuPage/menuPage";
import SoloPlayRouter from "../soloPlayRouter/soloPlayRouter";

const PlayMenuRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/solo/*" element={<SoloPlayRouter />} />
            <Route path="/multi/*" element={<MultiPlayRouter />} />
            <Route path="/settings/*" element={<SettingsPage />} />
        </Routes>
    )
}

export default PlayMenuRouter;