import i18n from "i18next";
import { initReactI18next,useTranslation } from "react-i18next";

import en_us from "./en-us/en-us";
import en_uk from "./en-uk/en-uk";
import ja from "./ja/ja"
import zh_cn from "./zh-cn/zh-cn";

//@ts-ignore
const language: string = (localStorage.getItem("environment")&&JSON.parse(localStorage.getItem("environment")!).language)||navigator.language.toLowerCase().replace(/-/g,"_");


i18n.use(initReactI18next).init({
    resources: {
        en_us: { translation: en_us },
        en_uk: { translation: en_uk },
        ja: { translation: ja },
        zh_cn: { translation: zh_cn },
    },
    lng: language,
    fallbackLng: "en_us",
    interpolation: {
        escapeValue: false,
    },
});
