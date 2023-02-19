import * as solid from "solid-js";

import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import TranslateText from "Components/TranslateText/translateText";
import StackTrace from "./stackTrace";
import ErrorModal from "./errorModal";

import style from "./crashHandler.module.scss"

const CrashHandler: solid.Component<{ error: any, reset?: Function }> = (props) => {

    solid.createEffect(() => {
        console.error(props.error);
    })

    return (
        <div class={style.errorPage}>
            <div class={style.errorPage}>
                <div class={style.errorDetails}>
                    <h1><TranslateText defaultValue="Game Crashed." key="crashHandler.header" /></h1>
                    <p><TranslateText defaultValue="An Critical Error has occured." key="crashHandler.description" /></p>
                    <div class={style.interaction}>
                        <ChamferedButton onClick={() => location.reload()} > <TranslateText key="crashHandler.interaction.relaunch" /></ChamferedButton>
                        <ChamferedButton onClick={() => window.open("https://github.com/Feature-Me/Feature-Me/issues")}><TranslateText key="crashHandler.interaction.report" /></ChamferedButton>
                    </div>
                    <div class={style.errorMessage}>
                        <p><TranslateText defaultValue="Error details" key="crashHandler.details" /></p>
                        <h2>{props.error.toString()}</h2>
                        <hr />
                        <div class={style.stackTraces}>
                            <div class={style.trace}>
                                <h2><TranslateText defaultValue="Stack Trace" key="crashHandler.stackTrace" end=":" /></h2>
                                <StackTrace stack={props.error?.stack || ""} isComponent={false} />
                            </div>
                            <hr />
                            <details class={style.rawTrace}>
                                <summary><TranslateText defaultValue="View raw Error" key="crashHandler.viewRawError" /></summary>
                                <code>
                                    {props.error?.stack}
                                </code>
                            </details>
                        </div>
                    </div>
                </div>
                <ErrorModal message={props.error?.message || ""} />
            </div>
        </div>
    );
}

export default CrashHandler