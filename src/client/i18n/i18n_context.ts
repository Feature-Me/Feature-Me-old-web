import { createContext, useContext } from 'solid-js';
function useI18n() {
    const context = useContext(I18nContext);
    if (!context) throw new ReferenceError('I18nContext');
    return context;
}
const I18nContext = createContext();

export { useI18n, I18nContext };