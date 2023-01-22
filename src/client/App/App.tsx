import i18n from "i18n/i18n";
import I18nProvider from "Components/i18nProvider/i18nProvider";
import i18next from "i18next";
import * as solid from "solid-js";

import version from "Assets/StaticInfo/version.json";

import style from "./App.module.scss"
import Loading from "Components/LoadingCover/loading";
import CrashHandler from "Components/ErrorBoundary/ApplicatonCrashHandler/crashHandler";

const App: solid.Component = () => {
    const [loaded, setLoaded] = solid.createSignal(true);
    solid.onMount(async () => {
        await i18n;
        setLoaded(true);
    });

    solid.createEffect(() => {
        const environment = JSON.parse(localStorage.getItem("environment") || "{}");
        environment.language = i18next.language;
        localStorage.setItem("environment", JSON.stringify(environment));
    });

    return (
        <solid.ErrorBoundary fallback={(err, reset) => <CrashHandler error={err} reset={reset} />}>
            <solid.Show when={loaded()} fallback={<Loading />}>
                <I18nProvider i18n={i18next}>
                    <div class={style.app}>
                        Feature Me {version.version} <br /> With solid js
                    </div>
                </I18nProvider>
            </solid.Show>
        </solid.ErrorBoundary>
    );
}

export default App