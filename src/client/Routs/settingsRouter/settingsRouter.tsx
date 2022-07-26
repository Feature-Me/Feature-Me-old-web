import SettingsPage from "Pages/settings/settingsPage";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const SettingsRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<>general</>}/>
            <Route path="/gameplay" element={<>gameplay</>}/>
            <Route path="/video" element={<>video</>}/>
            <Route path="/audio" element={<>audio</>}/>
        </Routes>
    )
}

export default SettingsRouter;