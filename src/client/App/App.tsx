import i18n from 'i18n/i18n';
import I18nProvider from "Components/i18nProvider/i18nProvider";
import i18next from "i18next";
import * as solid from 'solid-js';

import style from "./App.module.scss"

const App: solid.Component = () => {
    const [loaded, setLoaded] = solid.createSignal(false);
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
        <solid.Show when={loaded()}>
            <I18nProvider i18n={i18next}>
                <div class={style.app}>
                    Feature Me With solid js
                </div>
            </I18nProvider>
        </solid.Show>
    );
}

export default App