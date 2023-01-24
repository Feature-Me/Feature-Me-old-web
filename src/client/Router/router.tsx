import * as solid from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";

import Initializer from "Pages/initializer/initializer";
import SplashScreen from "Pages/splash/splashScreen";
import Loader from "Pages/loader/loader";


const PageRouter: solid.Component = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Navigate href={"/splash"} />} />
            <Route path={"/splash"} element={<SplashScreen />} />
            <Route path={"/load"} element={<Loader />} />
        </Routes>
    )
}

export default PageRouter;