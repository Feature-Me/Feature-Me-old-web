import * as solid from "solid-js";
import i18next, { StringMap, TOptions } from "i18next";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";

interface TranslateProps {
    key: string
    defaultValue?: string
    options?: TOptions<StringMap>
    start?: string | solid.JSXElement
    end?: string | solid.JSXElement
}

const TranslateText: solid.Component<TranslateProps> = (props) => {
    return (
        <>
            {props.start || ""}
            <Trans key={props.key} options={{ ...{ defaultValue: props.defaultValue }, ...props.options }} />
            {props.end || ""}
        </>
    )
}

export default TranslateText;