import * as solid from "solid-js";
import playAudio from "Utils/PlayAudio/playAudio";

import style from './selectbox.module.scss';

import clickSound from "Assets/Sounds/uiFallBack/clickDown.m4a";
import selectSound from "Assets/Sounds/uiFallBack/select.m4a";

interface selectBoxPropsType extends propsType {
    contents: Array<selectContents>,
    onInput?: FunctionWithTypedProps<selectContents>
    value: selectContents
}

interface selectBoxSelectorPropsType {
    isOpen: boolean,
    setIsOpen: solid.Setter<boolean>,
    contents: Array<selectContents>,
    onChange: FunctionWithTypedProps<selectContents>,
    setValue: solid.Setter<any>,
    setLabel: solid.Setter<solid.JSXElement>
}

const SelectBox: solid.Component<selectBoxPropsType> = (props) => {
    const [value, setValue] = solid.createSignal<any>(props.value.value);
    const [label, setLabel] = solid.createSignal<solid.JSXElement>(props.value.label);
    const [isOpen, setIsOpen] = solid.createSignal(false);

    let wrapperRef: HTMLDivElement | undefined;

    solid.onMount(() => {
        if (!wrapperRef) return;
        wrapperRef.addEventListener("click", handleClick);
        wrapperRef.addEventListener("pointerenter", handleHover);
    });

    solid.onCleanup(() => {
        if (!wrapperRef) return
        wrapperRef.removeEventListener("click", handleClick);
        wrapperRef.removeEventListener("pointerenter", handleHover);
    });

    function handleClick() {
        playAudio(clickSound);
        navigator.vibrate(50);
    }

    function handleHover() {
        playAudio(selectSound);
    }

    return (
        <div class={`${style.selectbox} ${props.class || ""}`} ref={wrapperRef} onClick={e => { setIsOpen(!isOpen()); e.stopPropagation(); e.preventDefault() }} onBlur={() => { setIsOpen(false) }} tabIndex={0}>
            <p class={style.valuelabel}>{label}</p>
            <Selector isOpen={isOpen()} setIsOpen={setIsOpen} contents={props.contents} onChange={props.onInput || (() => { })} setValue={setValue} setLabel={setLabel} />
        </div>
    )
}

const Selector: solid.Component<selectBoxSelectorPropsType> = (props) => {

    let selectBoxRef: HTMLDivElement | undefined;

    function enter() {
        if (!selectBoxRef) return;
        const animation = selectBoxRef.animate([{ opacity: 0, top: "calc(100% - 50px)" }, { opacity: 1, top: "calc(100% + 8px)" }], {
            duration: 300,
            fill: "forwards",
            easing: "ease-out"
        })
    }

    function exit() {
        if (!selectBoxRef) return;
        const animation = selectBoxRef.animate([{ opacity: 1, top: "calc(100% + 8px)" }, { opacity: 0, top: "calc(100% - 50px)" }], {
            duration: 300,
            fill: "forwards",
            easing: "ease-out"
        })
    }

    solid.createEffect(() => {
        if (props.isOpen) enter();
        else exit();
    })


    function handleHover() {
        playAudio(selectSound);
    }

    return (
        <div class={`${style.selector} ${!props.isOpen && style.inactive}`} onClick={e => { e.preventDefault(); e.stopPropagation(); }} ref={selectBoxRef}>
            <solid.For each={props.contents}>
                {
                    data => {
                        const handleClick = (e: Event) => {
                            e.stopPropagation();
                            e.preventDefault();
                            props.setLabel(data.label);
                            props.setValue(data.value);
                            props.onChange(data);
                            props.setIsOpen(false);
                        }
                        const handleFocus = (e: Event) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        return (
                            <div class={style.option} onMouseUp={handleClick} onFocus={handleFocus} onPointerEnter={handleHover}>
                                {data.label}
                            </div>
                        )
                    }
                }
            </solid.For>
        </div>
    )
}

export default SelectBox;