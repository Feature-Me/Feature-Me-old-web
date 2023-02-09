import * as solid from "solid-js";

import style from "./cautions.module.scss"
import TranslateText from "Components/TranslateText/TranslateText";


const SetupCautionCard: solid.Component<{ icon: solid.JSXElement, textKey: string }> = (props) => {

    return (
        <div class={style.cautionCard} >
            <div class={style.icon}>
                {props.icon}
            </div>
            <p>
                <TranslateText content={`setup.caution.cards.${props.textKey}`} />
            </p>
        </div>
    )
}

export default SetupCautionCard;