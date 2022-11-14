import AudioSettings from "Pages/settings/settingsContent/audioSettings/audioSettings";
import GameplaySettings from "Pages/settings/settingsContent/gameplay/gameplaySettings";
import GeneralSettings from "Pages/settings/settingsContent/general/generalSettings";
import GraphicsSettings from "Pages/settings/settingsContent/graphics/graphicsSettings";
import UserSettings from "Pages/settings/settingsContent/user/userSettings";
import SettingsPage from "Pages/settings/settingsPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SettingsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<GeneralSettings />} />
            <Route path="/gameplay" element={<GameplaySettings />} />
            <Route path="/graphics" element={<GraphicsSettings />} />
            <Route path="/audio" element={<AudioSettings />} />
            <Route path="/user" element={<UserSettings />} />
            <Route path="/storage" element={<>storage</>} />
        </Routes>
    )
}

export default SettingsRouter;