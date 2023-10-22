import { Router, hashIntegration, memoryIntegration } from "@solidjs/router"
import AppRouter from "Global/Router/AppRouter"
import * as solid from "solid-js"
import { Transition } from "solid-transition-group";

import TypesafeI18n from "Global/Intl/i18n-solid";
import { loadAllLocales } from "Global/Intl/i18n-util.sync";
import PointerTrail from "Global/Components/PointerUtils/PointerTrail/PointerTrail";

import NavigatorOverlay from "Global/Components/DevUtils/NavigatorOverlay/NavigatorOverlay";

import "./style.scss";
import style from "./App.module.scss";


const App = () => {

    const [loaded, setLoaded] = solid.createSignal(false);

    solid.onMount(() => {
        loadAllLocales();
        setLoaded(true);
    })

    function enter(el: Element, done: () => void) {
        el.classList.add(style.enter);
        setTimeout(done, 500);
    }
    function exit(el: Element, done: () => void) {
        el.classList.add(style.exit);
        setTimeout(done, 500);
    }

    return (
        <solid.Show when={loaded()}>
            <div class={style.app}>
                <solid.ErrorBoundary fallback={"An error has occured"}>
                    <TypesafeI18n locale="ja">
                        <Router source={import.meta.env.DEV ? hashIntegration() : memoryIntegration()}>
                            <div class={style.scene}>
                                <AppRouter />
                            </div>
                            <NavigatorOverlay />
                        </Router>
                    </TypesafeI18n>
                    <PointerTrail />
                </solid.ErrorBoundary>
            </div>
        </solid.Show>
    )
}

export default App;