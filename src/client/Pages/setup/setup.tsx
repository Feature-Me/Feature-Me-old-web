import { Navigate, Route, Routes, useBeforeLeave, useMatch, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

import style from "./setup.module.scss"
import sleep from "Utils/sleep/sleep";
import SetupCautions from "./contents/cautions/cautions";
import SetupTerms from "./contents/terms/terms";


const Setup: solid.Component = () => {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);

/*     useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        await sleep(1000);
        e.retry(true);
    }) */

    return (
        <div class={style.setup} classList={{ blackOut: fadeOut() }}>
            <Routes>
                <Route path={"/"} element={<Navigate href={"./caution"} />} />
                <Route path={"/caution"} element={<SetupCautions />} />
                <Route path={"/terms"} element={<SetupTerms />} />
            </Routes>
        </div>
    )
}

export default Setup;