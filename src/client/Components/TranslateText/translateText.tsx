import * as solid from "solid-js";
import i18next from "i18next";

interface TranslateProps {
    content: string
    defaultValue?: string
    start?: string | solid.JSXElement
    end?: string | solid.JSXElement
}

const TranslateText: solid.Component<TranslateProps> = (props) => {
    return <>{props.start || ""}{i18next.t(props.content, { defaultValue: props.defaultValue })}{props.end || ""}</>;
}

export default TranslateText;