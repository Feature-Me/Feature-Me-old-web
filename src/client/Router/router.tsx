import * as solid from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";

import Initializer from "Pages/appInitializer/appInitializer";
import SplashScreen from "Pages/splash/splashScreen";
import Loader from "Pages/appLoader/loader";
import Title from "Pages/title/title";
import Setup from "Pages/setup/setup";
import Home from "Pages/home/home";


const PageRouter: solid.Component = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Navigate href={"/splash"} />} />
            <Route path={"/splash"} element={<SplashScreen />} />
            <Route path={"/load"} element={<Loader />} />
            <Route path={"/title"} element={<Title />} />
            <Route path={"/setup/*"} element={<Setup />} />
            <Route path={"/home"} element={<Home />} />
        </Routes>
    )
}

export default PageRouter;