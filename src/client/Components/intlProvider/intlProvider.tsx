import { I18nContext } from 'intl/intlContext';
import { i18n } from 'i18next';
import { ChildrenReturn, Component, JSXElement } from 'solid-js';


const I18nProvider: Component<{ i18n: i18n, children: JSXElement }> = (props) => {
    return (
        <I18nContext.Provider value={props.i18n} >
            {props.children}
        </I18nContext.Provider>
    );
}

export default I18nProvider