import * as solid from "solid-js";

import TranslateText from "Components/TranslateText/translateText";

import style from "./cautions.module.scss"

const SetupCautionCard: solid.Component<{ icon: solid.JSXElement, textKey: string }> = (props) => {

    return (
        <div class={style.cautionCard} >
            <div class={style.icon}>
                {props.icon}
            </div>
            <p>
                <TranslateText key={`setup.caution.cards.${props.textKey}`} />
            </p>
        </div>
    )
}

export default SetupCautionCard;