import { useNavigate } from "@solidjs/router";
import * as solid from "solid-js";
import { setRenderBackground } from "State/backgroundState";

import connectToWebSocket from "./loadingFunctions/connectToWebSocket";
import initStorageFromLoader from "./loadingFunctions/localStorage";

import style from "./loader.module.scss"

const Loader: solid.Component = () => {
    const navigate = useNavigate();
    const [title, setTitle] = solid.createSignal("");
    const [description, setDescription] = solid.createSignal("");

    const functions: Array<FunctionWithType<solid.Setter<string>>> = [initStorageFromLoader, connectToWebSocket, (e, t) => setDescription("done")];

    solid.onMount(async () => {
        setRenderBackground(true);

        for (const func of functions) {
            try {
                await func(setTitle, setDescription);
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <div class={style.loader}>
            <div class={style.modal}>
                <h1>{title() || "Loading"}</h1>
                <hr />
                <p>
                    {description() || "Game system is initializing"}
                </p>
            </div>

        </div>
    )
}

export default Loader;