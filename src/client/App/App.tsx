import I18nProvider from "Components/intlProvider/intlProvider";
import i18next from "i18next";
import * as solid from "solid-js";
import { Router, staticIntegration, pathIntegration } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";
import { TransProvider, useTransContext } from "@mbarzda/solid-i18next";

import PageRouter from "Router/router";

import { intlConfig } from "intl/intl";
import LanguageHelper from "Components/intlProvider/languageHelper";
import Loading from "Components/LoadingCover/loading";
import CrashHandler from "Components/ErrorBoundary/ApplicatonCrashHandler/crashHandler";
import Background from "Components/Background/background";
import GeneralOverlay from "Components/Overlay/General/generalOverlay";

import style from "./App.module.scss";
import "./style.scss";
import i18n from "intl/intl";
import NavigatorOverlay from "Components/Overlay/Navigator/navigatorOverlay";

const App: solid.Component = () => {
    const [loaded, setLoaded] = solid.createSignal(true);
    solid.onMount(async () => {
        await i18n;
        setLoaded(true);
    });

    return (
        <solid.ErrorBoundary fallback={(err, reset) => <CrashHandler error={err} reset={reset} />}>
            <solid.Show when={loaded()} fallback={<Loading />}>
                <TransProvider options={intlConfig}>
                    {/* memory router */}
                    <Router source={solid.DEV ? staticIntegration({ value: "" }) : pathIntegration()}>
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
                                <NavigatorOverlay />
                            </div>
                        </div>
                    </Router>
                    <LanguageHelper />
                </TransProvider>
            </solid.Show>
        </solid.ErrorBoundary>
    );
}

export default App