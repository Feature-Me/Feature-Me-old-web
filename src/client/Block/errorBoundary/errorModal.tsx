import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { VscClose } from "react-icons/vsc";

import style from "./errorBoundary.scss";

const ErrorModal: React.FC<{ message: string }> = (props) => {
    const [show, setShow] = React.useReducer(() => false, true);


    if (!show) return null
    return (
        <div className={style.modal}>
            <div className={style.inner}>
                <div className={style.titleBar}>
                    {/* <p><TranslateText defaultValue="Game Crashed!" content="crashHandler.title" /></p> */}
                    <p>繧ｨ繝ｩ繝ｼ</p>
                    <div className={style.closebtn}>
                        <VscClose onClick={setShow} />
                    </div>
                </div>
                {/* <h2><TranslateText defaultValue="Game Crashed!" content="crashHandler.header" /></h2> */}
                <h2>繧ｯ繝ｩ繝?す繝･縺励∪縺励◆</h2>
                <p>
                    <TranslateText content="crashHandler.modal.description" /> <br />
                    <code>{props.message}</code>
                </p>
                <div className={style.interaction}>
                    <ChamferedButton onClick={() => setShow()}>OK</ChamferedButton>
                    <ChamferedButton onClick={() => location.reload()} > <TranslateText content="crashHandler.interaction.relaunch" /></ChamferedButton>
                    <ChamferedButton onClick={() => window.open("https://github.com/Feature-Me/Feature-Me/issues")}><TranslateText content="crashHandler.interaction.report" /></ChamferedButton>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal