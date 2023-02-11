import i18n from "intl/intl";
import I18nProvider from "Components/intlProvider/intlProvider";
import i18next from "i18next";
import * as solid from "solid-js";
import { Router, staticIntegration } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";

import PageRouter from "Router/router";

import Loading from "Components/LoadingCover/loading";
import CrashHandler from "Components/ErrorBoundary/ApplicatonCrashHandler/crashHandler";

import style from "./App.module.scss";
import "./style.scss";
import Background from "Components/Background/background";
import { Howl } from "howler";
import GeneralOverlay from "Components/Overlay/generalOverlay";

const App: solid.Component = () => {
    const [loaded, setLoaded] = solid.createSignal(true);
    solid.onMount(async () => {
        await i18n;
        setLoaded(true);
    });

    solid.createEffect(() => {
        if (!loaded()) return;
        console.log(`Language : ${i18next.language}`);
        console.log(`All avaliable languages : ${i18next.languages}`);

        const environment = JSON.parse(localStorage.getItem("environment") || "{}");
        environment.language = i18next.language;
        localStorage.setItem("environment", JSON.stringify(environment));
    });

    return (
        <solid.ErrorBoundary fallback={(err, reset) => <CrashHandler error={err} reset={reset} />}>
            <solid.Show when={loaded()} fallback={<Loading />}>
                <I18nProvider i18n={i18next}>
                    {/* memory router */}
                    <Router source={staticIntegration({ value: "" })}>
                        <div class={style.app} onContextMenu={(e) => e.preventDefault()}>
                            <div class={style.background}>
                                <Background />
                            </div>
                            <div class={style.content}>
                                <PageRouter />
                                <Toaster />
                            </div>
                            <div class={style.overlay}>
                                <GeneralOverlay />
                            </div>
                        </div>
                    </Router>
                </I18nProvider>
            </solid.Show>
        </solid.ErrorBoundary>
    );
}

export default App