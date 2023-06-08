import * as solid from "solid-js";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            buttonModel: {
                handleClick: EventListenerOrEventListenerObject,
                handleHover: EventListenerOrEventListenerObject
            };
        }
    }
}

function buttonModel(el: Element, props: () => solid.JSX.Directives["buttonModel"]) {
    solid.onMount(() => {
        el.addEventListener("click", props().handleClick);
        el.addEventListener("pointerenter", props().handleHover);
        el.addEventListener("focusin", props().handleClick);
    });
    solid.onCleanup(() => {
        el.removeEventListener("click", props().handleClick);
        el.removeEventListener("pointerenter", props().handleHover);
        el.removeEventListener("focusin", props().handleClick);
    })
}

export default buttonModel