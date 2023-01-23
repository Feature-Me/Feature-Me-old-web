import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import TranslateText from "Components/TranslateText/TranslateText";
import { VscClose } from "react-icons/vsc";
import * as solid from "solid-js";

import style from "./crashHandler.module.scss";



const ErrorModal: solid.Component<{ message: string }> = (props) => {
    const [show, setShow] = solid.createSignal(true);

    return (
        <div class={style.modal} classList={{ hide: !show() }}>
            <div class={style.inner}>
                <div class={style.titleBar}>
                    {/* <p><TranslateText defaultValue="Game Crashed!" content="crashHandler.title" /></p> */}
                    <p>繧ｨ繝ｩ繝ｼ</p>
                    <div class={style.closebtn}>
                    </div>
                </div>
                {/* <h2><TranslateText defaultValue="Game Crashed!" content="crashHandler.header" /></h2> */}
                <h2>繧ｯ繝ｩ繝?す繝･縺励∪縺励◆</h2>
                <p>
                    <TranslateText content="crashHandler.modal.description" /> <br />
                    <code>{props.message}</code>
                </p>
                <div class={style.interaction}>
                    <ChamferedButton onClick={() => setShow(false)}>OK</ChamferedButton>
                    <ChamferedButton onClick={() => location.reload()} > <TranslateText content="crashHandler.interaction.relaunch" /></ChamferedButton>
                    <ChamferedButton onClick={() => window.open("https://github.com/Feature-Me/Feature-Me/issues")}><TranslateText content="crashHandler.interaction.report" /></ChamferedButton>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal