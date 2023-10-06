import { useI18nContext } from "Global/Intl/i18n-solid";
import * as solid from "solid-js";
import { loadDefaultJapaneseParser } from 'budoux';

interface budouXWrapperProps extends solid.JSX.HTMLAttributes<HTMLDivElement> {
    lang: string
    children: solid.JSXElement
}

const BudouXWrapper: solid.Component<budouXWrapperProps> = (props) => {

    const { locale } = useI18nContext();
    const [local, others] = solid.splitProps(props, ["lang", "children"])
    const parser = loadDefaultJapaneseParser();

    let wrapperRef: HTMLDivElement | undefined;

    solid.onMount(() => {
        if (wrapperRef)
            parser.applyElement(wrapperRef)
    })



    return (
        <>
            <solid.Show when={locale() == props.lang} fallback={props.children}>
                <div ref={wrapperRef} {...others} >
                    {
                        props.children
                    }
                </div>
            </solid.Show>
        </>
    )

}
export default BudouXWrapper;