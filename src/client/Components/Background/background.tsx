import * as solid from "solid-js";

import style from "./background.module.scss";

import fallbackImage from "Assets/Images/tidal wreck background.png";
import { Transition } from "solid-transition-group";
import { renderBackground } from "State/backgroundState";
const Background: solid.Component = (props) => {

    function enter(el: Element, done: () => void) {
        const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200
        });
        animation.finished.then(done);
    }

    function exit(el: Element, done: () => void) {
        const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200
        });
        animation.finished.then(done);

    }

    return (
        <div class={style.background}>
            <Transition onEnter={enter} onExit={exit}>
                <solid.Show when={renderBackground()} >
                    <img src={fallbackImage} alt="Tidal Wreck" class={style.fallback} />
                </solid.Show>
            </Transition>

        </div>
    )
}

export default Background;
