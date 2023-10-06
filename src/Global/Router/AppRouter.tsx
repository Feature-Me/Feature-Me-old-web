import { Navigate, Route, Routes } from "@solidjs/router";

import Splash from "Scenes/Splash/Splash";
import Title from "Scenes/Title/Title";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate href={"/splash"} />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="title" element={<Title />} />
        </Routes>
    )
}

export default App;