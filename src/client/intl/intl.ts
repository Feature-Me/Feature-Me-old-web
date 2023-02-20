import en_us from "./en-us/en-us";
import en_uk from "./en-uk/en-uk";
import ja from "./ja/ja"
import zh_cn from "./zh-cn/zh-cn";
import i18next from 'i18next';
import { getEnvironment } from "Utils/getConfig/getConfig";


const language: string = (getEnvironment().language) || navigator.language.toLowerCase().replace(/-/g, "_");

const intlConfig = {
    lng: language,
    fallbackLng: ['ja', "en_us", "en_uk"],
    resources: {
        en_us: { translation: en_us },
        en_uk: { translation: en_uk },
        ja: { translation: ja },
    },
    interpolation: {
        escapeValue: false,
    }

};

const i18n = i18next.init(intlConfig);

export default i18n;
export { intlConfig };