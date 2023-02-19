import * as solid from "solid-js";
import clsx from "clsx";


import style from "./NormalInput.module.scss";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            normalInputModel: boolean;
        }
    }
}

const NormalInput: solid.Component<solid.JSX.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const flag = props.maxLength;
    const [length, setLength] = solid.createSignal(0);

    function normalInputModel(el: HTMLInputElement) {
        solid.onMount(() => {
            el.addEventListener("input", () => setLength(el.value.length))
        });
        solid.onCleanup(() => {
            el.removeEventListener("input", () => setLength(el.value.length))
        })
    }

    return (
        <div class={style.inputContainer}>
            <input {...props} class={clsx(style.input, props.class)} use:normalInputModel />
            <span class={clsx(style.textCount, flag && style.active)}>
                {length} / {props.maxLength}
            </span>
        </div>
    )
}

export default NormalInput;