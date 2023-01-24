import i18n from "i18n/i18n";
import I18nProvider from "Components/i18nProvider/i18nProvider";
import i18next from "i18next";
import * as solid from "solid-js";
import { Router, staticIntegration } from "@solidjs/router";

import PageRouter from "Router/router";

import Loading from "Components/LoadingCover/loading";
import CrashHandler from "Components/ErrorBoundary/ApplicatonCrashHandler/crashHandler";

import style from "./App.module.scss";
import "./style.scss";
import Background from "Components/Background/background";

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
                        <div class={style.app}>
                            <div class={style.background}>
                                <Background />
                            </div>
                            <div class={style.content}>
                                <PageRouter />
                            </div>
                            <div class={style.overlay}>

                            </div>
                        </div>
                    </Router>
                </I18nProvider>
            </solid.Show>
        </solid.ErrorBoundary>
    );
}

export default App