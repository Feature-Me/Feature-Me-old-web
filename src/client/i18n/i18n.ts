import i18next from 'i18next';

import en_us from "./en-us/en-us";
import en_uk from "./en-uk/en-uk";
import ja from "./ja/ja"
import zh_cn from "./zh-cn/zh-cn";



const language: string = (localStorage.getItem("environment") && JSON.parse(localStorage.getItem("environment")!).language) || navigator.language.toLowerCase().replace(/-/g, "_");

const i18n = i18next.init({
    lng: "language",
    fallbackLng: 'ja',
    resources: {
        en_us: { translation: en_us },
        en_uk: { translation: en_uk },
        ja: { translation: ja },
        zh_cn: { translation: zh_cn },
    },
    interpolation: {
        escapeValue: false,
    }

});

export default i18n;