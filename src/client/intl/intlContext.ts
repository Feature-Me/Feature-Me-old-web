import { i18n, TFunction } from 'i18next';
import { createContext, useContext } from 'solid-js';
function useOldIntlContext(): [TFunction, i18n] {
    const context = useContext(I18nContext);
    if (!context) throw new ReferenceError('I18nContext was not initialized.');
    return [context.t, context];
}
const I18nContext = createContext<i18n>();

export { useOldIntlContext, I18nContext };