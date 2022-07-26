import SettingsPage from "Pages/settings/settingsPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MenuPage from "../../Pages/menu/menuPage/menuPage";
import SoloPlayRouter from "./soloPlayRouter/soloPlayRouter";

const PlayMenuRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/solo/*" element={<SoloPlayRouter />} />
            <Route path="/settings/*" element={<SettingsPage />} />
        </Routes>
    )
}

export default PlayMenuRouter;