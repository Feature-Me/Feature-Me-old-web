import GameplaySettings from "Pages/settings/settingsContent/gameplay/gameplaySettings";
import GeneralSettings from "Pages/settings/settingsContent/general/generalSettings";
import SettingsPage from "Pages/settings/settingsPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SettingsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GeneralSettings />}/>
            <Route path="/gameplay" element={<GameplaySettings />}/>
            <Route path="/video" element={<>video</>}/>
            <Route path="/audio" element={<>audio</>}/>
            <Route path="/storage" element={<>storage</>}/>
        </Routes>
    )
}

export default SettingsRouter;