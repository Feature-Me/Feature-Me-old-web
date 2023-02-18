import GradientButton from "Components/Button/gradientButton/gradientButton";
import * as solid from "solid-js";
import { Transition } from "solid-transition-group";
import playAudio from "Utils/PlayAudio/playAudio";

import style from "./ModernModal.module.scss";

import openModal from "Assets/Sounds/uiFallBack/openModal.m4a";
import closeModal from "Assets/Sounds/uiFallBack/closeModal.m4a";

interface modalProps {
    title: solid.JSXElement
    children: solid.JSXElement
    interactions?: modalInteractions
    show?: boolean
    noBlur?: boolean
    animate?: boolean | "fade" | "scale"
    duration?: number
    muted?: boolean
    containerProps?: solid.JSX.HTMLAttributes<HTMLDivElement>
    onClickBackground?: solid.JSX.EventHandler<HTMLDivElement, MouseEvent>
}
type modalInteractions = Array<solid.JSX.HTMLAttributes<HTMLButtonElement> & { label: solid.JSXElement }>
const ModernModal: solid.Component<modalProps> = (props) => {

    let containerRef: HTMLDivElement | undefined;
    let innerRef: HTMLDivElement | undefined;

    function containerEnter(el: Element, done: () => void) {
        if (props.animate === false) return;
        const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: props.duration ?? 300,
            fill: "forwards",
            easing: "ease"
        });
        Promise.all([innerEnter(), animation.finished]).then(done)

    }
    function containerExit(el: Element, done: () => void) {
        if (props.animate === false) return;
        const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: props.duration ?? 300,
            fill: "forwards",
            easing: "ease"
        });
        Promise.all([innerExit(), animation.finished]).then(done)
    }

    function innerEnter() {
        return new Promise<void | Animation>(resolve => {
            if (props.animate === false || props.animate == "fade" || !innerRef) {
                resolve();
                return;
            }
            const animation = innerRef.animate([{ scale: 0.6 }, { scale: 1 }], {
                duration: props.duration ?? 300,
                fill: "forwards",
                easing: "ease"
            });
            animation.finished.then(resolve)
        })

    }
    function innerExit() {
        return new Promise<void | Animation>(resolve => {
            if (props.animate === false || props.animate == "fade" || !innerRef) {
                resolve();
                return;
            }
            const animation = innerRef.animate([{ scale: 1 }, { scale: 0.6 }], {
                duration: props.duration ?? 300,
                fill: "forwards",
                easing: "ease"
            });
            animation.finished.then(resolve);
        })
    }

    function clickBackground(e: MouseEvent & { currentTarget: HTMLDivElement; target: Element; }) {
        if (!props.onClickBackground) return;
        e.preventDefault();
        e.stopPropagation();
        props.onClickBackground(e)
    }

    solid.createEffect(() => {
        if (!containerRef) return;
        if (props.show) containerRef.classList.add(style.opaque);

    });

    solid.onMount(() => {
        if (props.muted) return;
        playAudio(openModal);
    });

    solid.onCleanup(() => {
        if (props.muted) return;
        playAudio(closeModal);
    })

    return (
        <Transition onEnter={containerEnter} onExit={containerExit}>
            <solid.Show when={props.show ?? true}>
                <div {...props.containerProps} class={`${style.modalWrapper} ${props.noBlur && style.noBlur} ${props.containerProps?.class || ""}`} ref={containerRef} onClick={clickBackground}>
                    <div class={style.modal} ref={innerRef} onclick={(e) => e.stopPropagation()}>
                        <h1>{props.title}</h1>
                        <hr />
                        <div class={style.content}>
                            {props.children}
                        </div>
                        <hr />
                        <div class={style.interactions}>
                            <solid.For each={props.interactions}>
                                {
                                    data => (
                                        <GradientButton {...data}>{data.label}</GradientButton>
                                    )
                                }
                            </solid.For>
                        </div>
                    </div>
                </div>
            </solid.Show>
        </Transition>
    )
}

export default ModernModal;