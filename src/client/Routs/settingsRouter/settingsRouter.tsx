import AudioSettings from "Pages/play/settings/settingsContent/audioSettings/audioSettings";
import GameplaySettings from "Pages/play/settings/settingsContent/gameplay/gameplaySettings";
import GeneralSettings from "Pages/play/settings/settingsContent/general/generalSettings";
import GraphicsSettings from "Pages/play/settings/settingsContent/graphics/graphicsSettings";
import SettingsPage from "Pages/play/settings/settingsPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SettingsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GeneralSettings />}/>
            <Route path="/gameplay" element={<GameplaySettings />}/>
            <Route path="/graphics" element={<GraphicsSettings />}/>
            <Route path="/audio" element={<AudioSettings />}/>
            <Route path="/storage" element={<>storage</>}/>
        </Routes>
    )
}

export default SettingsRouter;