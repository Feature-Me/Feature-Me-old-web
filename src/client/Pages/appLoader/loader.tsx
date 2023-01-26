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
    let rejectFunc = () => { };

    const functions: Array<FunctionWithType<solid.Setter<string>>> = [initStorageFromLoader, connectToWebSocket, uptdateResourcesFromLoader];
    const interactions = [
        { type: "cancel", label: i18next.t("appLoader.cancel"), func: () => rejectFunc() },
        { type: "ok", label: i18next.t("appLoader.ok"), func: () => { } },
        { type: "retry", label: i18next.t("appLoader.retry"), func: runLoaders },
        { type: "report", label: i18next.t("appLoader.report"), func: () => window.open(path.join(defaultUrl.github.repo, "/issues")) }
    ]


    solid.onMount(() => {
        setRenderBackground(true);
        runLoaders();
    });

    function runLoaders() {
        new Promise<void>(async (resolve, reject) => {
            rejectFunc = reject;
            setActiveInteraction(["cancel"]);
            for (const func of functions) {
                try {
                    await func(setTitle, setDescription);
                } catch (error) {
                    console.error(error);
                    reject();
                    break;
                }
            }
            resolve();
        }).catch(() => {
            setTitle(i18next.t("appLoader.failed.title"));
            setDescription(i18next.t("appLoader.failed.description"));
            setActiveInteraction(["retry", "report"]);
        })
    }

    return (
        <div class={style.loader}>
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