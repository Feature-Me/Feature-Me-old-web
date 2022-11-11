import SettingsPage from "Pages/settings/settingsPage";
import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import ServerExplorer from "Pages/play/multiplayer/serverExplorer/serverExplorer";

const MultiPlayRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"./menu"} />} />
            <Route path="/menu" element={<ServerExplorer />} />
        </Routes>
    )
}

export default MultiPlayRouter;