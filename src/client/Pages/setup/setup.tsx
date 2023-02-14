import { Navigate, Route, Routes, useBeforeLeave, useLocation, useMatch, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

import style from "./setup.module.scss"
import sleep from "Utils/sleep/sleep";
import SetupCautions from "./contents/cautions/cautions";
import SetupTerms from "./contents/terms/terms";
import SetupImportConfig from "./contents/import/import";
import SetupSettings from "./contents/settings/settings";


const Setup: solid.Component = () => {

    solid.onCleanup(() => {
        const environment = JSON.parse(localStorage.getItem("environment") || "{initializedSettings:false}");
        environment.initializedSettings = true;
        localStorage.setItem("environment", JSON.stringify(environment));
    })

    return (
        <div class={style.setup}>
            <Routes>
                <Route path={"/"} element={<Navigate href={"./caution"} />} />
                <Route path={"/caution"} element={<SetupCautions />} />
                <Route path={"/terms"} element={<SetupTerms />} />
                <Route path={"/import"} element={<SetupImportConfig />} />
                <Route path={"/settings"} element={<SetupSettings />} />
            </Routes>
        </div>
    )
}

export default Setup;