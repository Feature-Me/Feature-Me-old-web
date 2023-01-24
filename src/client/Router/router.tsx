import * as solid from "solid-js";
import { Routes, Route } from "@solidjs/router";

import Initializer from "Pages/initializer/initializer";
import SplashScreen from "Pages/splash/splashScreen";


const PageRouter: solid.Component = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Initializer />} />
            <Route path={"/splash"} element={<SplashScreen />} />
            
        </Routes>
    )
}

export default PageRouter;