import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

import { useI18n } from "intl/intlContext";

import { setRenderBackground } from "State/backgroundState";
import GradientButton from "Components/Button/gradientButton/gradientButton";

import connectToWebSocket from "./loadingFunctions/connectToWebSocket";
import initStorageFromLoader from "./loadingFunctions/localStorage";
import path from "path-browserify";
import sleep from "Utils/sleep/sleep";
import { setOfflineMode } from "State/network/offlineMode";
import uptdateResourcesFromLoader from "./loadingFunctions/updateResources";

import defaultUrl from "Assets/StaticInfo/defaultUrl.json";
import style from "./loader.module.scss"

const Loader: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useI18n();
    const [title, setTitle] = solid.createSignal<string>("");
    const [description, setDescription] = solid.createSignal<string>("");
    const [activeInteraction, setActiveInteraction] = solid.createSignal<Array<string>>(["cancel"]);
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);
    let rejectFunc = () => { };

    const functions: Array<FunctionWithType<solid.Setter<string>>> = [initStorageFromLoader, connectToWebSocket, /* uptdateResourcesFromLoader */];
    const interactions = [
        { type: "cancel", label: t("appLoader.cancel"), func: () => rejectFunc() },
        { type: "ok", label: t("appLoader.ok"), func: () => { } },
        { type: "retry", label: t("appLoader.retry"), func: retry },
        { type: "report", label: t("appLoader.report"), func: () => window.open(path.join(defaultUrl.github.repo, "/issues")) },
        { type: "offline", label: t("appLoader.offline"), func: runOfflineMode }
    ]


    solid.onMount(() => {
        setRenderBackground(true);
        if (!navigator.onLine) setOfflineMode(true);
        runLoaders().then(async () => {
            setTitle(t("appLoader.done"));
            setDescription(t("appLoader.ready"));
            setActiveInteraction([])
            await sleep(1500);
            setFadeOut(true)
            await sleep(500);
            navigation();
        }).catch(err => {
            console.error(err);
        });
    });

    solid.onCleanup(() => {
        rejectFunc();
    })

    function retry() {
        runLoaders();
    }

    function runOfflineMode() {
        setOfflineMode(true);
        runLoaders();
    }

    function navigation() {
        const environment = JSON.parse(localStorage.getItem("environment") || "{}");
        if (environment.initializedSettings) navigate("/title");
        else navigate("/setup");
    }

    async function runLoaders() {
        try {
            return await new Promise<void>(async (resolve, reject) => {
                rejectFunc = reject;
                setActiveInteraction(["cancel"]);
                for (const func of functions) {
                    try {
                        await func(setTitle, setDescription);
                    } catch (error) {
                        console.error(error);
                        reject(error);
                        break;
                    }
                }
                resolve();
            });
        } catch (err) {
            const timeout = String(err).includes("timed out");
            setTitle(t("appLoader.failed.title"));
            setDescription(`${t("appLoader.failed.description")}\n${err || ""}`);
            setActiveInteraction(["retry", "report"]);
            if (timeout) setActiveInteraction(i => [...i, "offline"]);
            throw new Error(String(err));
        }
    }


    return (
        <div class={style.loader} classList={{ blackOut: fadeOut() }}>
            <div class={style.modal}>
                <h1>{title() || "Loading"}</h1>
                <hr />
                <p>
                    {description() || "Game system is initializing"}
                </p>
                <hr />
                <div class={style.interactions}>
                    <solid.For each={activeInteraction()}>
                        {
                            (item) => {
                                const btn = interactions.find(i => i.type == item);
                                return (
                                    <GradientButton onClick={btn?.func}>{btn?.label}</GradientButton>
                                )
                            }
                        }
                    </solid.For>
                </div>
            </div>
        </div>
    )
}

export default Loader;