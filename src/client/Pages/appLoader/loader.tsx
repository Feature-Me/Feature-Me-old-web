import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import i18next from "i18next";

import { setRenderBackground } from "State/backgroundState";
import GradientButton from "Components/Button/gradientButton/gradientButton";

import connectToWebSocket from "./loadingFunctions/connectToWebSocket";
import initStorageFromLoader from "./loadingFunctions/localStorage";

import defaultUrl from "Assets/StaticInfo/defaultUrl.json";

import style from "./loader.module.scss"
import path from "path-browserify";
import uptdateResourcesFromLoader from "./loadingFunctions/updateResources";
import sleep from "Utils/sleep/sleep";



const Loader: solid.Component = () => {
    const navigate = useNavigate();
    const [title, setTitle] = solid.createSignal<string>("");
    const [description, setDescription] = solid.createSignal<string>("");
    const [activeInteraction, setActiveInteraction] = solid.createSignal<Array<string>>(["cancel"]);
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);
    let rejectFunc = () => { };

    const functions: Array<FunctionWithType<solid.Setter<string>>> = [initStorageFromLoader, connectToWebSocket, /* uptdateResourcesFromLoader */];
    const interactions = [
        { type: "cancel", label: i18next.t("appLoader.cancel"), func: () => rejectFunc() },
        { type: "ok", label: i18next.t("appLoader.ok"), func: () => { } },
        { type: "retry", label: i18next.t("appLoader.retry"), func: retry },
        { type: "report", label: i18next.t("appLoader.report"), func: () => window.open(path.join(defaultUrl.github.repo, "/issues")) }
    ]


    solid.onMount(() => {
        setRenderBackground(true);
        runLoaders().then(async () => {
            await sleep(1500);
            setFadeOut(true)
            await sleep(500);
            navigation();
        });
    });

    solid.onCleanup(() => {
        rejectFunc();
    })

    function retry() {
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
        } catch (error_1) {
            setTitle(i18next.t("appLoader.failed.title"));
            setDescription(`${i18next.t("appLoader.failed.description")}\n${error_1 || ""}`);
            setActiveInteraction(["retry", "report"]);
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