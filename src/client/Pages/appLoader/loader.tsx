import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";

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
import ModernModal from "Components/Modal/ModernModal/ModernModal";
import { useTransContext } from "@mbarzda/solid-i18next";
import loadConfigFromLoader from "./loadingFunctions/loadConfig";
import setupAudioFromLoader from "./loadingFunctions/setupAudio";

interface activeButtonType {
    label: solid.JSXElement
    onClick: solid.JSX.EventHandler<HTMLButtonElement, MouseEvent>
}

const Loader: solid.Component = () => {
    const navigate = useNavigate();
    const [t, intl] = useTransContext();
    const [title, setTitle] = solid.createSignal<string>("");
    const [description, setDescription] = solid.createSignal<string>("");
    const [activeInteraction, setActiveInteraction] = solid.createSignal<Array<string>>(["cancel"]);
    const [fadeOut, setFadeOut] = solid.createSignal<boolean>(false);
    let rejectFunc = () => { };

    const functions: Array<FunctionWithType<solid.Setter<string>>> = [initStorageFromLoader, connectToWebSocket, loadConfigFromLoader, setupAudioFromLoader /* uptdateResourcesFromLoader */];
    const interactionList = [
        { type: "cancel", label: t("appLoader.cancel"), func: () => rejectFunc() },
        { type: "ok", label: t("appLoader.ok"), func: () => { } },
        { type: "retry", label: t("appLoader.retry"), func: retry },
        { type: "report", label: t("appLoader.report"), func: () => window.open(path.join(defaultUrl.github.repo, "/issues")) },
        { type: "offline", label: t("appLoader.offline"), func: runOfflineMode }
    ]
    const [activeButton, setActiveButton] = solid.createSignal<Array<activeButtonType>>([]);


    solid.onMount(() => {
        setRenderBackground(true);
        if (!navigator.onLine) setOfflineMode(true);
        startLoading()
    });

    solid.onCleanup(() => {
        rejectFunc();
    });

    solid.createEffect(() => {
        const button = interactionList.filter(i => activeInteraction().includes(i.type)).map(j => { return { label: j.label, onClick: j.func } })
        setActiveButton(button);
    })

    function startLoading() {
        runLoaders().then(async () => {
            setTitle(t("appLoader.done").toString());
            setDescription(t("appLoader.ready").toString());
            setActiveInteraction([])
            await sleep(1500);
            setFadeOut(true)
            await sleep(500);
            navigation();
        }).catch(err => {
            console.error(err);
        });
    }

    function retry() {
        startLoading();
    }

    function runOfflineMode() {
        setOfflineMode(true);
        startLoading();
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
            setTitle(t("appLoader.failed.title").toString());
            setDescription(`${t("appLoader.failed.description")}\n${err || ""}`);
            setActiveInteraction(["retry", "report"]);
            if (timeout) setActiveInteraction(i => [...i, "offline"]);
            throw new Error(String(err));
        }
    }


    return (
        <div class={style.loader} classList={{ blackOut: fadeOut() }}>
            <ModernModal title={title()} interactions={activeButton()} show noBlur muted animate={"fade"} containerProps={{ style: { "background-color": "transparent" } }}>
                <p>
                    {description() || "Initializing game system"}
                </p>
            </ModernModal>
        </div>
    )
}

export default Loader;