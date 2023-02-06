import { Navigate, Route, Routes, useBeforeLeave, useMatch, useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

import style from "./setup.module.scss"
import sleep from "Utils/sleep/sleep";
import SetupCautions from "./contents/cautions/cautions";


const Setup: solid.Component = () => {
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);
    const [pageCount, setPageCount] = solid.createSignal<number>(0);
    const pages = [SetupCautions];
    const [currentPage, setCurrentPage] = solid.createSignal(pages[pageCount()])

    useBeforeLeave(async (e) => {
        if (!e.defaultPrevented) e.preventDefault();
        await sleep(1000);
        e.retry(true);
    })


    return (
        <div class={style.setup} classList={{ blackOut: fadeOut() }}>
            <Routes>
                <Route path={"/"} element={<Navigate href={"./caution"} />} />
                <Route path={"/caution"} element={<SetupCautions />} />
            </Routes>
        </div>
    )
}

export default Setup;